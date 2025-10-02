'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'

interface ChatWindowProps {
  onClose: () => void
  onNewMessage: () => void
}

// Constantes para cache
const CHAT_CACHE_KEY = 'vision-marine-chat-messages'
const WELCOME_MESSAGE_ID = 'welcome-message-1'

// Função para carregar mensagens do cache
const loadCachedMessages = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 loadCachedMessages: window undefined (SSR)')
    return null
  }

  try {
    const cached = localStorage.getItem(CHAT_CACHE_KEY)
    console.log('🔍 loadCachedMessages: cached data:', cached ? 'encontrado' : 'não encontrado')

    if (cached) {
      const messages = JSON.parse(cached)
      console.log('🔍 loadCachedMessages: parsed messages:', messages.length, 'mensagens')

      // Verificar se é um array válido e não está vazio
      if (Array.isArray(messages) && messages.length > 0) {
        console.log('✅ loadCachedMessages: retornando', messages.length, 'mensagens do cache')
        return messages
      }
    }
  } catch (error) {
    console.error('❌ Erro ao carregar cache do chat:', error)
  }

  console.log('📝 loadCachedMessages: usando mensagem padrão')
  return null
}

// Função para salvar mensagens no cache
const saveCachedMessages = (messages: any[]) => {
  if (typeof window === 'undefined') return

  try {
    // Filtrar mensagens vazias ou inválidas antes de salvar
    const validMessages = messages.filter(msg =>
      msg && (msg.content || (msg.parts && msg.parts.length > 0))
    )
    localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(validMessages))
  } catch (error) {
    console.error('Erro ao salvar cache do chat:', error)
  }
}

// Mensagem de boas-vindas padrão
const defaultWelcomeMessage = {
  id: WELCOME_MESSAGE_ID,
  role: 'assistant',
  parts: [
    {
      type: 'text',
      text: 'Olá! 👋 Sou a assistente virtual da Vision Marine. Como posso ajudá-lo hoje? Posso responder sobre nossos treinamentos, certificações, cursos disponíveis e muito mais!'
    }
  ]
}

export function ChatWindow({ onClose, onNewMessage }: ChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // AI SDK 5.0: Manage input state manually
  const [input, setInput] = useState('')

  // Lazy initialization para carregar mensagens do cache
  const [initialMessages] = useState(() => {
    const cachedMessages = loadCachedMessages()
    return cachedMessages || [defaultWelcomeMessage]
  })

  // Vercel AI SDK useChat hook (v5.0 format)
  const { messages, isLoading, error, sendMessage, clearError } = useChat({
    api: '/api/chat',
    initialMessages,
    onFinish: () => {
      onNewMessage()
    },
    onError: (error) => {
      console.error('Chat Error:', error)
    },
    keepLastMessageOnError: true
  })

  // Auto-save messages to cache whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      console.log('💾 Salvando mensagens no cache:', messages.length, 'mensagens')
      saveCachedMessages(messages)

      // Debug: verificar se foi salvo corretamente
      const saved = localStorage.getItem(CHAT_CACHE_KEY)
      console.log('✅ Verificação do cache:', saved ? 'Salvo com sucesso' : 'Falha ao salvar')
    }
  }, [messages])

  // Debug: Log initial messages on component mount
  useEffect(() => {
    console.log('🔄 Componente montado com initialMessages:', initialMessages.length, 'mensagens')
    console.log('📝 InitialMessages:', JSON.stringify(initialMessages, null, 2))
  }, [])

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length])

  // Focus input when window opens
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const suggestedQuestions = [
    "Quais treinamentos vocês oferecem?",
    "Como faço para me certificar?",
    "Qual é o preço dos cursos?",
    "Vocês têm cursos online?",
    "Como funciona a DP Induction?"
  ]

  const handleSuggestionClick = (question: string) => {
    // Usar sendMessage do AI SDK 5.0 para enviar mensagem diretamente
    sendMessage({ content: question })
  }

  // Handle form submission for AI SDK 5.0
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ content: input })
      setInput('') // Clear input after sending
    }
  }

  // Função para limpar cache e iniciar nova conversa
  const handleNewConversation = () => {
    try {
      localStorage.removeItem(CHAT_CACHE_KEY)
      window.location.reload()
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
    }
  }

  return (
    <div className={`
      fixed bottom-24 right-6 z-40
      w-80 md:w-96
      bg-white rounded-2xl shadow-2xl
      border border-gray-200
      transition-all duration-300 ease-out
      ${isMinimized ? 'h-16' : 'h-[500px] md:h-[600px]'}
      overflow-hidden
    `}>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          {/* Vision Marine Avatar */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13 3L15 5L9 11L7 9L5 11V13L11 7L13 9L15 7L21 13V11L19 9L21 9ZM10 12C8.9 12 8 12.9 8 14C8 15.1 8.9 16 10 16C11.1 16 12 15.1 12 14C12 12.9 11.1 12 10 12ZM6 20.5C4.6 21.2 4.1 22 3.5 22H2V24H22V22H20.5C19.9 22 19.4 21.2 18 20.5C16.6 19.8 15.1 19.5 13.5 19.5S10.4 19.8 9 20.5C7.6 21.2 7.1 22 6.5 22H6V20.5Z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Vision Marine</h3>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Online agora</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* New Conversation Button */}
          <button
            onClick={handleNewConversation}
            className="p-1 hover:bg-white/20 rounded-md transition-colors"
            aria-label="Nova conversa"
            title="Iniciar nova conversa"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v20M2 12h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded-md transition-colors"
            aria-label={isMinimized ? 'Expandir chat' : 'Minimizar chat'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d={isMinimized ? "M6 9L12 15L18 9" : "M18 15L12 9L6 15"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-md transition-colors"
            aria-label="Fechar chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80 md:h-96">
            {console.log('🔍 DEBUG - Rendering messages, total:', messages.length)}
            {messages.map((message, index) => {
              console.log(`🔍 DEBUG - Rendering message ${index}:`, {
                id: message.id,
                role: message.role,
                content: message.content,
                hasContent: !!message.content,
                contentType: typeof message.content,
                contentLength: message.content?.length || 0,
                parts: message.parts,
                partsText: message.parts?.[0]?.text,
                finalText: message.content || (message.parts?.[0]?.text)
              })

              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-2xl px-4 py-2 text-sm
                      ${message.role === 'user'
                        ? 'bg-[#4cb7e0] text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap">
                      {message.content || message.parts?.find(part => part.type === 'text')?.text || ''}
                    </div>
                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTime(new Date(message.createdAt || Date.now()))}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error indicator */}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 text-red-800 rounded-2xl rounded-bl-md px-4 py-2 text-sm max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Erro ao enviar mensagem. Tente novamente.</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => clearError()}
                      className="text-xs underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                    >
                      Tentar novamente
                    </button>
                    <button
                      onClick={() => clearError()}
                      className="text-xs underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                    >
                      Fechar erro
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions - Show when chat is empty or after welcome */}
            {messages.length <= 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Perguntas frequentes:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-[#4cb7e0] px-3 py-1 rounded-full border border-blue-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4cb7e0] focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="bg-[#4cb7e0] hover:bg-[#3a9bc1] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
                aria-label="Enviar mensagem"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Vision Marine AI
            </p>
          </div>
        </>
      )}
    </div>
  )
}