'use client'

import { useLanguage } from '@/contexts/language-context'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface ContactInfoCardProps {
  icon: React.ReactNode
  title: string
  lines: string[]
}

function ContactInfoCard({ icon, title, lines }: ContactInfoCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="bg-[rgba(76,183,224,0.1)] rounded-lg flex items-center justify-center w-12 h-12 flex-shrink-0">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-base leading-6">
            {title}
          </h3>
          {lines.map((line, index) => (
            <p
              key={index}
              className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-sm leading-5"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-base leading-6">
        {question}
      </h4>
      <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-sm leading-5">
        {answer}
      </p>
    </div>
  )
}

export function ContactInfoSection() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col gap-6">
        <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-2xl leading-8">
          {t('contact.info.title')}
        </h2>
        <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-base leading-6">
          {t('contact.info.subtitle')}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-col gap-6">
        {/* Address */}
        <ContactInfoCard
          icon={<MapPin className="w-6 h-6 text-[#4cb7e0]" />}
          title={t('contact.info.address.title')}
          lines={[
            t('contact.info.address.street'),
            t('contact.info.address.city'),
            t('contact.info.address.zip'),
          ]}
        />

        {/* Phone */}
        <ContactInfoCard
          icon={<Phone className="w-6 h-6 text-[#4cb7e0]" />}
          title={t('contact.info.phone.title')}
          lines={[
            t('contact.info.phone.main'),
            t('contact.info.phone.mobile'),
          ]}
        />

        {/* Email */}
        <ContactInfoCard
          icon={<Mail className="w-6 h-6 text-[#4cb7e0]" />}
          title={t('contact.info.email.title')}
          lines={[
            t('contact.info.email.general'),
            t('contact.info.email.support'),
          ]}
        />

        {/* Hours */}
        <ContactInfoCard
          icon={<Clock className="w-6 h-6 text-[#4cb7e0]" />}
          title={t('contact.info.hours.title')}
          lines={[
            t('contact.info.hours.weekdays'),
            t('contact.info.hours.saturday'),
          ]}
        />
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-2xl leading-6 tracking-[-0.6px] mb-6">
          {t('contact.faq.title')}
        </h3>

        <div className="flex flex-col gap-4">
          <FAQItem
            question={t('contact.faq.q1.question')}
            answer={t('contact.faq.q1.answer')}
          />
          <FAQItem
            question={t('contact.faq.q2.question')}
            answer={t('contact.faq.q2.answer')}
          />
          <FAQItem
            question={t('contact.faq.q3.question')}
            answer={t('contact.faq.q3.answer')}
          />
        </div>
      </div>
    </div>
  )
}