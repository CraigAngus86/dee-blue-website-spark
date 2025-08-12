"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/sections/SectionHeader";

interface LeaguePositionSummaryProps {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  form?: ("W" | "D" | "L")[];
  goalDifference?: number;
  competitionName?: string;
  seasonName?: string;
  clubName?: string;
}

export function LeaguePositionSummary({
  position,
  played,
  won,
  drawn,
  lost,
  points,
  form = [],
  goalDifference = 0,
  competitionName,
  seasonName,
  clubName = "Baynounah SC",
}: LeaguePositionSummaryProps) {
  const hasRank = Number.isFinite(position) && position > 0;
  const posDisplay = hasRank ? position : "—";
  const formSafe = Array.isArray(form) ? form.slice(0, 5) : [];
  const contextLine = [competitionName, seasonName].filter(Boolean).join(" • ");

  return (
    <section aria-label="League table summary" className="w-full">
      {/* Header */}
      <div className="mb-2">
        <SectionHeader
          title="League Table"
          rightSlot={
            <Link
              href="/matches?tab=table"
              className="text-link hover:text-link-hover transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold)/0.40)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))]"
              aria-label="View full league table"
            >
              <span className="text-sm font-medium">View Full Table</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          }
        />
      </div>

      {/* Context subheader (optional) */}
      {contextLine && (
        <div className="mb-4 text-xs text-text-muted">{contextLine}</div>
      )}

      {/* Card surface */}
      <div className="bg-[rgb(var(--white))] border border-[rgb(var(--separator))] rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Position + Team */}
          <div className="col-span-12 md:col-span-4 flex items-center">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center mr-3
                ${
                  hasRank
                    ? "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]"
                    : "bg-[rgb(var(--warm-gray))] text-[rgb(var(--brand-black)/0.65)]"
                }`}
              aria-label={hasRank ? `Position ${position}` : "Position not yet ranked"}
            >
              {/* Numeral in body font for clarity/consistency (no Bebas/bold) */}
              <span className="text-lg font-semibold">{posDisplay}</span>
            </div>
            <div className="min-w-0">
              {/* Club name – treat as label (body font), not heading typography */}
              <div className="text-base md:text-lg font-semibold text-text-strong truncate">
                {clubName}
              </div>
              <div className="text-xs text-text-muted mt-1">
                {hasRank ? "Current position" : "Not yet ranked"}
              </div>
            </div>
          </div>

          {/* KPI tiles: P / W / D / L / GD / PTS */}
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-6 gap-2">
              {[
                { label: "P", value: played, strong: false },
                { label: "W", value: won, strong: false },
                { label: "D", value: drawn, strong: false },
                { label: "L", value: lost, strong: false },
                { label: "GD", value: goalDifference, strong: false },
                { label: "PTS", value: points, strong: true },
              ].map(({ label, value, strong }) => (
                <div
                  key={label}
                  className="border border-[rgb(var(--separator))] rounded-md py-2 text-center bg-[rgb(var(--white))]"
                >
                  <div className="text-xs text-text-muted">{label}</div>
                  <div
                    className={`${
                      strong ? "text-2xl" : "text-lg"
                    } font-semibold text-text-strong`}
                  >
                    {Number.isFinite(Number(value)) ? Number(value) : 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form chips */}
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-1">
                {formSafe.length > 0 ? (
                  formSafe.map((result, i) => (
                    <span
                      key={`${result}-${i}`}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                        ${
                          result === "W"
                            ? "bg-[rgb(var(--heritage-green))] text-[rgb(var(--white))]"
                            : result === "D"
                            ? "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]"
                            : "bg-[rgb(var(--heritage-red))] text-[rgb(var(--white))]"
                        }`}
                      aria-label={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
                    >
                      {result}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-text-muted">
                    Form will appear after matchday 1
                  </span>
                )}
              </div>
              <div className="text-xs text-text-muted uppercase mt-1">Form</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
