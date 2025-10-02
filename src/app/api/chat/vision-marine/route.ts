import { openai } from '@ai-sdk/openai'
import { streamText, generateText, tool, embed, convertToModelMessages } from 'ai'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

// Sistema de mensagens para a Vision Marine AI
const VISION_MARINE_SYSTEM_PROMPT = `
Você é a assistente virtual oficial da Vision Marine, a principal plataforma de educação marítima e naval do Brasil.

IDENTIDADE:
- Nome: Assistente Vision Marine
- Especialidade: Treinamentos marítimos, certificações navais, cursos especializados
- Tom: Profissional, prestativo, conhecedor do setor marítimo
- Idioma: Português brasileiro

CONHECIMENTO BASE:
A Vision Marine oferece:
- Treinamentos especializados em Dynamic Positioning (DP)
- Certificações internacionais
- Cursos online e presenciais
- Formação para profissionais marítimos
- Simuladores profissionais
- Aulas 100% online com suporte 24/7

DIRETRIZES:
1. Sempre seja prestativo e profissional
2. Forneça informações precisas sobre nossos treinamentos
3. Se não souber algo específico, sugira contato direto
4. Incentive a certificação e desenvolvimento profissional
5. Use linguagem técnica adequada para o setor marítimo
6. Seja empático com as necessidades de carreira dos usuários

LIMITAÇÕES:
- Não invente preços ou datas específicas sem confirmação
- Para informações muito específicas, direcione para contato direto
- Sempre mantenha foco em educação marítima
`

