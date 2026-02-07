# Landing Page Builder - MVP

Sistema de criação de landing pages com editor visual usando Puck.

## 🚀 Funcionalidades

- ✅ Editor visual drag-and-drop com Puck
- ✅ Componentes pré-construídos customizáveis:
  - Hero (cabeçalho)
  - Features (funcionalidades)
  - Pricing (preços)
  - CTA (call-to-action)
  - Testimonials (depoimentos)
  - Footer (rodapé)
- ✅ Painel admin para gerenciar landing pages
- ✅ Suporte a subdomínios (cada LP em seu próprio subdomínio)
- ✅ Persistência em banco SQLite com Prisma
- ✅ Next.js 16 + React 19 + Tailwind CSS v4

## 🛠️ Setup

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar banco de dados:**
```bash
npx prisma generate
npx prisma db push
```

3. **Rodar em desenvolvimento:**
```bash
npm run dev
```

4. **Acessar:**
- Home: http://localhost:3000
- Admin: http://localhost:3000/admin

## 📁 Estrutura do Projeto

```
protocolos-lp-builder/
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx              # Listagem de LPs
│   │       └── editor/[slug]/
│   │           └── page.tsx          # Editor Puck
│   ├── (landing)/
│   │   └── [[...slug]]/
│   │       └── page.tsx              # Renderer público
│   ├── api/
│   │   └── landing-pages/
│   │       ├── route.ts              # GET/POST
│   │       └── [slug]/
│   │           └── route.ts          # GET/PUT/DELETE
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # Home
├── components/
│   └── landing/                      # Componentes LP
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Pricing.tsx
│       ├── CTA.tsx
│       ├── Testimonials.tsx
│       └── Footer.tsx
├── lib/
│   ├── db.ts                         # Prisma client
│   └── puck-config.ts                # Configuração Puck
├── prisma/
│   └── schema.prisma                 # Schema do banco
├── types/
│   └── landing-page.ts               # TypeScript types
├── middleware.ts                     # Roteamento de subdomínios
└── .env
```

## 🎨 Como Usar

### 1. Criar Nova Landing Page

1. Acesse `/admin`
2. Clique em "Nova Landing Page"
3. Configure título, slug (subdomínio) e URL de checkout
4. Use o editor visual para arrastar componentes
5. Customize as propriedades de cada componente
6. Publique

### 2. Editar Landing Page Existente

1. Acesse `/admin`
2. Clique em "Editar" na LP desejada
3. Faça as modificações no editor
4. Publique as alterações

### 3. Visualizar Landing Page

- Desenvolvimento: `http://localhost:3000/[slug]`
- Produção com subdomínio: `http://[slug].seudominio.com`

## 🔧 Configuração de Subdomínios

### Desenvolvimento Local

Para testar subdomínios localmente, edite seu `/etc/hosts`:

```
127.0.0.1 produto.localhost
127.0.0.1 servico.localhost
```

Acesse: `http://produto.localhost:3000`

### Produção

Configure DNS wildcard apontando para seu servidor:
- `*.seudominio.com` → IP do servidor
- A equipe de infra deve configurar o DNS

Atualize `.env`:
```
NEXT_PUBLIC_DOMAIN="seudominio.com"
```

## 📊 Schema do Banco

```prisma
model LandingPage {
  id          String   @id @default(uuid())
  slug        String   @unique        // Subdomínio
  title       String                  // Título da LP
  data        String                  // JSON do Puck
  checkoutUrl String?                 // URL externa de checkout
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🎯 Próximos Passos (Pós-MVP)

- [ ] Autenticação admin com senha
- [ ] Upload de imagens
- [ ] Preview antes de publicar
- [ ] Analytics básico
- [ ] SEO customizável por LP
- [ ] Temas/templates predefinidos
- [ ] Duplicar landing pages
- [ ] Versionamento de alterações

## 🐛 Troubleshooting

### Erro: "Module not found @prisma/client"
```bash
npx prisma generate
```

### Erro: "Database not found"
```bash
npx prisma db push
```

### Puck não carrega no editor
Verifique se o CSS do Puck está importado em `editor/[slug]/page.tsx`:
```tsx
import "@measured/puck/puck.css";
```

## 📝 Variáveis de Ambiente

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_DOMAIN="localhost:3000"
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
