# Vision Marine - UI/UX Guidelines

## Design System

### Color Palette
- **Primary Navy**: `#070e2c` (var(--vm-navy))
- **Primary Blue**: `#4cb7e0` (var(--vm-blue))
- **Secondary Blue**: `#3a9bc1` (usado em gradientes e hovers)
- **Overlay Blue**: `#0A1A4A` (usado em overlays com transparência)
- **Text Light**: `#ffffff` (var(--vm-text-light))

### Typography
- **Font Family**: Segoe UI (system font)
- **Fallback**: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif
- **Additional Fonts**: Geist Sans e Geist Mono (importados do Google Fonts)

### Button Styles

#### Gradient Hover Pattern
Todos os botões seguem o mesmo padrão de hover com gradiente:
```css
/* Estado normal - cor sólida */
bg-gradient-to-r from-[cor] to-[mesma-cor]

/* Estado hover - gradiente aparece */
hover:from-[cor-original] hover:to-[cor-escura]

/* Transição suave */
transition-all duration-300
```

#### Botões Implementados:
1. **Botão "Acessar plataforma"** (Hero section)
   - Normal: `from-[#4cb7e0] to-[#4cb7e0]`
   - Hover: `hover:from-[#4cb7e0] hover:to-[#3a9bc1]`

2. **Botão "Ver Todas as Turmas"** (Hero section card)
   - Normal: `from-[#070e2c] to-[#070e2c]`
   - Hover: `hover:from-[#070e2c] hover:to-[#0a1238]`

3. **Botão "Entrar"** (Header)
   - Normal: `from-[#4cb7e0] to-[#4cb7e0]`
   - Hover: `hover:from-[#4cb7e0] hover:to-[#3a9bc1]`

### Layout Structure

#### Header
- **Background**: `var(--vm-navy)` (#070e2c)
- **Padding**: `px-6 lg:px-[276px] py-4`
- **Logo**: 96x48px
- **Navigation**: Hidden em mobile, flex em lg+
- **Search Input**: Hidden em mobile, visible em md+
- **Language Selector**: Hidden em mobile, visible em lg+

#### Hero Section
- **Background**: Imagem com overlay
- **Overlay**: Gradiente linear `rgba(10, 26, 74, 0.8)` para `rgba(10, 26, 74, 0.6)` em 135deg
- **Padding**: `px-6 lg:px-[276px] py-20`
- **Layout**: Flex com duas colunas de 660px cada (hidden lg:block para o card)

### Icons

#### External Link Icon
SVG usado no botão "Acessar plataforma":
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M12 8.66667V12.6667C12 13.0203..." stroke="currentColor" strokeWidth="1.5"/>
  <path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5"/>
  <path d="M6.66669 9.33333L14 2" stroke="currentColor" strokeWidth="1.5"/>
</svg>
```

#### Assets Utilizados
- `/hero-background.png` - Background da hero section
- `/vision-marine-logo.png` - Logo principal (96x48px)
- `/users-icon.svg` - Ícone de usuários (stats)
- `/book-icon.svg` - Ícone de livros (stats)
- `/star-icon.svg` - Ícone de estrela (stats)
- `/chevron-down.svg` - Seta para baixo (dropdowns)
- `/search-icon.svg` - Ícone de busca
- `/language-icon.svg` - Ícone de idioma
- `/flag-br.svg` - Bandeira do Brasil (dropdown de idioma)
- `/flag-us.svg` - Bandeira dos EUA (dropdown de idioma)

### Responsive Breakpoints
- **Mobile**: Base (sem prefixo)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

### Data Dinâmica Identificada

#### Hero Section - Card "Próxima Turma"
**Fonte**: Tabela `cursos` ou `turmas`
**Campos necessários**:
- `nome_curso` (string)
- `data_inicio` (date, formatada como DD/MM)

**Query sugerida**:
```sql
SELECT nome_curso, data_inicio
FROM turmas
WHERE data_inicio > NOW()
ORDER BY data_inicio ASC
LIMIT 3
```

#### Stats Section
**Campos estáticos com potencial para dinamização**:
- "500+ Alunos Ativos" → COUNT(usuarios ativos)
- "25+ Treinamentos" → COUNT(cursos disponíveis)
- "95% Aprovação" → AVG(nota_final >= nota_minima)

### Padrões de Comportamento

#### Hover Effects
- Gradientes aparecem **ao entrar** no elemento, não ao sair
- Transição suave de 300ms
- Cores mantêm consistência com paleta principal

#### Spacing
- Container principal: `max-w-[1400px] mx-auto`
- Padding lateral: `px-6 lg:px-[276px]`
- Gaps entre elementos: `gap-8`, `gap-10` para seções maiores

### Estrutura de Arquivos
```
src/
├── app/
│   ├── page.tsx (Hero section)
│   ├── layout.tsx (RootLayout)
│   └── globals.css (Design tokens)
├── components/
│   ├── layout/
│   │   └── header.tsx
│   └── ui/ (shadcn/ui components)
public/
├── hero-background.png
├── vision-marine-logo.png
└── [outros assets]
```

### Tecnologias
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Fonts**: Google Fonts (Geist Sans/Mono) + System (Segoe UI)
- **Icons**: SVG inline + assets externos
- **Internacionalização**: Preparado para next-intl ou react-i18next

## Notas de Implementação

### Port Configuration
- **Frontend (Landing)**: Port 3000
- **Backend API**: Port 3001

### Integration Points
- Links para `/auth/login` (sistema de autenticação)
- Links para `/courses` (listagem de cursos)
- Integração futura com Bubble.io SaaS (autenticação)
- Backend Vision Marine API (dados dinâmicos)

## Internacionalização (i18n)

### Idiomas Suportados
- **PT-BR** (Português Brasil) - Padrão
- **EN-US** (English United States)

### Componente LanguageDropdown
**Localização**: `src/components/ui/language-dropdown.tsx`

**Variantes**:
- `header`: Para uso no header (texto branco)
- `hero`: Para uso na hero section (texto cinza)

**Assets de Bandeiras**:
- Brasil: `/flag-br.svg` (20x15px)
- EUA: `/flag-us.svg` (20x15px)

### Textos Identificados para Tradução

#### Hero Section
```typescript
// Títulos principais
"Navegue pelo" → "Navigate through"
"Conhecimento Naval" → "Naval Knowledge"

// Subtítulo
"Continue sua jornada de aprendizado com os melhores profissionais da área marítima."
→ "Continue your learning journey with the best maritime professionals."

// Botão CTA
"Acessar plataforma" → "Access platform"
```

#### Stats Section
```typescript
"Alunos Ativos" → "Active Students"
"Treinamentos" → "Training Courses"
"Aprovação" → "Approval Rate"
```

#### Card Section
```typescript
"Próxima Turma" → "Next Class"
"Ver Todas as Turmas" → "View All Classes"
```

### Implementação Recomendada
1. **next-intl**: Recomendado para Next.js App Router
2. **Estrutura de arquivos**:
   ```
   /locales/
   ├── pt-BR/
   │   └── common.json
   └── en-US/
       └── common.json
   ```

3. **Context/Provider**: Criar contexto global para idioma selecionado
4. **localStorage**: Salvar preferência do usuário
5. **Middleware**: Detectar idioma por URL ou cabeçalho Accept-Language

### TODOs de i18n no Código
Todos os textos hardcoded foram marcados com comentários `TODO: i18n` contendo as traduções sugeridas para facilitar implementação futura.