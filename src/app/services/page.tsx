'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { ChevronLeft, ChevronRight, Clock, TrendingUp, X, Play, Info, ChevronDown } from 'lucide-react'

interface ServiceCard {
  id: string
  category: string
  tags: string[]
  title: string
  duration: string
  price: string
  difficulty: string
  type: 'price' | 'consultation'
  image: string
  videoPreview?: string
  description: string
  highlights: string[]
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [expandedCard, setExpandedCard] = useState<ServiceCard | null>(null)
  const [isHeroSticky, setIsHeroSticky] = useState(false)
  const [heroHeight, setHeroHeight] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('E-learning')
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesStartRef = useRef<HTMLDivElement>(null)
  const elearningRef = useRef<HTMLDivElement>(null)
  const treinamentosRef = useRef<HTMLDivElement>(null)
  const consultoriasRef = useRef<HTMLDivElement>(null)

  // Smooth scroll detection with RAF for performance + active section detection
  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY
        const heroElement = heroRef.current

        if (heroElement) {
          const heroRect = heroElement.getBoundingClientRect()
          const headerHeight = 76 // Header height

          // Calculate if hero should be sticky
          const shouldBeSticky = scrollPosition > (heroElement.offsetTop - headerHeight)

          if (shouldBeSticky !== isHeroSticky) {
            setIsHeroSticky(shouldBeSticky)
          }

          if (heroHeight !== heroElement.offsetHeight) {
            setHeroHeight(heroElement.offsetHeight)
          }
        }

        // Detect active section based on viewport center
        const viewportCenter = window.innerHeight / 2 + window.scrollY
        const sections = [
          { name: 'E-learning', ref: elearningRef },
          { name: 'Treinamentos', ref: treinamentosRef },
          { name: 'Consultorias', ref: consultoriasRef }
        ]

        let closestSection = 'E-learning'
        let minDistance = Infinity

        sections.forEach(section => {
          if (section.ref.current) {
            const rect = section.ref.current.getBoundingClientRect()
            const sectionCenter = rect.top + window.scrollY + rect.height / 2
            const distance = Math.abs(viewportCenter - sectionCenter)

            if (distance < minDistance) {
              minDistance = distance
              closestSection = section.name
            }
          }
        })

