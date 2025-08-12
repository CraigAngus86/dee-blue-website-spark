"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { TeamLogo } from "../common/TeamLogo";
import { ChevronRight } from "lucide-react";

type FormToken = "W" | "D" | "L";

interface LeagueTableTeam {
  position?: number;
  team_name: string;
  team_short_name?: string;
  team_logo?: string;
  points?: number;
  matches_played?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goals_for?: number;
  goals_against?: number;
  goal_difference?: number;
  form?: FormToken[];
  competition_name?: string;
  season_name?: string;
}

interface MobileLeagueTableProps {
  leagueTable: LeagueTableTeam[] | string | unknown;
  /** legacy prop; used as a fallback if provided */
  banksODeePosition?: number;
}

/** Helpers */
const normalizeName = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

const pick = (obj: any, keys: string[]): any =>
  keys.map((k) => obj?.[k]).find((v) => v !== undefined && v !== null);

/** Normalize one row (snake/camel tolerant). Keep 0 values, only filter out null/undefined. */
function normalizeRow(raw: any): LeagueTableTeam | null {
  if (!raw || typeof raw !== "object") return null;

  const team_name =
    (pick(raw, ["team_name", "teamName", "name"]) as string) || "";
  if (!team_name) return null;

  const row: LeagueTableTeam = {
    position: pick(raw, ["position", "pos"]) ?? undefined,
    team_name,
    team_short_name: pick(raw, ["team_short_name", "teamShortName", "short_name", "shortName"]),
    team_logo: pick(raw, ["team_logo", "teamLogo", "logo", "logo_url", "logoUrl"]),
    points: pick(raw, ["points", "pts"]) ?? 0,
    matches_played: pick(raw, ["matches_played", "played", "mp"]) ?? 0,
    wins: pick(raw, ["wins", "w"]) ?? 0,
    draws: pick(raw, ["draws", "d"]) ?? 0,
    losses: pick(raw, ["losses", "l"]) ?? 0,
    goals_for: pick(raw, ["goals_for", "gf", "goalsFor"]) ?? 0,
    goals_against: pick(raw, ["goals_against", "ga", "goalsAgainst"]) ?? 0,
    goal_difference: pick(raw, ["goal_difference", "gd", "goalDifference"]) ?? 0,
    form: Array.isArray(raw?.form)
      ? (raw.form.filter((f: any) => f === "W" || f === "D" || f === "L") as FormToken[])
      : pick(raw, ["recent_form", "recentForm"]),
    competition_name: pick(raw, ["competition_name", "competitionName"]),
    season_name: pick(raw, ["season_name", "seasonName"]),
  };

  return row;
}

