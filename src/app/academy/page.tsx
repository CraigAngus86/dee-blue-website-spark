import type { Metadata } from "next";
import {
  ClubAcademyHero,
  HeritageSection,
  FirstTeamSection,
  AcademyPathwaySection,
  FacilitiesSection,
  ValuesSection,
  RegistrationSection,
} from "@/features/academy/components";

// Static page with occasional content tweaks
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Club & Academy | Baynounah SC",
  description:
    "Baynounah SC’s Club & Academy: heritage, pathway, facilities, values, and how to join the journey.",
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <ClubAcademyHero />

      {/* Heritage */}
      <HeritageSection />

      {/* First Team snapshot + Stadium info */}
      <FirstTeamSection />

      {/* Pathway */}
      <AcademyPathwaySection />

      {/* Facilities + Schedule */}
      <FacilitiesSection />

      {/* Values + Philosophy */}
      <ValuesSection />

      {/* Registration + CTA */}
      <RegistrationSection />
    </main>
  );
}