        if (closestSection !== activeSection) {
          setActiveSection(closestSection)
        }
      })
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isHeroSticky, heroHeight, activeSection])

  // Mock data with images and videos
  const services: ServiceCard[] = [
    // E-learning
    {
      id: '1',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Regras de Ouro DP',
      duration: '2h',
      price: 'R$ 250',
      difficulty: 'Básico',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      videoPreview: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Aprenda as regras fundamentais de Dynamic Positioning com especialistas da indústria.',
      highlights: ['Certificado reconhecido', '2 horas de conteúdo', 'Acesso vitalício', 'Suporte 24/7']
    },
    {
      id: '2',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'CPD Personalizado - Básico',
      duration: '4h',
      price: 'Sob medida',
      difficulty: 'Básico',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      videoPreview: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Desenvolvimento profissional contínuo adaptado às suas necessidades específicas.',
      highlights: ['Conteúdo personalizado', 'Mentoria individual', 'Flexibilidade total', 'Certificação']
    },
    {
      id: '3',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'CPD Personalizado - Intermediário',
      duration: '6h',
      price: 'Sob medida',
      difficulty: 'Intermediário',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/11/29/141648-775821929_large.mp4',
      description: 'Aprofunde seus conhecimentos em DP com treinamento personalizado de nível intermediário.',
      highlights: ['Casos práticos', 'Simulações avançadas', 'Material exclusivo', 'Networking']
    },
    {
      id: '4',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'CPD Personalizado - Avançado',
      duration: '8h',
      price: 'Sob medida',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2020/04/28/37158-416065608_large.mp4',
      description: 'Treinamento avançado para profissionais que buscam excelência operacional.',
      highlights: ['Expertise técnica', 'Consultoria especializada', 'Projetos reais', 'Certificação elite']
    },
    {
      id: '13',
      category: 'E-learning',
      tags: ['E-learning', 'Online', 'Novo'],
      title: 'Fundamentos de DP',
      duration: '3h',
      price: 'R$ 180',
      difficulty: 'Básico',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      videoPreview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Introdução aos conceitos fundamentais de Dynamic Positioning para iniciantes.',
      highlights: ['Conteúdo para iniciantes', 'Exercícios práticos', 'Material de apoio', 'Certificado']
    },
    {
      id: '14',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Operações DP Avançadas',
      duration: '10h',
      price: 'R$ 450',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      description: 'Curso avançado para operadores experientes em sistemas de posicionamento dinâmico.',
      highlights: ['Casos complexos', 'Simulações realistas', 'Certificação avançada', 'Mentoria']
    },
    {
      id: '15',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Segurança em DP',
      duration: '5h',
      price: 'R$ 320',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/03/15/154887-808049894_large.mp4',
      description: 'Aprenda as melhores práticas de segurança em operações de posicionamento dinâmico.',
      highlights: ['Normas de segurança', 'Procedimentos de emergência', 'Casos reais', 'Certificação']
    },
    // Treinamentos
    {
      id: '5',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial'],
      title: 'DP Induction',
      duration: '3h',
      price: 'R$ 2.400',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/01/10/146359-787992334_large.mp4',
      description: 'Introdução completa aos sistemas de posicionamento dinâmico para operadores.',
      highlights: ['Prática hands-on', 'Simulador de última geração', 'Instrutores certificados', 'Material didático']
    },
    {
      id: '6',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Híbrido'],
      title: 'DP Simulator',
      duration: '4h',
      price: 'R$ 1.290',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/10/25/136395-764598584_large.mp4',
      description: 'Treinamento prático em simulador de alta fidelidade para operações DP.',
      highlights: ['Simulador realista', 'Cenários complexos', 'Feedback imediato', 'Certificado oficial']
    },
    {
      id: '7',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial'],
      title: 'DP Refresher - 2h',
      duration: '2h',
      price: 'R$ 1.690',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2021/06/26/78825-568410160_large.mp4',
      description: 'Atualize seus conhecimentos em DP com as últimas práticas da indústria.',
      highlights: ['Conteúdo atualizado', 'Revisão completa', 'Novos procedimentos', 'Networking']
    },
    {
      id: '8',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial'],
      title: 'DP Refresher - 1h',
      duration: '1h',
      price: 'R$ 1.690',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2020/06/20/42674-434327643_large.mp4',
      description: 'Revisão rápida e eficiente dos conceitos essenciais de Dynamic Positioning.',
      highlights: ['Formato express', 'Foco em essenciais', 'Prático e objetivo', 'Certificado']
    },
    // Consultorias
    {
      id: '9',
      category: 'Consultorias',
      tags: ['Consultoria', 'Presencial'],
      title: 'Serviços a Bordo',
      duration: 'Sob demanda',
      price: 'Sob consulta',
      difficulty: 'Intermediário',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/05/02/116347-706011074_large.mp4',
      description: 'Consultoria especializada direto na sua embarcação com soluções personalizadas.',
      highlights: ['Atendimento in-loco', 'Análise técnica', 'Relatórios detalhados', 'Suporte contínuo']
    },
    {
      id: '10',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido'],
      title: 'Documentação DP - Básico',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Intermediário',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/08/02/173951-852090569_large.mp4',
      description: 'Desenvolvimento e revisão de documentação técnica para sistemas DP.',
      highlights: ['Conformidade regulatória', 'Documentação completa', 'Revisão técnica', 'Suporte legal']
    },
    {
      id: '11',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido'],
      title: 'Documentação DP - Intermediário',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2020/02/18/31606-392252617_large.mp4',
      description: 'Consultoria avançada para documentação de sistemas DP complexos.',
      highlights: ['Análise profunda', 'Otimização de processos', 'Auditoria técnica', 'Certificações']
    },
    {
      id: '12',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido'],
      title: 'Documentação DP - Avançado',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/12/05/142144-778056298_large.mp4',
      description: 'Solução completa de documentação para operações DP de alto nível.',
      highlights: ['Expertise internacional', 'Compliance total', 'Gestão de riscos', 'Suporte premium']
    },
    // Additional E-learning courses for ultrawide displays
    {
      id: '16',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Sistemas de Referência DP',
      duration: '6h',
      price: 'R$ 380',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2024/01/15/196889-903858612_large.mp4',
      description: 'Aprenda sobre os diferentes sistemas de referência usados em DP.',
      highlights: ['DGPS', 'Taut wire', 'Acoustic systems', 'Material completo']
    },
    {
      id: '17',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Modos de Operação DP',
      duration: '4h',
      price: 'R$ 280',
      difficulty: 'Básico',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
      description: 'Conheça os diferentes modos de operação em sistemas DP.',
      highlights: ['Manual mode', 'Auto mode', 'Joystick', 'Certificado']
    },
    {
      id: '18',
      category: 'E-learning',
      tags: ['E-learning', 'Online', 'Destaque'],
      title: 'Falhas em Sistemas DP',
      duration: '8h',
      price: 'R$ 420',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/05/22/164080-829142361_large.mp4',
      description: 'Análise detalhada de falhas em sistemas DP e como reagir.',
      highlights: ['Casos reais', 'Análise de acidentes', 'Procedimentos', 'Expert review']
    },
    {
      id: '19',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Weather Analysis for DP',
      duration: '5h',
      price: 'R$ 340',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
      description: 'Análise meteorológica aplicada a operações de posicionamento dinâmico.',
      highlights: ['Previsão do tempo', 'Correntes marinhas', 'Ventos', 'Simulações']
    },
    {
      id: '20',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'Power Management DP',
      duration: '7h',
      price: 'R$ 390',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/11/28/141467-775862085_large.mp4',
      description: 'Gestão de energia em operações DP críticas.',
      highlights: ['Power distribution', 'Backup systems', 'Blackout prevention', 'Certificação']
    },
    {
      id: '21',
      category: 'E-learning',
      tags: ['E-learning', 'Online'],
      title: 'DP Operations Planning',
      duration: '6h',
      price: 'R$ 360',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      description: 'Planejamento e preparação para operações de posicionamento dinâmico.',
      highlights: ['Risk assessment', 'Operations planning', 'Checklists', 'Best practices']
    },
    // Additional Treinamentos courses for ultrawide displays
    {
      id: '22',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial', 'Novo'],
      title: 'DP Advanced Simulator',
      duration: '8h',
      price: 'R$ 3.200',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/07/10/170422-844419653_large.mp4',
      description: 'Treinamento avançado com cenários complexos em simulador de última geração.',
      highlights: ['Cenários extremos', 'Emergências', 'Simulador 4K', 'Certificado avançado']
    },
    {
      id: '23',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial'],
      title: 'DP Fundamentals',
      duration: '16h',
      price: 'R$ 4.800',
      difficulty: 'Básico',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      description: 'Curso fundamental completo para iniciantes em DP.',
      highlights: ['Teoria completa', 'Prática extensiva', 'Material didático', 'Suporte pós-curso']
    },
    {
      id: '24',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Híbrido'],
      title: 'DP Operations Manager',
      duration: '24h',
      price: 'R$ 6.500',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/09/03/178803-862260736_large.mp4',
      description: 'Formação completa para gerentes de operações DP.',
      highlights: ['Liderança', 'Gestão de equipes', 'Planejamento', 'Certificação gerencial']
    },
    {
      id: '25',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial'],
      title: 'DP Emergency Response',
      duration: '6h',
      price: 'R$ 2.800',
      difficulty: 'Intermediário',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&q=80',
      description: 'Treinamento focado em resposta a emergências em operações DP.',
      highlights: ['Simulações de emergência', 'Drill out', 'Red alert', 'Blackout recovery']
    },
    {
      id: '26',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Presencial', 'Destaque'],
      title: 'DP Master Class',
      duration: '32h',
      price: 'R$ 8.900',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2024/02/08/199912-913023745_large.mp4',
      description: 'Curso master completo para profissionais que buscam excelência em DP.',
      highlights: ['Conteúdo exclusivo', 'Networking premium', 'Certificação master', 'Acesso vitalício']
    },
    {
      id: '27',
      category: 'Treinamentos',
      tags: ['Treinamento', 'Híbrido'],
      title: 'DP Field Engineer Training',
      duration: '20h',
      price: 'R$ 5.400',
      difficulty: 'Avançado',
      type: 'price',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      description: 'Treinamento especializado para engenheiros de campo DP.',
      highlights: ['Troubleshooting', 'Manutenção', 'Comissionamento', 'Certificação técnica']
    },
    // Additional Consultorias courses for ultrawide displays
    {
      id: '28',
      category: 'Consultorias',
      tags: ['Consultoria', 'Presencial'],
      title: 'Auditoria de Sistemas DP',
      duration: 'Sob demanda',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/04/18/160234-820098473_large.mp4',
      description: 'Auditoria completa de sistemas DP para conformidade e segurança.',
      highlights: ['Análise técnica', 'Relatório detalhado', 'Recomendações', 'Follow-up']
    },
    {
      id: '29',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido'],
      title: 'FMEA Analysis DP',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
      description: 'Análise FMEA específica para sistemas de posicionamento dinâmico.',
      highlights: ['Risk analysis', 'Failure modes', 'Mitigation strategies', 'Documentation']
    },
    {
      id: '30',
      category: 'Consultorias',
      tags: ['Consultoria', 'Presencial'],
      title: 'DP Trials Support',
      duration: 'Sob demanda',
      price: 'Sob consulta',
      difficulty: 'Intermediário',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2022/08/14/127717-740751429_large.mp4',
      description: 'Suporte técnico durante trials e comissionamento de sistemas DP.',
      highlights: ['Presença a bordo', 'Testes completos', 'Validação', 'Certificação']
    },
    {
      id: '31',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido', 'Novo'],
      title: 'DP Capability Assessment',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80',
      description: 'Avaliação completa das capacidades DP da embarcação.',
      highlights: ['Capability plots', 'Weather limits', 'Operations envelope', 'Technical report']
    },
    {
      id: '32',
      category: 'Consultorias',
      tags: ['Consultoria', 'Presencial'],
      title: 'Incident Investigation DP',
      duration: 'Sob demanda',
      price: 'Sob consulta',
      difficulty: 'Avançado',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80',
      videoPreview: 'https://cdn.pixabay.com/video/2023/11/14/189131-885813926_large.mp4',
      description: 'Investigação técnica de incidentes relacionados a sistemas DP.',
      highlights: ['Root cause analysis', 'Technical investigation', 'Expert report', 'Recommendations']
    },
    {
      id: '33',
      category: 'Consultorias',
      tags: ['Consultoria', 'Híbrido'],
      title: 'DP Training Program Development',
      duration: 'Projeto',
      price: 'Sob consulta',
      difficulty: 'Intermediário',
      type: 'consultation',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      description: 'Desenvolvimento de programas de treinamento DP customizados para sua empresa.',
      highlights: ['Customização', 'Material exclusivo', 'Train the trainer', 'Suporte contínuo']
    }
  ]

  const filteredServices = services.filter(service => {
    if (categoryFilter !== 'Todos' && service.category !== categoryFilter) return false
    return true
  })

  const categories = ['Todos', 'E-learning', 'Treinamentos', 'Consultorias']

  const scrollLeft = (id: string) => {
    const container = document.getElementById(id)
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = (id: string) => {
    const container = document.getElementById(id)
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleCardExpand = (service: ServiceCard) => {
    setExpandedCard(service)
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToServices = () => {
    if (servicesStartRef.current) {
      const headerHeight = 76
      const heroHeight = heroRef.current?.offsetHeight || 0
      const offset = isHeroSticky ? headerHeight + heroHeight : heroHeight

      window.scrollTo({
        top: servicesStartRef.current.offsetTop - offset + 20,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#070e2c] overflow-y-auto snap-y snap-proximity scroll-smooth">
      {/* Hero Section - Sticky at top with video */}
      <section
        ref={heroRef}
        className="sticky top-[76px] left-0 right-0 h-[55vh] lg:h-[60vh] flex items-center justify-center overflow-hidden z-40 shadow-2xl"
      >
        {expandedCard ? (
          // Expanded Card Preview in Hero
          <ExpandedPreviewHero service={expandedCard} onClose={() => setExpandedCard(null)} />
        ) : (
          // Default Hero Content with Video Background
          <>
            {/* Video Background */}
            <div className="absolute inset-0">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://cdn.pixabay.com/video/2022/06/06/119024-719457698_large.mp4" type="video/mp4" />
              </video>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e2c] via-[#070e2c]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070e2c]/80 via-transparent to-transparent" />

              {/* Animated Wave Effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {/* Shimmer Effect - Top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
                     style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

                {/* Wave Top 1 - Enhanced */}
                <svg className="absolute top-0 left-0 w-full h-32 lg:h-40" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
                  <path
                    fill="url(#wave-gradient-top-1)"
                    fillOpacity="1"
                    d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  >
                    <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
                      M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
                    " />
                  </path>
                  <defs>
                    <linearGradient id="wave-gradient-top-1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#2d9cdb" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#070e2c" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Wave Top 2 - Accent Layer */}
                <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.25 }}>
                  <path
                    fill="url(#wave-gradient-top-2)"
                    fillOpacity="1"
                    d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  >
                    <animate attributeName="d" dur="22s" repeatCount="indefinite" values="
                      M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,261.3C672,267,768,245,864,229.3C960,213,1056,203,1152,208C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
                    " />
                  </path>
                  <defs>
                    <linearGradient id="wave-gradient-top-2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#56ccf2" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#070e2c" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Wave 1 - Bottom */}
                <svg className="absolute bottom-0 left-0 w-full h-32 lg:h-48 opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
                  <path
                    fill="url(#wave-gradient-1)"
                    fillOpacity="1"
                    d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    style={{ animation: 'wave-animation-1 15s ease-in-out infinite' }}
                  >
                    <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                      M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
                    " />
                  </path>
                  <defs>
                    <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#070e2c" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Wave 2 - Bottom Middle */}
                <svg className="absolute bottom-0 left-0 w-full h-28 lg:h-40 opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                  <path
                    fill="url(#wave-gradient-2)"
                    fillOpacity="1"
                    d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  >
                    <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
                      M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,261.3C672,267,768,245,864,229.3C960,213,1056,203,1152,208C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
                    " />
                  </path>
                  <defs>
                    <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#070e2c" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Particles - Enhanced */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: i % 3 === 0 ? '4px' : '2px',
                        height: i % 3 === 0 ? '4px' : '2px',
                        background: i % 2 === 0 ? 'rgba(76, 183, 224, 0.6)' : 'rgba(86, 204, 242, 0.5)',
                        boxShadow: i % 3 === 0 ? '0 0 8px rgba(76, 183, 224, 0.8)' : '0 0 4px rgba(76, 183, 224, 0.8)',
                        filter: 'blur(1px)',
                        left: `${10 + (i * 7)}%`,
                        top: `${30 + (i % 5) * 12}%`,
                        animation: `float-particle ${6 + i * 1.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>

                {/* Horizontal Lines - Sonar Effect Enhanced */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(76, 183, 224, 0.4) 50%, transparent 100%)',
                        top: `${25 + i * 12}%`,
                        animation: `pulse-line ${3 + i * 0.8}s ease-in-out infinite`,
                        animationDelay: `${i * 1}s`,
                        boxShadow: '0 0 4px rgba(76, 183, 224, 0.3)'
                      }}
                    />
                  ))}
                </div>

                {/* Shimmer Accent Lines */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`shimmer-${i}`}
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#56ccf2]/50 to-transparent"
                      style={{
                        top: `${35 + i * 20}%`,
                        animation: `pulse-line ${5 + i * 1.5}s ease-in-out infinite`,
                        animationDelay: `${i * 2}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-left px-4 lg:px-16 w-full max-w-[1800px] mx-auto">
              <div className="max-w-2xl">
                <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-3xl lg:text-6xl mb-4 lg:mb-6 leading-tight">
                  Explore nossos <span className="text-[#4cb7e0]">serviços</span>
                </h1>
                <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-base lg:text-xl mb-6 lg:mb-8 max-w-xl">
                  Treinamentos especializados, e-learning e consultoria para profissionais marítimos
                </p>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-3 items-center">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 ${
                        categoryFilter === cat
                          ? 'bg-[#4cb7e0] text-white shadow-lg shadow-[#4cb7e0]/50 scale-105'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-md border border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070e2c] to-transparent pointer-events-none" />
          </>
        )}
      </section>

      {/* Services Sections - Vertical scroll with snap */}
      <div className="relative pt-4 pb-20">
        {/* E-learning Section */}
        {(categoryFilter === 'Todos' || categoryFilter === 'E-learning') && (
          <section
            ref={elearningRef}
            className="min-h-[65vh] snap-start flex flex-col justify-center px-4 lg:px-16 py-4 lg:py-10 transition-all duration-500 relative overflow-hidden"
            style={{
              opacity: activeSection === 'E-learning' ? 1 : 0.6,
              transform: activeSection === 'E-learning' ? 'scale(1)' : 'scale(0.98)'
            }}
          >
            {/* Vertical Wave - Left Side */}
            <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-left)"
                  d="M0,0 Q30,100 0,200 T0,400 T0,600 T0,800 T0,1000 L0,1000 L0,0 Z"
                >
                  <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
                    M0,0 Q30,100 0,200 T0,400 T0,600 T0,800 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q40,150 0,250 T0,450 T0,650 T0,850 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q30,100 0,200 T0,400 T0,600 T0,800 T0,1000 L0,1000 L0,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-left" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4cb7e0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Vertical Wave - Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-right)"
                  d="M100,0 Q70,100 100,200 T100,400 T100,600 T100,800 T100,1000 L100,1000 L100,0 Z"
                >
                  <animate attributeName="d" dur="14s" repeatCount="indefinite" values="
                    M100,0 Q70,100 100,200 T100,400 T100,600 T100,800 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q60,150 100,250 T100,450 T100,650 T100,850 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q70,100 100,200 T100,400 T100,600 T100,800 T100,1000 L100,1000 L100,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-right" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4cb7e0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto w-full relative z-10">
              {/* Header with visual indicator */}
              <div className="mb-4 lg:mb-10">
                <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl lg:text-4xl mb-2 px-4 lg:px-0">
                  E-learning
                </h2>
                <div className="h-1 w-20 bg-[#4cb7e0] rounded-full ml-4 lg:ml-0" />
              </div>
              <div className="relative group">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollLeft('elearning-row')}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -ml-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div
                  id="elearning-row"
                  className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing pl-4 lg:pl-0"
                  style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                    paddingRight: 'calc(30vw)'
                  }}
                >
                  {filteredServices
                    .filter(s => s.category === 'E-learning')
                    .map(service => (
                      <ServiceCardNetflix key={service.id} service={service} onExpand={handleCardExpand} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollRight('elearning-row')}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -mr-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Gradient fade on right to indicate more content */}
                <div className="absolute top-0 right-0 bottom-6 w-48 lg:w-64 bg-gradient-to-l from-[#070e2c] via-[#070e2c]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* Treinamentos Section */}
        {(categoryFilter === 'Todos' || categoryFilter === 'Treinamentos') && (
          <section
            ref={treinamentosRef}
            className="min-h-[65vh] snap-start flex flex-col justify-center px-4 lg:px-16 py-4 lg:py-10 transition-all duration-500 relative overflow-hidden"
            style={{
              opacity: activeSection === 'Treinamentos' ? 1 : 0.6,
              transform: activeSection === 'Treinamentos' ? 'scale(1)' : 'scale(0.98)'
            }}
          >
            {/* Vertical Wave - Left Side */}
            <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-left-2)"
                  d="M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z"
                >
                  <animate attributeName="d" dur="13s" repeatCount="indefinite" values="
                    M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q45,170 0,270 T0,470 T0,670 T0,870 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-left-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Vertical Wave - Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-right-2)"
                  d="M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z"
                >
                  <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                    M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q55,170 100,270 T100,470 T100,670 T100,870 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-right-2" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto w-full relative z-10">
              {/* Header with visual indicator */}
              <div className="mb-4 lg:mb-10">
                <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl lg:text-4xl mb-2 px-4 lg:px-0">
                  Treinamentos
                </h2>
                <div className="h-1 w-20 bg-[#4cb7e0] rounded-full ml-4 lg:ml-0" />
              </div>
              <div className="relative group">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollLeft('treinamentos-row')}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -ml-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div
                  id="treinamentos-row"
                  className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing pl-4 lg:pl-0"
                  style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                    paddingRight: 'calc(30vw)'
                  }}
                >
                  {filteredServices
                    .filter(s => s.category === 'Treinamentos')
                    .map(service => (
                      <ServiceCardNetflix key={service.id} service={service} onExpand={handleCardExpand} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollRight('treinamentos-row')}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -mr-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Gradient fade on right to indicate more content */}
                <div className="absolute top-0 right-0 bottom-6 w-48 lg:w-64 bg-gradient-to-l from-[#070e2c] via-[#070e2c]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* Consultorias Section */}
        {(categoryFilter === 'Todos' || categoryFilter === 'Consultorias') && (
          <section
            ref={consultoriasRef}
            className="min-h-[65vh] snap-start flex flex-col justify-center px-4 lg:px-16 py-4 lg:py-10 transition-all duration-500 relative overflow-hidden"
            style={{
              opacity: activeSection === 'Consultorias' ? 1 : 0.6,
              transform: activeSection === 'Consultorias' ? 'scale(1)' : 'scale(0.98)'
            }}
          >
            {/* Vertical Wave - Left Side */}
            <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-left-3)"
                  d="M0,0 Q32,110 0,210 T0,410 T0,610 T0,810 T0,1000 L0,1000 L0,0 Z"
                >
                  <animate attributeName="d" dur="14s" repeatCount="indefinite" values="
                    M0,0 Q32,110 0,210 T0,410 T0,610 T0,810 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q42,160 0,260 T0,460 T0,660 T0,860 T0,1000 L0,1000 L0,0 Z;
                    M0,0 Q32,110 0,210 T0,410 T0,610 T0,810 T0,1000 L0,1000 L0,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-left-3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#4cb7e0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Vertical Wave - Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path
                  fill="url(#wave-vertical-right-3)"
                  d="M100,0 Q68,110 100,210 T100,410 T100,610 T100,810 T100,1000 L100,1000 L100,0 Z"
                >
                  <animate attributeName="d" dur="16s" repeatCount="indefinite" values="
                    M100,0 Q68,110 100,210 T100,410 T100,610 T100,810 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q58,160 100,260 T100,460 T100,660 T100,860 T100,1000 L100,1000 L100,0 Z;
                    M100,0 Q68,110 100,210 T100,410 T100,610 T100,810 T100,1000 L100,1000 L100,0 Z
                  " />
                </path>
                <defs>
                  <linearGradient id="wave-vertical-right-3" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#4cb7e0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto w-full relative z-10">
              {/* Header with visual indicator */}
              <div className="mb-4 lg:mb-10">
                <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl lg:text-4xl mb-2 px-4 lg:px-0">
                  Consultorias
                </h2>
                <div className="h-1 w-20 bg-[#4cb7e0] rounded-full ml-4 lg:ml-0" />
              </div>
              <div className="relative group">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollLeft('consultorias-row')}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -ml-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div
                  id="consultorias-row"
                  className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing pl-4 lg:pl-0"
                  style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                    paddingRight: 'calc(30vw)'
                  }}
                >
                  {filteredServices
                    .filter(s => s.category === 'Consultorias')
                    .map(service => (
                      <ServiceCardNetflix key={service.id} service={service} onExpand={handleCardExpand} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollRight('consultorias-row')}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 items-center justify-center bg-black/70 hover:bg-[#4cb7e0] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -mr-8 hover:scale-110 shadow-lg shadow-[#4cb7e0]/20"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Gradient fade on right to indicate more content */}
                <div className="absolute top-0 right-0 bottom-6 w-48 lg:w-64 bg-gradient-to-l from-[#070e2c] via-[#070e2c]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

interface ServiceCardNetflixProps {
  service: ServiceCard
  onExpand: (service: ServiceCard) => void
}

function ServiceCardNetflix({ service, onExpand }: ServiceCardNetflixProps) {
  const [isHovering, setIsHovering] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Get difficulty badge color based on level
  const getDifficultyColor = (difficulty: string) => {
    const level = difficulty.toLowerCase()
    if (level.includes('básico') || level.includes('basic')) {
      return 'bg-[#56ccf2]/20 text-[#56ccf2] border border-[#56ccf2]/30'
    }
    if (level.includes('intermediário') || level.includes('intermediate')) {
      return 'bg-[#4cb7e0]/20 text-[#4cb7e0] border border-[#4cb7e0]/30'
    }
    if (level.includes('avançado') || level.includes('advanced')) {
      return 'bg-[#2d9cdb]/20 text-[#2d9cdb] border border-[#2d9cdb]/30'
    }
    return 'bg-[#4cb7e0]/20 text-[#4cb7e0] border border-[#4cb7e0]/30'
  }

  useEffect(() => {
    if (isHovering) {
      hoverTimerRef.current = setTimeout(() => {
        onExpand(service)
      }, 2000) // Increased to 2 seconds
    } else {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }

    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [isHovering, service, onExpand])

  const handleClick = () => {
    onExpand(service)
  }

  return (
    <div
      className="group relative flex-shrink-0 w-[240px] md:w-[320px] lg:w-[360px] xl:w-[400px] cursor-pointer snap-start"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] md:aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#4cb7e0]/30 will-change-transform select-none">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform"
          style={{ backgroundImage: `url(${service.image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {service.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm font-semibold rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
          <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-lg lg:text-xl mb-3 line-clamp-2">
            {service.title}
          </h3>

          <div className="flex items-center gap-4 text-white text-sm lg:text-base mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>{service.duration}</span>
            </div>
            <span className={`px-2.5 py-1 backdrop-blur-sm text-sm rounded font-semibold ${getDifficultyColor(service.difficulty)}`}>
              {service.difficulty}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-xl lg:text-2xl">
              {service.price}
            </span>
          </div>
        </div>

        {/* Trending Badge */}
        {service.id === '5' && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4cb7e0] to-[#2d9cdb] rounded-md text-white text-sm font-bold shadow-lg shadow-[#4cb7e0]/40 border border-[#56ccf2]/30">
              <TrendingUp className="w-4 h-4" />
              Popular
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ExpandedPreviewHeroProps {
  service: ServiceCard
  onClose: () => void
}

function ExpandedPreviewHero({ service, onClose }: ExpandedPreviewHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    console.log('ExpandedPreviewHero useEffect:', {
      hasVideo: !!videoElement,
      hasPreview: !!service.videoPreview,
      serviceId: service.id,
      videoSrc: service.videoPreview
    })

    if (videoElement && service.videoPreview) {
      // Load the video
      videoElement.load()
      // Reset video to beginning
      videoElement.currentTime = 0

      // Force play after a small delay
      const timer = setTimeout(() => {
        console.log('Attempting to play video...')
        videoElement.play()
          .then(() => console.log('Video playing successfully'))
          .catch(err => {
            console.log('Video autoplay prevented:', err)
            // Try again with user interaction
            videoElement.muted = true
            videoElement.play()
              .then(() => console.log('Video playing after mute'))
              .catch(err2 => console.log('Second attempt failed:', err2))
          })
      }, 200)

      return () => {
        clearTimeout(timer)
        if (videoElement) {
          videoElement.pause()
        }
      }
    }
  }, [service.id])

  return (
    <div className="absolute inset-0 bg-[#070e2c] z-50 animate-fadeIn">
      {/* Video Background */}
      <div className="absolute inset-0">
        {service.videoPreview ? (
          <video
            key={service.id}
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={service.videoPreview} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e2c] via-[#070e2c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e2c]/80 via-transparent to-transparent" />
      </div>

      {/* Content - Expanded for larger hero */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-16">
        <div className="max-w-3xl">
          {/* Tags */}
          <div className="flex gap-2 mb-3 lg:mb-4">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs lg:text-sm font-semibold rounded-md border border-white/30"
              >
                {tag}
              </span>
            ))}
            {service.id === '5' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4cb7e0] to-[#2d9cdb] rounded-md text-white text-xs lg:text-sm font-bold shadow-lg shadow-[#4cb7e0]/40 border border-[#56ccf2]/30">
                <TrendingUp className="w-4 h-4" />
                Popular
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-3xl lg:text-5xl mb-3 lg:mb-4 leading-tight">
            {service.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 lg:gap-5 text-base lg:text-lg mb-4 lg:mb-5">
            <span className="text-[#4cb7e0] font-bold text-xl lg:text-2xl">{service.price}</span>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>{service.duration}</span>
            </div>
            <span className="px-2.5 py-1 bg-[#4cb7e0]/20 text-[#4cb7e0] text-sm rounded border border-[#4cb7e0]/30 font-semibold">
              {service.difficulty}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-base lg:text-lg mb-5 lg:mb-6 leading-relaxed max-w-2xl">
            {service.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6 lg:mb-7 max-w-2xl">
            {service.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm lg:text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4cb7e0]" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 lg:gap-4">
            <button className="flex items-center justify-center gap-2 px-6 lg:px-7 py-2.5 lg:py-3 bg-white hover:bg-gray-200 text-black font-bold text-sm lg:text-base rounded-md transition-colors shadow-lg">
              <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
              {service.type === 'price' ? 'Ver detalhes' : 'Consultar agora'}
            </button>
            <button className="flex items-center justify-center gap-2 px-6 lg:px-7 py-2.5 lg:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm lg:text-base rounded-md transition-colors border border-white/30">
              <Info className="w-4 h-4 lg:w-5 lg:h-5" />
              Mais informações
            </button>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all group"
        aria-label="Fechar"
      >
        <X className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  )
}
