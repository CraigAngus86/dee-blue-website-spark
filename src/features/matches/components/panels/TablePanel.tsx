"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_SEASON } from '../../constants';
import { TeamLogo } from "../TeamLogo";
import { MobileTableCard } from '../mobile/MobileTableCard';

export function TablePanel() {
  const searchParams = useSearchParams();
  const season = searchParams.get('season') || DEFAULT_SEASON;

  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTableData() {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching league table for season: ${season}`);

        // First get the season ID from name
        const { data: seasonData, error: seasonError } = await supabase
          .from('seasons')
          .select('id')
          .ilike('name', `%${season}%`)
          .limit(1);

        if (seasonError) {
          console.error('Error fetching season ID:', seasonError);
          throw new Error(`Couldn't find season "${season}"`);
        }

        if (!seasonData || seasonData.length === 0) {
          throw new Error(`No season found matching "${season}"`);
        }

        const seasonId = seasonData[0]?.id;
        if (!seasonId) throw new Error('Invalid season ID');

        console.log(`Found season ID: ${seasonId} for season ${season}`);

        // Load table rows
        const { data, error } = await supabase
          .from('vw_league_table_by_season')
          .select('*')
          .eq('season_id', seasonId)
          .order('position');

        if (error) {
          console.error('Error fetching league table:', error);
          throw new Error('Failed to fetch league table data');
        }

        console.log(`Fetched ${data?.length || 0} league table entries`);
        setTableData(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : String(err));
        setTableData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTableData();
  }, [season]);

  // Form indicator component for W/L/D
  const FormIndicator = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const base =
      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium';
    // Use green for W, brand gold for D, red for L
    const cls =
      result === 'W'
        ? 'bg-green-500 text-white'
        : result === 'D'
        ? 'bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]'
        : 'bg-red-500 text-white';
    return <div className={`${base} ${cls}`}>{result}</div>;
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-[rgb(var(--dark-gray))]">
        Loading league table...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500 mb-2">{error}</p>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[rgb(var(--dark-gray))]">
          No league table data available for {season}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[rgb(var(--brand-black))]">
            {season} League Table
          </h3>

          <div className="overflow-x-auto rounded-lg border border-[rgb(var(--medium-gray))] shadow-sm">
            <table className="min-w-full bg-[rgb(var(--white))]">
              <thead className="bg-[rgb(var(--brand-black))] text-white border-b border-[rgb(var(--medium-gray))]">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">Pos</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">Team</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">P</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">W</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">D</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">L</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GF</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GA</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GD</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">Pts</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">Form</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[rgb(var(--medium-gray))]">
                {tableData.map((row) => {
                  const position = Number(row.position);
                  const teamName = String(row.team_name || '');
                  const isBaynounah = teamName.toLowerCase().includes('baynounah');

                  // Promo/Demotion logic
                  const isPromotion = position === 1 || position === 2;
                  const isDemotion = position === 14 || position === 15;

                  // Row background logic (brand-aligned)
                  // - Baynounah highlighted in warm gray (takes precedence)
                  // - Positions 1–2: subtle green tint
                  // - Positions 14–15: subtle red tint
                  let rowBg = 'bg-[rgb(var(--white))]';
                  if (isBaynounah) {
                    rowBg = 'bg-[rgb(var(--warm-gray))]';
                  } else if (isPromotion) {
                    rowBg = 'bg-green-50';
                  } else if (isDemotion) {
                    rowBg = 'bg-red-50';
                  }

                  return (
                    <tr
                      key={row.id}
                      className={`${rowBg} hover:bg-[rgb(var(--warm-gray))] transition-colors duration-150`}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center font-medium">
                        {row.position}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <TeamLogo
                            logoId={row.team_logo}
                            teamName={teamName}
                            size="sm"
                            className="mr-2"
                          />
                          <span className={isBaynounah ? 'font-bold' : ''}>
                            {teamName}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.matches_played}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.wins}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.draws}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.losses}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goals_for}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goals_against}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goal_difference}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-bold text-center">{row.points}</td>

                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex justify-center space-x-1">
                          {(row.form || []).slice(0, 5).map((result: string, i: number) => (
                            <FormIndicator key={i} result={result as 'W' | 'L' | 'D'} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile: Single table card */}
      <div className="block md:hidden">
        <MobileTableCard tableData={tableData} />
      </div>
    </>
  );
}
