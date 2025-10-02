import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    // Client-side env vars (NEXT_PUBLIC_*)
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    supabase_key_preview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
      : 'NOT SET',
    supabase_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    api_url: process.env.NEXT_PUBLIC_API_URL || 'NOT SET',
    has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    has_supabase_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    has_api_url: !!process.env.NEXT_PUBLIC_API_URL,
    is_placeholder: process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co',

    // Server-side env vars (NO NEXT_PUBLIC_)
    has_openai_key: !!process.env.OPENAI_API_KEY,
    openai_key_length: process.env.OPENAI_API_KEY?.length || 0,
    openai_key_preview: process.env.OPENAI_API_KEY
      ? `${process.env.OPENAI_API_KEY.substring(0, 7)}...${process.env.OPENAI_API_KEY.slice(-4)}`
      : 'NOT SET',

    // Environment info
    environment: process.env.NODE_ENV,

    // Health check
    health: {
      supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co',
      openai: !!process.env.OPENAI_API_KEY,
      all_ok: !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
               !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
               !!process.env.OPENAI_API_KEY &&
               process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
    }
  })
}
