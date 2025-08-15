import type { Metadata } from "next";

import ClubAcademyHero from "@/features/academy/components/ClubAcademyHero";
import HeritageValues from "@/features/academy/components/HeritageValues";
import ValuesSection from "@/features/academy/components/ValuesSection";
import FirstTeamSection from "@/features/academy/components/FirstTeamSection";
import AcademyPartnership from "@/features/academy/components/AcademyPartnership";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Club & Academy | Baynounah SC",
  description:
    "Baynounah SC’s Club & Academy: heritage, pathway, values, and first-team connection.",
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen">
      <ClubAcademyHero />
      <HeritageValues />
      <ValuesSection />
      <FirstTeamSection />
      <AcademyPartnership />
    </main>
  );
}
