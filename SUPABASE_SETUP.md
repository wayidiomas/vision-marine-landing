# 🔧 Supabase Setup - Vision Marine Landing

## ❗ Problema Identificado

O site não carrega os cursos na home porque:
- ✅ Localhost funciona (credenciais corretas)
- ❌ Produção não funciona (provável problema de env vars no Render)

## 📋 Checklist de Verificação

### 1. Verificar se as tabelas existem no Supabase

Acesse o [Supabase Dashboard](https://supabase.com/dashboard/project/dkyqibicypnpeejhxuct/editor) e verifique se existem:

- ✅ Tabela `cursos`
- ✅ Tabela `turmas`
- ✅ View `vw_proximos_cursos`

Se NÃO existirem, rode a migration abaixo.

### 2. Aplicar Migration (se necessário)

No Supabase Dashboard → SQL Editor, execute o conteúdo de:
```
vision-marine-backend/migrations/0004_migration_cursos_turmas.sql
```

Esta migration cria:
- Tabelas `cursos` e `turmas`
- View `vw_proximos_cursos`
- Políticas RLS permitindo **leitura pública** (sem autenticação)
- Dados de exemplo (3 cursos)

### 3. Verificar Políticas RLS

No Supabase Dashboard → Authentication → Policies:

**Tabela `cursos`** deve ter:
- ✅ `public_read_cursos` - Permite leitura pública de cursos ativos

**Tabela `turmas`** deve ter:
- ✅ `public_read_turmas` - Permite leitura pública de turmas abertas/planejadas

Se não existirem, as queries vão falhar com erro 401/403.

### 4. Testar a View no Supabase

No SQL Editor, execute:

```sql
SELECT * FROM vw_proximos_cursos LIMIT 3;
```

**Resultado esperado:**
```
curso_id | curso_nome          | data_formatada | ...
---------|---------------------|----------------|----
uuid     | Navegação Costeira  | 17/10          | ...
uuid     | Segurança Marítima  | 22/10          | ...
```

Se retornar **vazio ou erro**, a migration precisa ser aplicada.

## 🚀 Configuração do Render

### Verificar Variáveis de Ambiente

No Render Dashboard → Environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dkyqibicypnpeejhxuct.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRreXFpYmljeXBucGVlamh4dWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNjk4NzAsImV4cCI6MjA3Mzg0NTg3MH0.YqSjECRqLNxW5QjFlDe8GNWnIglBLYVK_65Uy7-5o0Y
```

**⚠️ IMPORTANTE:**
- As variáveis devem começar com `NEXT_PUBLIC_` para serem expostas no client-side
- Valores devem ser **EXATAMENTE** os mesmos do `.env` local
- Após alterar, é necessário **redeploy manual** ou **Clear build cache**

### Como Verificar se as Env Vars estão Funcionando

Acesse a URL do seu site + `/api/debug` (vamos criar):

Crie o arquivo `src/app/api/debug/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    supabase_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    has_supabase_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}
```

Acesse: `https://seu-site.onrender.com/api/debug`

**Resultado esperado:**
```json
{
  "supabase_url": "https://dkyqibicypnpeejhxuct.supabase.co",
  "supabase_key_length": 217,
  "has_supabase_url": true,
  "has_supabase_key": true
}
```

Se `supabase_url` mostrar `"https://placeholder.supabase.co"`, as env vars **NÃO estão configuradas**.

## 🐛 Debugging Adicional

### Verificar logs do browser

1. Abra o site em produção
2. Abra DevTools (F12)
3. Vá para Console
4. Procure por erros:
   ```
   Error fetching courses: ...
   ```

### Erros Comuns

**Erro: "Failed to fetch"**
- Problema de CORS ou rede
- Verificar se URL do Supabase está correta

**Erro: "JWT expired" ou "Invalid JWT"**
- Anon key incorreta ou expirada
- Gerar nova chave no Supabase Dashboard

**Erro: "permission denied" ou "new row violates row-level security"**
- Políticas RLS bloqueando acesso
- Verificar se `public_read_*` policies existem

**Erro: "relation 'vw_proximos_cursos' does not exist"**
- View não foi criada
- Aplicar migration 0004

## 📝 Passos de Resolução Rápida

1. ✅ **Verificar env vars no Render** (devem ser iguais ao `.env` local)
2. ✅ **Aplicar migration se necessário** (0004_migration_cursos_turmas.sql)
3. ✅ **Verificar políticas RLS** (permitir leitura pública)
4. ✅ **Criar endpoint /api/debug** para verificar env vars
5. ✅ **Fazer redeploy** após qualquer mudança
6. ✅ **Verificar browser console** para erros específicos

## 🔗 Links Úteis

- [Supabase Dashboard](https://supabase.com/dashboard/project/dkyqibicypnpeejhxuct)
- [Render Dashboard](https://dashboard.render.com)
- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
