// Redirecionamento para o endpoint correto
// Por algum motivo o AI SDK está ignorando o endpoint especificado
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('🔄 Redirecionando de /api/chat para /api/chat/vision-marine')

  // Pegar o body da requisição
  const body = await req.json()

  // Fazer uma requisição interna para o endpoint correto
  const response = await fetch(`${req.nextUrl.origin}/api/chat/vision-marine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  // Retornar a resposta do endpoint correto
  return response
}