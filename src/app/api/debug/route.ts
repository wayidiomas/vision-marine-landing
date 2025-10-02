import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
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
    environment: process.env.NODE_ENV,
  })
}