// Tool para buscar cursos disponíveis
const getCourseInformation = tool({
  description: 'Busca informações sobre cursos e treinamentos disponíveis na Vision Marine',
  inputSchema: z.object({
    query: z.string(),
    categoria: z.string().nullable()
  }),
  execute: async ({ query, categoria }) => {
    try {
      let supabaseQuery = supabase
        .from('vw_proximos_cursos')
        .select('*')
        .order('data_inicio', { ascending: true })
        .limit(5)

      // Aplicar filtros baseados na query
      if (categoria) {
        supabaseQuery = supabaseQuery.ilike('categoria', `%${categoria}%`)
      }

      if (query) {
        supabaseQuery = supabaseQuery.or(
          `curso_nome.ilike.%${query}%,descricao.ilike.%${query}%,instrutor.ilike.%${query}%`
        )
      }

      const { data: courses, error } = await supabaseQuery

      if (error) {
        console.error('Erro ao buscar cursos:', error)
        return {
          success: false,
          message: 'Erro ao buscar informações dos cursos. Tente novamente ou entre em contato conosco.'
        }
      }

      if (!courses || courses.length === 0) {
        return {
          success: true,
          message: 'Não encontrei cursos específicos para sua busca. Temos diversos treinamentos especializados em Dynamic Positioning, Navegação e Segurança Marítima. Entre em contato para mais informações.',
          courses: []
        }
      }

      return {
        success: true,
        courses: courses.map(course => ({
          nome: course.curso_nome,
          descricao: course.descricao,
          nivel: course.nivel,
          carga_horaria: course.carga_horaria,
          preco: course.preco,
          categoria: course.categoria,
          instrutor: course.instrutor,
          data_inicio: course.data_formatada,
          vagas_disponiveis: course.vagas_disponiveis,
          modalidade: course.modalidade,
          local: course.local
        })),
        message: `Encontrei ${courses.length} curso(s) relacionado(s) à sua busca.`
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar cursos:', error)
      return {
        success: false,
        message: 'Erro interno. Entre em contato conosco para mais informações.'
      }
    }
  }
})

// Tool para informações de contato
const getContactInformation = tool({
  description: 'Fornece informações de contato da Vision Marine',
  inputSchema: z.object({
    tipo: z.enum(['geral', 'comercial', 'suporte', 'certificacao'])
  }),
  execute: async ({ tipo }) => {
    const contactInfo = {
      geral: {
        email: 'contato@visionmarine.com.br',
        telefone: '(11) 99999-9999',
        endereco: 'Av. Atlântica, 1000 - Santos, SP - Brasil',
        horario: 'Segunda a Sexta: 8h às 18h'
      },
      comercial: {
        email: 'vendas@visionmarine.com.br',
        telefone: '(11) 99999-9999',
        whatsapp: '(11) 99999-9999',
        message: 'Nossa equipe comercial está pronta para ajudar com orçamentos e informações sobre nossos treinamentos.'
      },
      suporte: {
        email: 'suporte@visionmarine.com.br',
        telefone: '(11) 99999-9999',
        disponibilidade: '24/7',
        message: 'Suporte técnico disponível 24 horas por dia, 7 dias por semana.'
      },
      certificacao: {
        email: 'certificacao@visionmarine.com.br',
        telefone: '(11) 99999-9999',
        message: 'Equipe especializada em certificações internacionais e validação de cursos.'
      }
    }

    return {
      success: true,
      contato: contactInfo[tipo],
      message: `Aqui estão as informações de contato para ${tipo}.`
    }
  }
})

// Tool para estatísticas da Vision Marine
const getCompanyStats = tool({
  description: 'Fornece estatísticas e números da Vision Marine',
  inputSchema: z.object({
    tipo: z.enum(['geral', 'cursos', 'alunos', 'certificacoes'])
  }),
  execute: async ({ tipo }) => {
    const stats = {
      geral: {
        alunos_formados: '2.500+',
        treinamentos_disponiveis: '50+',
        taxa_aprovacao: '98%',
        anos_experiencia: '15+',
        message: 'A Vision Marine é líder em educação marítima no Brasil.'
      },
      cursos: {
        total_cursos: '50+',
        modalidades: ['Online', 'Presencial', 'Híbrido'],
        categorias: ['Dynamic Positioning', 'Navegação', 'Segurança', 'Simulação'],
        message: 'Oferecemos ampla variedade de treinamentos especializados.'
      },
      alunos: {
        alunos_ativos: '500+',
        alunos_formados: '2.500+',
        paises_atendidos: '5+',
        message: 'Nossa comunidade de profissionais marítimos cresce continuamente.'
      },
      certificacoes: {
        certificacoes_emitidas: '2.500+',
        taxa_aprovacao: '98%',
        validade_internacional: true,
        message: 'Nossas certificações são reconhecidas internacionalmente.'
      }
    }

    return {
      success: true,
      dados: stats[tipo],
      message: stats[tipo].message
    }
  }
})

// Interface para resultados RAG
interface RAGResult {
  title: string;
  content_chunk: string;
  type: string;
  category: string;
  similarity: number;
  metadata: Record<string, unknown>;
}

// Tool para busca semântica RAG
const searchKnowledgeBase = tool({
  description: 'Busca informações relevantes na base de conhecimento usando similaridade semântica',
  inputSchema: z.object({
    query: z.string(),
    threshold: z.number().nullable(),
    limit: z.number().nullable()
  }),
  execute: async ({ query, threshold, limit }) => {
    const finalThreshold = threshold || 0.7
    const finalLimit = limit || 5
    try {
      // Gerar embedding da query do usuário
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: query
      })

      // Buscar conteúdo similar no banco
      const { data, error } = await supabase.rpc('match_vision_marine_content', {
        query_embedding: embedding,
        match_threshold: finalThreshold,
        match_count: finalLimit
      })

      if (error) {
        console.error('Erro na busca RAG:', error)
        return {
          success: false,
          message: 'Erro ao buscar informações na base de conhecimento.',
          results: []
        }
      }

      if (!data || data.length === 0) {
        return {
          success: true,
          message: 'Não encontrei informações específicas sobre sua consulta na nossa base de conhecimento.',
          results: []
        }
      }

      return {
        success: true,
        message: `Encontrei ${data.length} informação(ões) relevante(s) sobre sua consulta.`,
        results: data.map((item: RAGResult) => ({
          title: item.title,
          content: item.content_chunk,
          type: item.type,
          category: item.category,
          similarity: Math.round(item.similarity * 100),
          metadata: item.metadata
        }))
      }
    } catch (error) {
      console.error('Erro inesperado na busca RAG:', error)
      return {
        success: false,
        message: 'Erro interno na busca por informações.',
        results: []
      }
    }
  }
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body

    console.log('📥 Body recebido:', JSON.stringify(body, null, 2))
    console.log('📥 Mensagens extraídas:', JSON.stringify(messages, null, 2))

    // Validar se messages existe e é um array
    if (!messages || !Array.isArray(messages)) {
      console.error('❌ Messages inválido:', messages)
      return new Response(
        JSON.stringify({
          error: 'Formato de mensagens inválido. Esperado um array de mensagens.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Validar se há pelo menos uma mensagem
    if (messages.length === 0) {
      console.error('❌ Array de messages vazio')
      return new Response(
        JSON.stringify({
          error: 'Nenhuma mensagem foi enviada.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Messages válido, convertendo formato...')

    // Converter mensagens do formato v4 (content) para v5 (parts)
    const convertedMessages = messages.map(message => {
      // Se já estiver no formato v5 (com parts), manter
      if (message.parts) {
        return message
      }

      // Se estiver no formato v4 (com content), converter para v5
      if (message.content) {
        return {
          ...message,
          parts: [
            {
              type: 'text',
              text: message.content
            }
          ]
        }
      }

      // Se não tiver nem content nem parts, erro
      throw new Error(`Mensagem inválida: ${JSON.stringify(message)}`)
    })

    console.log('✅ Messages convertidas para v5:', JSON.stringify(convertedMessages, null, 2))

    // Verificar se convertedMessages está válido antes de converter
    if (!convertedMessages || !Array.isArray(convertedMessages)) {
      throw new Error('Converted messages is not a valid array')
    }

    const modelMessages = convertToModelMessages(convertedMessages)
    console.log('✅ Model messages:', JSON.stringify(modelMessages, null, 2))

    console.log('🤖 Iniciando streamText com gpt-4o...')
    const result = await streamText({
      // Modelo atual: gpt-4o (funciona com streaming)
      model: openai('gpt-4o'),
      // Para usar gpt-5-mini no futuro quando streaming for liberado:
      // model: openai('gpt-5-mini'),
      system: VISION_MARINE_SYSTEM_PROMPT,
      messages: modelMessages,
      tools: {
        getCourseInformation,
        getContactInformation,
        getCompanyStats,
        searchKnowledgeBase
      },
      maxToolRoundtrips: 3,
      temperature: 0.7,
    })

    console.log('✅ StreamText criado, convertendo para UIMessageStreamResponse...')
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('💥 Erro na API do chat:', error)
    return new Response(
      JSON.stringify({
        error: 'Erro interno do servidor. Tente novamente em alguns instantes.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}