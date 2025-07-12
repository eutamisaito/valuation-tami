# Flow Method™ - Plataforma de Avaliação de Valor Intangível

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 🚀 Sobre o Projeto

Flow Method™ é uma plataforma inovadora para avaliação e desenvolvimento de valor intangível, baseada nos três pilares fundamentais:

- **🎯 Identidade**: Clareza de propósito, valores e talentos únicos
- **📈 Influência**: Capacidade de impactar e inspirar outros
- **👥 Legado**: Impacto duradouro e sustentável

Desenvolvido por **Tami Saito**, esta plataforma oferece:
- ✅ Avaliação científica de 45+ métricas
- ✅ Plano de desenvolvimento personalizado
- ✅ Recursos e recomendações específicas
- ✅ Acompanhamento de progresso

## 🎯 Funcionalidades

### 📊 Assessment Completo
- **15 perguntas por pilar** (45 total)
- **Escala de 1-10** para precisão
- **Algoritmo ponderado** para cálculo de scores
- **4 níveis de maturidade**: Emergente, Desenvolvimento, Consolidação, Maestria

### 📋 Gerador de Plano Personalizado
- **Análise automática** dos pontos fortes e oportunidades
- **Ações prioritárias** com timelines específicos
- **Plano semanal** para os primeiros 30 dias
- **Marcos mensais** para 90 dias
- **Métricas de sucesso** personalizadas
- **Recursos recomendados** por área de foco

### 🎨 Interface Moderna
- **Design responsivo** para todos os dispositivos
- **Animações suaves** e transições profissionais
- **Gradientes purple/pink** da marca Flow Method
- **Experiência de usuário otimizada**

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF**: jsPDF + html2canvas
- **Deploy**: Vercel

## 🚀 Instalação e Deploy

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/flow-method-platform.git
cd flow-method-platform
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Execute Localmente
```bash
npm run dev
# ou
yarn dev
```

Acesse: http://localhost:3000

### 4. Deploy no Vercel

#### Método 1: Direto do GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu GitHub
4. Selecione o repositório `flow-method-platform`
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Clique em "Deploy"

#### Método 2: Via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para production
vercel --prod
```

### 5. Configurações de Produção

#### Variáveis de Ambiente (opcional)
Crie um arquivo `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

#### Domínio Personalizado
No painel do Vercel:
1. Vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

## 📁 Estrutura do Projeto

```
flow-method-platform/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   └── components/
│       ├── FlowAssessment.tsx
│       └── FlowDevelopmentPlanGenerator.tsx
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customização

### Cores da Marca
As cores estão definidas no `tailwind.config.js`:
```javascript
colors: {
  purple: { /* tons de roxo */ },
  pink: { /* tons de rosa */ }
}
```

### Analytics
Adicione Google Analytics no `layout.tsx`:
```javascript
// Substitua GTM-XXXXXXX pelo seu ID
'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX'
```

### Agendamento
Configure o link do Calendly em:
- `app/page.tsx` (botão Agendar Sessão)
- `FlowDevelopmentPlanGenerator.tsx` (handleScheduleSession)

## 📊 Algoritmo de Scoring

### Cálculo de Scores
1. **Respostas normalizadas**: escala 1-10 → 0-1
2. **Peso por pergunta**: baseado na importância
3. **Score por pilar**: média ponderada das perguntas
4. **Score geral**: média dos três pilares

### Níveis de Maturidade
- **Emergente** (0-40%): Início da jornada
- **Desenvolvimento** (41-65%): Construindo base
- **Consolidação** (66-85%): Refinando e otimizando
- **Maestria** (86-100%): Plenitude e transcendência

## 🔧 Personalizações Avançadas

### Adicionar Nova Pergunta
1. Edite o array `questions` em `FlowAssessment.tsx`
2. Defina: `id`, `category`, `weight`, `question`, `pillar`
3. Ajuste o peso total para 100% por pilar

### Modificar Plano de Desenvolvimento
Edite as funções em `FlowDevelopmentPlanGenerator.tsx`:
- `generatePriorityActions()`
- `generateWeeklyPlan()`
- `generateResources()`

### Adicionar Novas Métricas
Modifique `generateSuccessMetrics()` para incluir:
- Novas métricas de acompanhamento
- Metas personalizadas por nível
- Benchmarks do setor

## 📈 Otimizações

### Performance
- ✅ **Images otimizadas** com Next.js Image
- ✅ **Lazy loading** de componentes
- ✅ **Bundle splitting** automático
- ✅ **Code splitting** por rota

### SEO
- ✅ **Meta tags** completos
- ✅ **Open Graph** configurado
- ✅ **Schema markup** para rich snippets
- ✅ **Sitemap** automático

### Acessibilidade
- ✅ **ARIA labels** em elementos interativos
- ✅ **Contraste** adequado (WCAG AA)
- ✅ **Navegação por teclado**
- ✅ **Screen reader** compatível

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👩‍💼 Sobre a Autora

**Tami Saito** é especialista em desenvolvimento de valor intangível e criadora da metodologia Flow Method™.

## 📞 Suporte

- **Email**: suporte@flowmethod.com
- **Website**: [flowmethod.com](https://flowmethod.com)
- **LinkedIn**: [Tami Saito](https://linkedin.com/in/tami-saito)

## 🎉 Status do Projeto

- ✅ **MVP**: Completo
- ✅ **Assessment**: Funcional
- ✅ **Plano Personalizado**: Implementado
- ✅ **Deploy**: Ready for Production
- 🔄 **Próximas features**: Dashboard de progresso, PDF export, integração CRM

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ por Tami Saito</strong></p>
  <p>Flow Method™ - Maximize seu valor intangível</p>
</div>