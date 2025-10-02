'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Language {
  code: string
  name: string
  flag: string
  displayName: string
}

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const languages: Language[] = [
  {
    code: 'pt-BR',
    name: 'Português',
    flag: '/flag-br.svg',
    displayName: 'PT'
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '/flag-us.svg',
    displayName: 'EN'
  }
]

// Translations object
const translations = {
  'pt-BR': {
    // Hero Section
    'hero.title.line1': 'Navegue pelo',
    'hero.title.line2': 'Conhecimento Naval',
    'hero.subtitle': 'Continue sua jornada de aprendizado com os melhores profissionais da área marítima.',
    'hero.cta': 'Acessar plataforma',

    // Stats Section
    'stats.active_students': 'Alunos Ativos',
    'stats.training_courses': 'Treinamentos',
    'stats.approval_rate': 'Aprovação',

    // Card Section
    'card.next_class': 'Próxima Turma',
    'card.view_all': 'Ver Todas as Turmas',

    // Header
    'header.login': 'Entrar',
    'header.home': 'Início',
    'header.services': 'Serviços',
    'header.companies': 'Para Empresas',
    'header.about': 'Sobre',
    'header.contact': 'Contato',
    'header.search_placeholder': 'Buscar treinamentos',
    'header.language': 'Idioma',

    // Contact Page
    'contact.hero.title': 'Entre em Contato',
    'contact.hero.subtitle': 'Estamos aqui para ajudar você a navegar em direção ao seu futuro profissional. Entre em contato conosco para esclarecer dúvidas ou obter mais informações.',

    // Contact Form
    'contact.form.title': 'Envie sua Mensagem',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'E-mail',
    'contact.form.phone': 'Telefone',
    'contact.form.subject': 'Assunto',
    'contact.form.message': 'Mensagem',
    'contact.form.messagePlaceholder': 'Descreva sua dúvida ou solicitação...',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.form.successMessage': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    'contact.form.errorMessage': 'Erro ao enviar mensagem. Tente novamente.',

    // Contact Info
    'contact.info.title': 'Informações de Contato',
    'contact.info.subtitle': 'Nossa equipe está pronta para atendê-lo e esclarecer todas as suas dúvidas sobre nossos Treinamentos e certificações.',
    'contact.info.address.title': 'Endereço',
    'contact.info.address.street': 'Av. Atlântica, 1000',
    'contact.info.address.city': 'Centro - Rio de Janeiro, RJ',
    'contact.info.address.zip': 'CEP: 20000-000',
    'contact.info.phone.title': 'Telefone',
    'contact.info.phone.main': '(21) 3333-4444',
    'contact.info.phone.mobile': '(21) 99999-8888',
    'contact.info.email.title': 'E-mail',
    'contact.info.email.general': 'contato@navalTreinamentos.com.br',
    'contact.info.email.support': 'suporte@navalTreinamentos.com.br',
    'contact.info.hours.title': 'Horário de Atendimento',
    'contact.info.hours.weekdays': 'Segunda a Sexta: 8h às 18h',
    'contact.info.hours.saturday': 'Sábado: 8h às 12h',

    // FAQ
    'contact.faq.title': 'Perguntas Frequentes',
    'contact.faq.q1.question': 'Como funcionam as certificações?',
    'contact.faq.q1.answer': 'Todos os nossos Treinamentos oferecem certificados reconhecidos pela Marinha do Brasil e órgãos internacionais.',
    'contact.faq.q2.question': 'Posso fazer mais de um curso?',
    'contact.faq.q2.answer': 'Sim! Oferecemos descontos progressivos para alunos que se matriculam em múltiplos Treinamentos.',
    'contact.faq.q3.question': 'Há suporte durante o curso?',
    'contact.faq.q3.answer': 'Sim, oferecemos suporte completo com instrutores especializados e comunidade ativa de alunos.',

    // Services Menu
    'services.featured.title': 'Soluções Completas',
    'services.featured.description': 'Oferecemos treinamentos especializados, e-learning e consultoria para profissionais marítimos.',
    'services.featured.cta': 'Explorar todos os serviços',
    'services.trainings.title': 'Treinamentos',
    'services.trainings.dp_induction': 'DP Induction',
    'services.trainings.dp_simulator': 'DP Simulator',
    'services.trainings.dp_refresher': 'DP Refresher',
    'services.trainings.all_trainings': 'Todos os Treinamentos',
    'services.elearning.title': 'E-learning',
    'services.elearning.cpd': 'CPD - Continuous Professional Development',
    'services.elearning.gold_rules': 'Gold Rules',
    'services.elearning.all_elearning': 'Todos os E-learning',
    'services.consulting.title': 'Consultoria',
    'services.consulting.competence_assessment': 'Avaliação de Competência',
    'services.consulting.onboard_services': 'Serviços a Bordo',
    'services.consulting.dp_documentation': 'Documentação DP',
    'services.consulting.all_consulting': 'Todas as Consultorias'
  },
  'en-US': {
    // Hero Section
    'hero.title.line1': 'Navigate through',
    'hero.title.line2': 'Naval Knowledge',
    'hero.subtitle': 'Continue your learning journey with the best maritime professionals.',
    'hero.cta': 'Access platform',

    // Stats Section
    'stats.active_students': 'Active Students',
    'stats.training_courses': 'Training Courses',
    'stats.approval_rate': 'Approval Rate',

    // Card Section
    'card.next_class': 'Next Class',
    'card.view_all': 'View All Classes',

    // Header
    'header.login': 'Login',
    'header.home': 'Home',
    'header.services': 'Services',
    'header.companies': 'For Companies',
    'header.about': 'About',
    'header.contact': 'Contact',
    'header.search_placeholder': 'Search training courses',
    'header.language': 'Language',

    // Contact Page
    'contact.hero.title': 'Get in Touch',
    'contact.hero.subtitle': 'We are here to help you navigate towards your professional future. Contact us to clarify doubts or get more information.',

    // Contact Form
    'contact.form.title': 'Send Your Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Describe your question or request...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.successMessage': 'Message sent successfully! We will contact you soon.',
    'contact.form.errorMessage': 'Error sending message. Please try again.',

    // Contact Info
    'contact.info.title': 'Contact Information',
    'contact.info.subtitle': 'Our team is ready to assist you and clarify all your questions about our Training and certifications.',
    'contact.info.address.title': 'Address',
    'contact.info.address.street': 'Av. Atlântica, 1000',
    'contact.info.address.city': 'Centro - Rio de Janeiro, RJ',
    'contact.info.address.zip': 'ZIP: 20000-000',
    'contact.info.phone.title': 'Phone',
    'contact.info.phone.main': '(21) 3333-4444',
    'contact.info.phone.mobile': '(21) 99999-8888',
    'contact.info.email.title': 'Email',
    'contact.info.email.general': 'contact@navalTreinamentos.com.br',
    'contact.info.email.support': 'support@navalTreinamentos.com.br',
    'contact.info.hours.title': 'Business Hours',
    'contact.info.hours.weekdays': 'Monday to Friday: 8am to 6pm',
    'contact.info.hours.saturday': 'Saturday: 8am to 12pm',

    // FAQ
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.q1.question': 'How do certifications work?',
    'contact.faq.q1.answer': 'All our Training courses offer certificates recognized by the Brazilian Navy and international organizations.',
    'contact.faq.q2.question': 'Can I take more than one course?',
    'contact.faq.q2.answer': 'Yes! We offer progressive discounts for students who enroll in multiple Training courses.',
    'contact.faq.q3.question': 'Is there support during the course?',
    'contact.faq.q3.answer': 'Yes, we offer complete support with specialized instructors and an active student community.',

    // Services Menu
    'services.featured.title': 'Complete Solutions',
    'services.featured.description': 'We offer specialized training, e-learning, and consulting for maritime professionals.',
    'services.featured.cta': 'Explore all services',
    'services.trainings.title': 'Training',
    'services.trainings.dp_induction': 'DP Induction',
    'services.trainings.dp_simulator': 'DP Simulator',
    'services.trainings.dp_refresher': 'DP Refresher',
    'services.trainings.all_trainings': 'All Training',
    'services.elearning.title': 'E-learning',
    'services.elearning.cpd': 'CPD - Continuous Professional Development',
    'services.elearning.gold_rules': 'Gold Rules',
    'services.elearning.all_elearning': 'All E-learning',
    'services.consulting.title': 'Consulting',
    'services.consulting.competence_assessment': 'Competence Assessment',
    'services.consulting.onboard_services': 'Onboard Services',
    'services.consulting.dp_documentation': 'DP Documentation',
    'services.consulting.all_consulting': 'All Consulting'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]) // Default PT-BR

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('vision-marine-language')
    if (savedLanguage) {
      const found = languages.find(lang => lang.code === savedLanguage)
      if (found) {
        setCurrentLanguage(found)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem('vision-marine-language', language.code)
  }

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations]
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { languages }