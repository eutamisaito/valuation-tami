#!/usr/bin/env node

// Script de verificação de arquivos - Flow Method Platform
// Execute com: node check-files.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando arquivos do Flow Method Platform...\n');

const requiredFiles = [
  // Arquivos da raiz
  'package.json',
  'tsconfig.json',
  'tailwind.config.js',
  'postcss.config.js',
  'vercel.json',
  '.gitignore',
  'README.md',
  
  // Pasta public
  'public/index.html',
  'public/manifest.json',
  
  // Pasta src
  'src/index.tsx',
  'src/index.css',
  'src/App.tsx',
  
  // Componentes
  'src/components/ValuationAssessment.tsx',
  'src/components/JornadaCliente.tsx',
  'src/components/FlowPlatform.tsx',
  'src/components/FlowAnalyzer.tsx'
];

let allFilesPresent = true;
let missingFiles = [];
let presentFiles = [];

// Verificar cada arquivo
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
    presentFiles.push(file);
  } else {
    console.log(`❌ ${file} - FALTANDO!`);
    missingFiles.push(file);
    allFilesPresent = false;
  }
});

console.log('\n' + '='.repeat(50));
console.log('📊 RESUMO DA VERIFICAÇÃO');
console.log('='.repeat(50));

console.log(`\n✅ Arquivos encontrados: ${presentFiles.length}/${requiredFiles.length}`);

if (missingFiles.length > 0) {
  console.log(`\n❌ Arquivos faltando (${missingFiles.length}):`);
  missingFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
}

console.log('\n' + '='.repeat(50));

if (allFilesPresent) {
  console.log('\n🎉 SUCESSO! Todos os arquivos estão presentes!');
  console.log('✅ Você está pronto para fazer o deploy!');
  console.log('\nPróximos passos:');
  console.log('1. git add .');
  console.log('2. git commit -m "Initial commit"');
  console.log('3. git push origin main');
  console.log('4. Deploy no Vercel');
} else {
  console.log('\n⚠️  ATENÇÃO! Alguns arquivos estão faltando.');
  console.log('Por favor, verifique se copiou todos os arquivos para as pastas corretas.');
  console.log('\nEstrutura esperada:');
  console.log('flow-method-platform/');
  console.log('├── public/');
  console.log('│   ├── index.html');
  console.log('│   └── manifest.json');
  console.log('├── src/');
  console.log('│   ├── components/');
  console.log('│   │   ├── ValuationAssessment.tsx');
  console.log('│   │   ├── JornadaCliente.tsx');
  console.log('│   │   ├── FlowPlatform.tsx');
  console.log('│   │   └── FlowAnalyzer.tsx');
  console.log('│   ├── App.tsx');
  console.log('│   ├── index.tsx');
  console.log('│   └── index.css');
  console.log('└── (outros arquivos na raiz)');
}

console.log('\n');