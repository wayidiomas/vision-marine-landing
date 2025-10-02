'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/language-context'

const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactFormSection() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Integrar com API de envio de emails
      console.log('Form data:', data)

      // Simulando envio
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      reset()

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-2xl leading-8 tracking-[-0.6px] mb-6">
        {t('contact.form.title')}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-sm">
              {t('contact.form.name')}
            </Label>
            <Input
              id="name"
              type="text"
              className="h-10 rounded-md border-slate-200"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-600 text-xs">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-sm">
              {t('contact.form.email')}
            </Label>
            <Input
              id="email"
              type="email"
              className="h-10 rounded-md border-slate-200"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-600 text-xs">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-sm">
              {t('contact.form.phone')}
            </Label>
            <Input
              id="phone"
              type="tel"
              className="h-10 rounded-md border-slate-200"
              {...register('phone')}
            />
            {errors.phone && (
              <span className="text-red-600 text-xs">{errors.phone.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="subject" className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-sm">
              {t('contact.form.subject')}
            </Label>
            <Input
              id="subject"
              type="text"
              className="h-10 rounded-md border-slate-200"
              {...register('subject')}
            />
            {errors.subject && (
              <span className="text-red-600 text-xs">{errors.subject.message}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-sm">
            {t('contact.form.message')}
          </Label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-3 py-2 rounded-md border border-slate-200 font-['Segoe_UI:Regular',_sans-serif] text-sm text-gray-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4cb7e0] focus:border-transparent resize-none"
            placeholder={t('contact.form.messagePlaceholder')}
            {...register('message')}
          />
          {errors.message && (
            <span className="text-red-600 text-xs">{errors.message.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 bg-[#4cb7e0] hover:bg-[#3a9bc1] text-white font-semibold text-sm rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
        </Button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm text-center">
              {t('contact.form.successMessage')}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm text-center">
              {t('contact.form.errorMessage')}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}