export function MobileLeagueTable({
  leagueTable,
  banksODeePosition,
}: MobileLeagueTableProps) {
  // Normalize input (array or JSON string)
  const rows: LeagueTableTeam[] = useMemo(() => {
    let raw: any[] = [];
    try {
      if (Array.isArray(leagueTable)) {
        raw = leagueTable as any[];
      } else if (typeof leagueTable === "string") {
        const parsed = JSON.parse(leagueTable);
        raw = Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      raw = [];
    }

    return raw.map(normalizeRow).filter(Boolean) as LeagueTableTeam[];
  }, [leagueTable]);

  // Context line from first available row
  const { competitionName, seasonName } = useMemo(() => {
    const src = rows[0] ?? undefined;
    return {
      competitionName: src?.competition_name,
      seasonName: src?.season_name,
    };
  }, [rows]);

  const contextLine = [competitionName, seasonName].filter(Boolean).join(" • ");

  // Baynounah detection
  const bayIndex = useMemo(() => {
    const i = rows.findIndex((t) => {
      const normalized = normalizeName(t?.team_name);
      return normalized.includes("baynounah");
    });

    if (i >= 0) {
      return i;
    }

    // Fallback to legacy prop (1-based → 0-based)
    if (banksODeePosition && banksODeePosition > 0) {
      return banksODeePosition - 1;
    }

    return 0;
  }, [rows, banksODeePosition]);

  // 3-team window around focus with alphabetical sorting for pre-season
  const displayTeams = useMemo(() => {
    if (rows.length === 0) return [];

    const allZeroPoints = rows.every(
      (team) => (team.points ?? 0) === 0 && (team.matches_played ?? 0) === 0
    );

    let sortedRows = rows;
    if (allZeroPoints) {
      sortedRows = [...rows].sort((a, b) => a.team_name.localeCompare(b.team_name));
    }

    const sortedBayIndex = sortedRows.findIndex((t) =>
      normalizeName(t?.team_name).includes("baynounah")
    );

    const effectiveBayIndex = sortedBayIndex >= 0 ? sortedBayIndex : bayIndex;

    if (sortedRows.length <= 3) return sortedRows;

    const clamp = (n: number, min: number, max: number) =>
      Math.max(min, Math.min(max, n));

    let start = effectiveBayIndex - 1;
    start = clamp(start, 0, Math.max(0, sortedRows.length - 3));

    return sortedRows.slice(start, start + 3);
  }, [rows, bayIndex]);

  const hasData = rows.length > 0;

  return (
    <section aria-label="League table (mobile)" className="w-full">
      {/* Header with 4px gold accent and Bebas 400 (+0.02em) */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="w-1 h-10 bg-[rgb(var(--brand-gold))] shrink-0" />
          <h2
            className="text-h2 font-heading font-normal text-text-strong leading-none"
            style={{ letterSpacing: "0.02em" }}
          >
            League Table
          </h2>
        </div>
        </div>

      {/* Context line */}
      {contextLine && (
        <div className="mb-3 text-xs text-text-muted">{contextLine}</div>
      )}

      {/* League table card */}
      <div className="bg-[rgb(var(--white))] rounded-lg shadow-sm border border-separator overflow-hidden">
        {/* Table header */}
        <div className="flex items-center px-3 py-2 border-b border-separator bg-[rgb(var(--white))]">
          <div className="w-8 flex-shrink-0 text-center">
            <span className="text-[11px] font-semibold text-text-muted uppercase">POS</span>
          </div>
          <div className="flex-1 mx-3 text-left">
            <span className="text-[11px] font-semibold text-text-muted uppercase">TEAM</span>
          </div>
          <div className="w-8 flex-shrink-0 text-center">
            <span className="text-[11px] font-semibold text-text-muted uppercase">P</span>
          </div>
          <div className="w-12 flex-shrink-0 text-center">
            <span className="text-[11px] font-semibold text-text-muted uppercase">PTS</span>
          </div>
        </div>

        {/* Table rows */}
        {hasData && displayTeams.length > 0 ? (
          displayTeams.map((team, i) => {
            const isBay = normalizeName(team.team_name).includes("baynounah");
            const posVal = team.position ?? "—";
            const playedVal = team.matches_played ?? 0;
            const pointsVal = team.points ?? 0;

            return (
              <div
                key={`${team.team_name}-${team.position ?? "x"}-${i}`}
                className={`flex items-center px-3 py-3 ${
                  i !== displayTeams.length - 1 ? "border-b border-separator" : ""
                } ${isBay ? "bg-accent/5" : "bg-[rgb(var(--white))]"}`}
              >
                {/* Position */}
                <div className="w-8 flex-shrink-0 text-center">
                  <span className={`text-sm font-semibold ${isBay ? "text-text-strong" : "text-text-muted"}`}>
                    {posVal}
                  </span>
                </div>

                {/* Team */}
                <div className="flex items-center flex-1 mx-3 min-w-0">
                  <div className="flex-shrink-0 mr-2">
                    <TeamLogo
                      logoUrl={team.team_logo}
                      teamName={team.team_short_name || team.team_name}
                      size="sm"
                    />
                  </div>
                  <span className="text-sm font-medium truncate text-text-strong">
                    {team.team_short_name || team.team_name}
                  </span>
                </div>

                {/* Played */}
                <div className="w-8 flex-shrink-0 text-center">
                  <span className={`text-sm font-medium ${isBay ? "text-text-strong" : "text-text-muted"}`}>
                    {playedVal}
                  </span>
                </div>

                {/* Points */}
                <div className="w-12 flex-shrink-0 text-center">
                  <span className={`text-sm font-heading font-semibold ${isBay ? "text-text-strong" : "text-text-muted"}`}>
                    {pointsVal}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-text-muted mb-1">No league table data available</p>
            <p className="text-xs text-text-muted">Check back for updates</p>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="text-center pt-4">
        <Link
          href="/matches"
          className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors font-medium
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2
                     focus-visible:ring-offset-[rgb(var(--white))]"
          aria-label="View Full Table"
        >
          <span>View Full Table</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
