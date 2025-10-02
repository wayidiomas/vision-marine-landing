# 🚀 Deploy Guide - Vision Marine Landing (Render)

Este guia explica como fazer deploy da aplicação Vision Marine Landing no Render usando Docker.

## 📋 Pré-requisitos

- Conta no [Render](https://render.com)
- Repositório GitHub com o código
- Conta Supabase (para backend)
- Chave OpenAI API (para chat)

## 🐳 Deploy com Docker (Recomendado)

### 1. Criar novo Web Service

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub `wayidiomas/vision-marine-landing`
4. Configure:
   - **Name**: `vision-marine-landing`
   - **Branch**: `main`
   - **Root Directory**: (deixe em branco)
   - **Environment**: `Docker`
   - **Instance Type**: `Free` (para teste) ou `Starter` (produção)

⚠️ **IMPORTANTE**: Selecione "Docker" como ambiente! Render detectará automaticamente o Dockerfile.

### 2. Configurar Variáveis de Ambiente

⚠️ **CRÍTICO**: As variáveis `NEXT_PUBLIC_*` são embutidas no bundle durante o build! O Dockerfile usa `ARG` para recebê-las do Render.

No painel do Render, vá em "Environment" e adicione:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dkyqibicypnpeejhxuct.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRreXFpYmljeXBucGVlamh4dWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNjk4NzAsImV4cCI6MjA3Mzg0NTg3MH0.YqSjECRqLNxW5QjFlDe8GNWnIglBLYVK_65Uy7-5o0Y

# Vision Marine API Configuration
# Quando o backend estiver no Render, use a URL do backend
# Exemplo: https://vision-marine-backend.onrender.com
NEXT_PUBLIC_API_URL=http://localhost:3001

# OpenAI API Key (para funcionalidade de chat)
# ⚠️ IMPORTANTE: Use uma nova chave, não comite a chave real no git!
OPENAI_API_KEY=sk-proj-SUA_NOVA_CHAVE_AQUI

# Vision Marine API Key (opcional, para autenticação backend)
NEXT_PUBLIC_VISION_MARINE_API_KEY=vm_api_production_key_here
```

**Como funciona:**
1. Render passa as env vars como `ARG` para o Docker build
2. Dockerfile converte `ARG` → `ENV` antes do `npm run build`
3. Next.js embute os valores `NEXT_PUBLIC_*` no bundle JavaScript
4. No runtime, o bundle já tem os valores corretos

**Para verificar se funcionou:**
Após o deploy, acesse: `https://seu-site.onrender.com/api/debug`

Deve retornar:
```json
{
  "supabase_url": "https://dkyqibicypnpeejhxuct.supabase.co",
  "has_supabase_url": true,
  "has_supabase_key": true,
  "is_placeholder": false  ← DEVE SER FALSE!
}
```

Se `is_placeholder: true`, as env vars não foram passadas corretamente no build.

### 3. Deploy

1. Clique em "Create Web Service"
2. Aguarde o build e deploy (5-10 minutos na primeira vez)
3. Acesse a URL fornecida pelo Render: `https://vision-marine-landing.onrender.com`

## 🧪 Testar Localmente com Docker

Antes de fazer deploy, teste localmente:

```bash
# Build da imagem
docker build -t vision-marine-landing .

# Rodar container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://dkyqibicypnpeejhxuct.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui \
  -e OPENAI_API_KEY=sua_chave_aqui \
  vision-marine-landing

# Acesse: http://localhost:3000
```

## ⚙️ Configurações Importantes

### Next.js

- ✅ **Standalone output habilitado** (`output: 'standalone'` em `next.config.js`)
- ✅ **Turbopack apenas em dev** (`--turbopack` removido do build)
- ✅ **Build otimizado para produção** (sem flags experimentais no build)

### Docker

- ✅ **Multi-stage build** (reduz tamanho da imagem)
- ✅ **Non-root user** (segurança)
- ✅ **Alpine Linux** (imagem leve)
- ✅ **Build otimizado** (3 estágios: deps, builder, runner)

## 🔄 Atualizações Automáticas

O Render faz deploy automático quando você faz push para a branch `main`:

```bash
git add .
git commit -m "Update: descrição da mudança"
git push origin main
```

## 📦 Assets do Figma

✅ **Todos os 44 assets do Figma já foram baixados** e estão em `/public/assets/figma/`

Estrutura:
```
public/assets/figma/
├── about/
├── business/
├── companies/
├── cta/
├── facilities/
├── newsletter/
├── statistics/
├── testimonials/
└── why-choose/
```

## 🔐 Segurança

### ⚠️ IMPORTANTE: Proteger Chaves Sensíveis

1. **Nunca comite `.env` no Git** ✅ (já configurado no .gitignore)
2. **Use variáveis de ambiente no Render** para dados sensíveis
3. **Rotacione a chave OpenAI** se foi exposta
4. **Use HTTPS** sempre (Render fornece automaticamente)

### Rotacionar OpenAI API Key

Se a chave foi exposta no Git:

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Revogue a chave antiga
3. Crie nova chave
4. Atualize no Render Environment Variables

## 🐛 Troubleshooting

### Build Falha

```bash
# Limpar cache e reconstruir
rm -rf .next node_modules
npm install
npm run build
```

### Assets não carregam

- Verifique se os arquivos existem em `/public/assets/figma/`
- URLs devem começar com `/assets/figma/...` (não `http://localhost:3845`)

### API não conecta

- Verifique se `NEXT_PUBLIC_API_URL` aponta para o backend correto
- Em desenvolvimento: `http://localhost:3001`
- Em produção: `https://vision-marine-backend.onrender.com`

### Erro 404 nas páginas

- Certifique-se que o comando start é `npm start`
- Verifique se o build foi concluído com sucesso

## 📊 Monitoramento

No Render Dashboard você pode:
- Ver logs em tempo real
- Monitorar uso de recursos
- Configurar alertas
- Ver métricas de performance

## 🔗 Links Úteis

- [Render Docs](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Repository](https://github.com/wayidiomas/vision-marine-landing)

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Nova chave OpenAI gerada
- [ ] Backend API URL atualizada
- [ ] Assets do Figma verificados
- [ ] Build local testado (`npm run build`)
- [ ] Push para GitHub
- [ ] Deploy no Render verificado
- [ ] Testes de funcionalidade na URL de produção

---

🎉 **Projeto pronto para deploy!** Qualquer dúvida, consulte a documentação do Render ou os logs de build.
