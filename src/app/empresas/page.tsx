'use client'

import { useLanguage } from "@/contexts/language-context";
import { CompaniesHeroSection } from "@/components/sections/companies/CompaniesHeroSection";
import { CompaniesWhyChooseSection } from "@/components/sections/companies/CompaniesWhyChooseSection";
import { CompaniesAssessmentSection } from "@/components/sections/companies/CompaniesAssessmentSection";
import { CompaniesStatisticsSection } from "@/components/sections/companies/CompaniesStatisticsSection";
import { CompaniesCtaSection } from "@/components/sections/companies/CompaniesCtaSection";
import { Footer } from "@/components/sections/Footer";

export default function EmpresasPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <CompaniesHeroSection />

      {/* Why Choose Section */}
      <CompaniesWhyChooseSection />

      {/* Assessment Section */}
      <CompaniesAssessmentSection />

      {/* Statistics Section */}
      <CompaniesStatisticsSection />

      {/* CTA Section */}
      <CompaniesCtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}