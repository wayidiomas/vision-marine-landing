'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageDropdown } from "@/components/ui/language-dropdown";
import { useLanguage } from "@/contexts/language-context";
import dynamic from "next/dynamic";

// Lazy load heavy components for better performance
const ScrollStory = dynamic(() => import("@/components/scroll/scroll-story").then(mod => ({ default: mod.ScrollStory })), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200" />
});

const FeaturedTrainings = dynamic(() => import("@/components/sections/FeaturedTrainings").then(mod => ({ default: mod.FeaturedTrainings })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const CareerBoost = dynamic(() => import("@/components/sections/CareerBoost").then(mod => ({ default: mod.CareerBoost })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const BusinessSolutions = dynamic(() => import("@/components/sections/BusinessSolutions").then(mod => ({ default: mod.BusinessSolutions })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const WhyChooseVisionMarine = dynamic(() => import("@/components/sections/WhyChooseVisionMarine").then(mod => ({ default: mod.WhyChooseVisionMarine })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const StatisticsSection = dynamic(() => import("@/components/sections/StatisticsSection").then(mod => ({ default: mod.StatisticsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const TestimonialsCarousel = dynamic(() => import("@/components/sections/TestimonialsCarousel").then(mod => ({ default: mod.TestimonialsCarousel })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});

const NewsletterSection = dynamic(() => import("@/components/sections/NewsletterSection").then(mod => ({ default: mod.NewsletterSection })), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200" />
});

const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />
});

const Footer = dynamic(() => import("@/components/sections/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />
});
import { useCourses } from "@/hooks/useCourses";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export default function Home() {
  const { t } = useLanguage();
  const { courses, loading, error } = useCourses({ limit: 3 });
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative px-4 lg:px-8 xl:px-16 2xl:px-24 py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/hero-background.png')" }}
      >
        {/* Overlay with gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(10, 26, 74, 0.8) 0%, rgba(10, 26, 74, 0.6) 100%)`
          }}
        ></div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-20 w-32 h-32 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
          <div className="absolute right-10 bottom-20 w-24 h-24 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
          <div className="absolute right-20 top-40 w-16 h-16 rounded-full bg-[#4cb7e0] blur hidden lg:block"></div>
          {/* Mobile decorative elements */}
          <div className="absolute left-10 top-20 w-32 h-32 rounded-full border border-[#4cb7e0] lg:hidden"></div>
          <div className="absolute right-10 bottom-80 w-24 h-24 rounded-full border border-[#4cb7e0] lg:hidden"></div>
          <div className="absolute right-20 top-40 w-16 h-16 rounded-full bg-[#4cb7e0] blur lg:hidden"></div>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-8 lg:gap-10 xl:gap-12 w-full max-w-7xl mx-auto">
          {/* Content */}
          <div className="flex flex-col justify-center gap-8 w-full lg:w-1/2 lg:flex-shrink-0">
            {/* Main Heading */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                {/*
                  TODO: INTERNACIONALIZAÇÃO (i18n)
                  Textos hardcoded que precisam ser traduzidos:
                  PT-BR: "Navegue pelo" + "Conhecimento Naval"
                  EN-US: "Navigate through" + "Naval Knowledge"

                  Implementar: next-intl ou react-i18next
                  Estrutura sugerida: /locales/[pt-BR|en-US]/common.json
                */}
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-[45px] lg:leading-[60px]">
                  {t('hero.title.line1')}
                </h1>
                <h1 className="text-4xl lg:text-6xl font-bold text-[#4cb7e0] leading-[45px] lg:leading-[60px]">
                  {t('hero.title.line2')}
                </h1>
              </div>
              <p className="text-lg lg:text-xl text-gray-300 leading-[32.5px] mt-4">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                className="h-12 px-8 bg-gradient-to-r from-[#4cb7e0] to-[#4cb7e0] hover:from-[#4cb7e0] hover:to-[#3a9bc1] text-white font-semibold text-lg rounded-md transition-all duration-300"
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  {/* External Link Icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66669 9.33333L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('hero.cta')}
                </Link>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="pt-8 border-t border-gray-700 border-opacity-80">
              <div className="flex gap-8 justify-center lg:justify-between">
                <div className="flex flex-col items-center text-center">
                  <Image src="/users-icon.svg" alt="" width={32} height={32} className="mb-2" />
                  <AnimatedNumber
                    value="500+"
                    className="text-2xl font-bold text-white leading-8"
                    delay={0}
                  />
                  <div className="text-sm text-gray-400 leading-5">{t('stats.active_students')}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Image src="/book-icon.svg" alt="" width={32} height={32} className="mb-2" />
                  <AnimatedNumber
                    value="25+"
                    className="text-2xl font-bold text-white leading-8"
                    delay={100}
                  />
                  <div className="text-sm text-gray-400 leading-5">{t('stats.training_courses')}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Image src="/star-icon.svg" alt="" width={32} height={32} className="mb-2" />
                  <AnimatedNumber
                    value="95%"
                    className="text-2xl font-bold text-white leading-8"
                    delay={200}
                  />
                  <div className="text-sm text-gray-400 leading-5">{t('stats.approval_rate')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Card (Desktop) */}
          <div className="w-full lg:w-1/2 flex-shrink-0 hidden lg:flex lg:flex-col">
            <div className="bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] p-8 rounded-2xl h-full flex flex-col">
              <div className="bg-white p-6 rounded-xl flex-1 flex flex-col">
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#070e2c] mb-4 leading-7">
                    {t('card.next_class')}
                  </h3>

                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    {loading ? (
                      // Loading skeleton
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex justify-between items-center animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))
                    ) : error ? (
                      // Error fallback
                      <div className="text-red-600 text-sm text-center py-4">
                        Erro ao carregar cursos
                      </div>
                    ) : courses.length > 0 ? (
                      // Dynamic data from Supabase
                      courses.map((course) => (
                        <div key={course.curso_id} className="flex justify-between items-center py-2">
                          <span className="text-[#070e2c] text-base leading-6">{course.curso_nome}</span>
                          <span className="text-[#070e2c] text-base font-semibold leading-6">{course.data_formatada}</span>
                        </div>
                      ))
                    ) : (
                      // No courses fallback
                      <div className="text-gray-600 text-sm text-center py-4">
                        Nenhum curso disponível no momento
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full h-10 mt-6 bg-gradient-to-r from-[#070e2c] to-[#070e2c] hover:from-[#070e2c] hover:to-[#0a1238] text-white font-semibold text-sm rounded-md transition-all duration-300"
                >
                  <Link href="/courses">{t('card.view_all')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Card - Scroll Controlled Rotation */}
        <div className="relative lg:hidden mt-10 flex justify-end">
          <div className="w-[366px] max-w-[90vw] transition-all duration-500 ease-out hover:scale-105 cursor-pointer group sticky top-20 z-20" style={{ transform: 'rotate(3deg)' }} data-scroll-card>
            <div
              className="bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] p-8 rounded-2xl transition-all duration-500 ease-out shadow-lg hover:shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 0 transparent)',
                transition: 'all 0.5s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(76, 183, 224, 0.4))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
              }}
            >
              <div className="bg-white p-6 rounded-xl transition-all duration-500 group-hover:bg-gray-50 relative overflow-hidden">
                {/* Conteúdo Original */}
                <div data-card-content className="transition-all duration-700 ease-in-out relative z-10">
                  <h3 className="text-xl font-bold text-[#070e2c] mb-4 leading-7 transition-all duration-500 group-hover:text-[#4cb7e0]">
                    {t('card.next_class')}
                  </h3>

                  <div className="space-y-3 mb-4">
                    {loading ? (
                      // Loading skeleton
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex justify-between items-center animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))
                    ) : error ? (
                      // Error fallback
                      <div className="text-red-600 text-sm text-center py-4">
                        Erro ao carregar cursos
                      </div>
                    ) : courses.length > 0 ? (
                      // Dynamic data from Supabase
                      courses.map((course) => (
                        <div key={course.curso_id} className="flex justify-between items-center">
                          <span className="text-[#070e2c] text-base leading-6">{course.curso_nome}</span>
                          <span className="text-[#070e2c] text-base font-semibold leading-6">{course.data_formatada}</span>
                        </div>
                      ))
                    ) : (
                      // No courses fallback
                      <div className="text-gray-600 text-sm text-center py-4">
                        Nenhum curso disponível no momento
                      </div>
                    )}
                  </div>

                  <Button
                    asChild
                    className="w-full h-10 bg-gradient-to-r from-[#070e2c] to-[#070e2c] hover:from-[#070e2c] hover:to-[#0a1238] group-hover:from-[#4cb7e0] group-hover:to-[#3a9bc1] text-white font-semibold text-sm rounded-md transition-all duration-500"
                  >
                    <Link href="/courses">{t('card.view_all')}</Link>
                  </Button>
                </div>

                {/* Conteúdo dos Cursos - UM CURSO POR VEZ */}
                <div data-course-content className="transition-all duration-500 ease-linear overflow-hidden" style={{ maxHeight: '0px', opacity: '0' }}>
                  <div className="pt-3 border-t border-gray-200 mt-3">
                    <h3 className="text-lg font-bold text-[#070e2c] mb-3 leading-7">
                      Cursos Disponíveis
                    </h3>

                    {/* Todos os Cursos - dados dinâmicos */}
                    <div className="space-y-3">
                      {loading ? (
                        // Loading skeleton para cards expandidos
                        Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                              </div>
                              <div className="h-6 bg-gray-200 rounded w-12 ml-4"></div>
                            </div>
                          </div>
                        ))
                      ) : error ? (
                        <div className="text-red-600 text-sm text-center py-8">
                          Erro ao carregar cursos detalhados
                        </div>
                      ) : courses.length > 0 ? (
                        courses.map((course) => (
                          <div key={course.curso_id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-[#070e2c] text-lg font-bold">{course.curso_nome}</div>
                              <div className="text-gray-600 text-sm">{course.nivel} • {course.carga_horaria}h</div>
                              <div className="text-gray-500 text-sm mt-2">{course.descricao}</div>
                            </div>
                            <span className="text-[#4cb7e0] text-xl font-bold">{course.data_formatada}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-600 text-sm text-center py-8">
                          Nenhum curso disponível no momento
                        </div>
                      )}
                    </div>

                    <Button
                      asChild
                      className="w-full h-10 mt-3 bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] hover:from-[#3a9bc1] hover:to-[#4cb7e0] text-white font-semibold text-sm rounded-md transition-all duration-500"
                    >
                      <Link href="/courses">Ver Todos os Cursos</Link>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trainings Section */}
      <FeaturedTrainings />

      {/* Career Boost Section */}
      <CareerBoost />

      {/* Business Solutions Section */}
      <BusinessSolutions />

      {/* Why Choose Vision Marine Section */}
      <WhyChooseVisionMarine />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <CTASection />

      {/* Scroll Story Section */}
      <ScrollStory />

      {/* Footer */}
      <Footer />
    </div>
  );
}
