'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface Course {
  curso_id: string
  curso_nome: string
  descricao: string
  nivel: string
  carga_horaria: number
  preco: string
  categoria: string
  instrutor: string
  turma_id: string
  turma_nome: string | null
  data_inicio: string
  data_fim: string
  horario_inicio: string | null
  horario_fim: string | null
  vagas_total: number
  vagas_ocupadas: number
  vagas_disponiveis: number
  status: string
  modalidade: string
  local: string | null
  data_formatada: string
  dias_para_inicio: number
}

export interface UseCoursesOptions {
  limit?: number
  categoria?: string
  nivel?: string
  autoFetch?: boolean
}

export interface UseCoursesReturn {
  courses: Course[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  searchCourses: (query: string) => Promise<Course[]>
  getByCategory: (category: string) => Promise<Course[]>
}

export function useCourses(options: UseCoursesOptions = {}): UseCoursesReturn {
  const { limit = 5, categoria, nivel, autoFetch = true } = options

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('vw_proximos_cursos')
        .select('*')
        .order('data_inicio', { ascending: true })
        .limit(limit)

      // Apply filters if provided
      if (categoria) {
        query = query.eq('categoria', categoria)
      }

      if (nivel) {
        query = query.eq('nivel', nivel)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        console.error('Error fetching courses:', fetchError)
        setError('Erro ao carregar cursos')
        return
      }

      setCourses(data || [])
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Erro inesperado ao carregar cursos')
    } finally {
      setLoading(false)
    }
  }

  const searchCourses = async (query: string): Promise<Course[]> => {
    try {
      setError(null)

      const { data, error: searchError } = await supabase
        .from('vw_proximos_cursos')
        .select('*')
        .or(`curso_nome.ilike.%${query}%,descricao.ilike.%${query}%,instrutor.ilike.%${query}%`)
        .order('data_inicio', { ascending: true })
        .limit(20)

      if (searchError) {
        console.error('Error searching courses:', searchError)
        setError('Erro ao buscar cursos')
        return []
      }

      return data || []
    } catch (err) {
      console.error('Unexpected error in search:', err)
      setError('Erro inesperado na busca')
      return []
    }
  }

  const getByCategory = async (category: string): Promise<Course[]> => {
    try {
      setError(null)

      const { data, error: categoryError } = await supabase
        .from('vw_proximos_cursos')
        .select('*')
        .eq('categoria', category)
        .order('data_inicio', { ascending: true })

      if (categoryError) {
        console.error('Error fetching courses by category:', categoryError)
        setError('Erro ao carregar cursos por categoria')
        return []
      }

      return data || []
    } catch (err) {
      console.error('Unexpected error in getByCategory:', err)
      setError('Erro inesperado ao filtrar por categoria')
      return []
    }
  }

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchCourses()
    }
  }, [limit, categoria, nivel, autoFetch])

  return {
    courses,
    loading,
    error,
    refresh: fetchCourses,
    searchCourses,
    getByCategory
  }
}

// Hook for getting course statistics
export function useCourseStats() {
  const [stats, setStats] = useState<{
    total_cursos: number
    total_turmas: number
    categorias: string[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get total courses
      const { count: totalCursos } = await supabase
        .from('cursos')
        .select('*', { count: 'exact', head: true })
        .eq('ativo', true)

      // Get total active classes
      const { count: totalTurmas } = await supabase
        .from('turmas')
        .select('*', { count: 'exact', head: true })
        .in('status', ['planejada', 'aberta', 'em_andamento'])

      // Get categories
      const { data: categoriesData } = await supabase
        .from('cursos')
        .select('categoria')
        .eq('ativo', true)
        .not('categoria', 'is', null)

      const uniqueCategories = [...new Set(
        categoriesData?.map(item => item.categoria).filter(Boolean) || []
      )]

      setStats({
        total_cursos: totalCursos || 0,
        total_turmas: totalTurmas || 0,
        categorias: uniqueCategories
      })
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Erro ao carregar estatísticas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refresh: fetchStats }
}