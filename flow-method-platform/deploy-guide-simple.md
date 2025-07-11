# 🚀 Guia Rápido de Deploy - Flow Method Platform

## Em 10 minutos seu sistema estará no ar!

### 📋 O que você precisa:
- Conta no GitHub (grátis)
- Conta no Vercel (grátis)
- Todos os arquivos que forneci

### 🎯 Passo a Passo Super Simples:

#### 1️⃣ No GitHub:
1. Entre em [github.com](https://github.com)
2. Clique no **+** no canto superior direito
3. Clique em **New repository**
4. Nome: `flow-method-platform`
5. Deixe **Public** marcado
6. **NÃO** marque nenhuma opção embaixo
7. Clique em **Create repository**
8. **Deixe a página aberta**

#### 2️⃣ No seu computador:
1. Crie uma pasta chamada `flow-method-platform`
2. Copie TODOS os arquivos que forneci para dentro dela
3. Abra o terminal/prompt nessa pasta
4. Execute estes comandos (um por vez):

```bash
git init
git add .
git commit -m "Primeiro commit"
```

5. Volte na página do GitHub e copie a linha que começa com `git remote add...`
6. Cole no terminal e aperte Enter
7. Execute:
```bash
git branch -M main
git push -u origin main
```

#### 3️⃣ No Vercel:
1. Entre em [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **Add New → Project**
4. Encontre `flow-method-platform` e clique em **Import**
5. Deixe tudo como está e clique em **Deploy**
6. Aguarde 5 minutos ⏰

### ✅ PRONTO!

Seu site estará em: `https://flow-method-platform.vercel.app`

### 🎨 Links do seu sistema:
- **Home:** `/`
- **Assessment:** `/assessment`
- **Jornada:** `/jornada`
- **Platform:** `/platform`
- **Analyzer:** `/analyzer`

### ❓ Dúvidas Comuns:

**"Deu erro no git push"**
- Verifique se fez login no Git
- Confirme que copiou o comando certo do GitHub

**"O site não abre"**
- Aguarde mais 5 minutos
- Verifique o link correto no Vercel

**"Faltam páginas"**
- Confirme que copiou TODOS os arquivos
- Verifique se a estrutura de pastas está correta

### 📁 Estrutura Correta:
```
flow-method-platform/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ValuationAssessment.tsx
│   │   ├── JornadaCliente.tsx
│   │   ├── FlowPlatform.tsx
│   │   └── FlowAnalyzer.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── (todos os outros arquivos na raiz)
```

---

**É só isso! Em 10 minutos você terá o sistema completo online! 🎉**