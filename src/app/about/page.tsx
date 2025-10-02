'use client'

import { useLanguage } from "@/contexts/language-context";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { AboutMissionSection } from "@/components/sections/about/AboutMissionSection";
import { AboutFacilitiesSection } from "@/components/sections/about/AboutFacilitiesSection";
import { AboutStatsSection } from "@/components/sections/about/AboutStatsSection";
import { AboutValuesSection } from "@/components/sections/about/AboutValuesSection";
import { AboutTeamSection } from "@/components/sections/about/AboutTeamSection";
import { Footer } from "@/components/sections/Footer";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <AboutHeroSection />
      {/* Mission Section */}
      <AboutMissionSection />
      {/* Facilities Section */}
      <AboutFacilitiesSection />
      {/* Stats Section */}
      <AboutStatsSection />
      {/* Values Section */}
      <AboutValuesSection />
      {/* Team Section */}
      <AboutTeamSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}