#!/bin/bash

# Flow Method Platform - Setup Automatizado
# Este script cria toda a estrutura e prepara o projeto para deploy

echo "🚀 Flow Method Platform - Setup Automatizado"
echo "==========================================="
echo ""

# Verificar se está no diretório correto
read -p "Deseja criar o projeto no diretório atual? (s/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]
then
    exit 1
fi

echo "📁 Criando estrutura de pastas..."

# Criar estrutura de diretórios
mkdir -p public
mkdir -p src/components

echo "✅ Estrutura de pastas criada!"

# Mensagem sobre os arquivos
echo ""
echo "📋 IMPORTANTE: Agora você precisa:"
echo ""
echo "1. Copiar TODOS os arquivos fornecidos para as pastas corretas:"
echo ""
echo "   📁 Raiz do projeto:"
echo "      - package.json"
echo "      - tsconfig.json"
echo "      - tailwind.config.js"
echo "      - postcss.config.js"
echo "      - vercel.json"
echo "      - .gitignore"
echo "      - README.md"
echo ""
echo "   📁 public/:"
echo "      - index.html"
echo "      - manifest.json"
echo ""
echo "   📁 src/:"
echo "      - index.tsx"
echo "      - index.css"
echo "      - App.tsx"
echo ""
echo "   📁 src/components/:"
echo "      - ValuationAssessment.tsx"
echo "      - JornadaCliente.tsx"
echo "      - FlowPlatform.tsx"
echo "      - FlowAnalyzer.tsx"
echo ""

# Aguardar confirmação
read -p "Após copiar todos os arquivos, pressione ENTER para continuar..."

# Verificar se os arquivos principais existem
echo ""
echo "🔍 Verificando arquivos..."

if [ -f "package.json" ] && [ -f "src/App.tsx" ] && [ -f "public/index.html" ]; then
    echo "✅ Arquivos principais encontrados!"
else
    echo "❌ Erro: Alguns arquivos estão faltando. Verifique se copiou todos."
    exit 1
fi

# Inicializar Git
echo ""
echo "🔧 Inicializando Git..."
git init

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos ao Git..."
git add .

# Fazer commit inicial
echo "💾 Criando commit inicial..."
git commit -m "Initial commit: Flow Method Platform completo"

echo ""
echo "✅ Setup local concluído!"
echo ""
echo "📤 Próximos passos:"
echo ""
echo "1. Crie um repositório no GitHub chamado 'flow-method-platform'"
echo ""
echo "2. Execute os comandos abaixo (substitua SEU-USUARIO):"
echo ""
echo "   git remote add origin https://github.com/SEU-USUARIO/flow-method-platform.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Acesse vercel.com e importe o repositório"
echo ""
echo "🎉 Pronto! Seu projeto estará online em poucos minutos!"
echo ""