// Script para gerar embeddings dos recursos existentes na Vision Marine
// Execute com: node scripts/generate-embeddings.js

import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Função para dividir texto em chunks
function chunkText(text, maxTokens = 500) {
  const sentences = text.split(/[.!?]+/)
  const chunks = []
  let currentChunk = ''

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim()
    if (!trimmedSentence) continue

    // Estimativa grosseira: ~4 caracteres por token
    const estimatedTokens = (currentChunk + ' ' + trimmedSentence).length / 4

    if (estimatedTokens > maxTokens && currentChunk) {
      chunks.push(currentChunk.trim())
      currentChunk = trimmedSentence
    } else {
      currentChunk += (currentChunk ? ' ' : '') + trimmedSentence
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks.filter(chunk => chunk.length > 50) // Remove chunks muito pequenos
}

async function generateEmbeddings() {
  try {
    console.log('🚀 Iniciando geração de embeddings...')

    // Buscar todos os recursos sem embeddings
    const { data: resources, error: fetchError } = await supabase
      .from('vision_marine_resources')
      .select('id, title, content, type, category, metadata')

    if (fetchError) {
      throw new Error(`Erro ao buscar recursos: ${fetchError.message}`)
    }

    console.log(`📚 Encontrados ${resources.length} recursos para processar`)

    for (const resource of resources) {
      console.log(`\n🔄 Processando: ${resource.title}`)

      // Verificar se já existem embeddings para este recurso
      const { data: existingEmbeddings } = await supabase
        .from('vision_marine_embeddings')
        .select('id')
        .eq('resource_id', resource.id)
        .limit(1)

      if (existingEmbeddings && existingEmbeddings.length > 0) {
        console.log('⏭️  Embeddings já existem, pulando...')
        continue
      }

      // Dividir conteúdo em chunks
      const chunks = chunkText(resource.content, 500)
      console.log(`📄 Criados ${chunks.length} chunks`)

      // Gerar embeddings para cada chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        console.log(`   🤖 Gerando embedding para chunk ${i + 1}/${chunks.length}`)

        try {
          // Gerar embedding usando AI SDK
          const { embedding } = await embed({
            model: openai.embedding('text-embedding-3-small'),
            value: chunk
          })

          // Salvar embedding no banco
          const { error: insertError } = await supabase
            .from('vision_marine_embeddings')
            .insert({
              resource_id: resource.id,
              content_chunk: chunk,
              embedding: embedding,
              token_count: Math.ceil(chunk.length / 4), // Estimativa
              chunk_index: i
            })

          if (insertError) {
            console.error(`❌ Erro ao salvar embedding: ${insertError.message}`)
          } else {
            console.log(`   ✅ Embedding ${i + 1} salvo com sucesso`)
          }

          // Pequena pausa para evitar rate limits
          await new Promise(resolve => setTimeout(resolve, 100))

        } catch (embeddingError) {
          console.error(`❌ Erro ao gerar embedding para chunk ${i + 1}:`, embeddingError)
        }
      }
    }

    console.log('\n🎉 Processo de geração de embeddings concluído!')

    // Mostrar estatísticas finais
    const { data: stats } = await supabase
      .from('vision_marine_embeddings')
      .select('id')

    console.log(`📊 Total de embeddings gerados: ${stats?.length || 0}`)

  } catch (error) {
    console.error('💥 Erro no processo:', error)
    process.exit(1)
  }
}

// Executar script
generateEmbeddings()