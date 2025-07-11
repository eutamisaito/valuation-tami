// SCRIPT DE TESTE DE ACESSIBILIDADE
// Flow Intangible Valuation™ - powered by Tami Saito
// 
// COMO USAR:
// 1. Abra o site no navegador
// 2. Pressione F12 para abrir o console
// 3. Cole este script completo no console
// 4. Pressione Enter para executar

console.log("🔍 INICIANDO TESTE DE ACESSIBILIDADE - FLOW METHOD™");
console.log("================================================");

function testAccessibility() {
    let score = 0;
    let total = 0;
    const issues = [];
    const successes = [];
    
    // 1. TESTE DE LABELS E FORMULÁRIOS
    console.log("\n📝 1. TESTE DE LABELS E FORMULÁRIOS");
    console.log("-----------------------------------");
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((input, index) => {
        total++;
        const id = input.id;
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = input.getAttribute('aria-label');
        const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
        
        if (hasLabel || hasAriaLabel || hasAriaLabelledBy) {
            score++;
            successes.push(`✅ Input #${index + 1}: ${id || 'sem ID'} - tem label`);
        } else {
            issues.push(`❌ Input #${index + 1}: ${id || 'sem ID'} - SEM LABEL`);
        }
    });
    
    // 2. TESTE DE BOTÕES
    console.log("\n🔘 2. TESTE DE BOTÕES");
    console.log("---------------------");
    
    const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
    buttons.forEach((button, index) => {
        total++;
        const hasText = button.textContent.trim();
        const hasAriaLabel = button.getAttribute('aria-label');
        const hasTitle = button.getAttribute('title');
        
        if (hasText || hasAriaLabel || hasTitle) {
            score++;
            successes.push(`✅ Botão #${index + 1}: "${hasText || hasAriaLabel || hasTitle}"`);
        } else {
            issues.push(`❌ Botão #${index + 1}: SEM TEXTO OU ARIA-LABEL`);
        }
    });
    
    // 3. TESTE DE ÍCONES
    console.log("\n🎨 3. TESTE DE ÍCONES");
    console.log("---------------------");
    
    const icons = document.querySelectorAll('i[class*="fa"], svg, img[src*="icon"]');
    icons.forEach((icon, index) => {
        total++;
        const hasAriaHidden = icon.getAttribute('aria-hidden') === 'true';
        const hasAlt = icon.getAttribute('alt');
        const hasAriaLabel = icon.getAttribute('aria-label');
        const hasText = icon.textContent.trim();
        const isDecorative = !hasText && !hasAlt && !hasAriaLabel;
        
        if (isDecorative && hasAriaHidden) {
            score++;
            successes.push(`✅ Ícone decorativo #${index + 1}: tem aria-hidden`);
        } else if (!isDecorative && (hasAlt || hasAriaLabel || hasText)) {
            score++;
            successes.push(`✅ Ícone informativo #${index + 1}: tem descrição`);
        } else if (isDecorative && !hasAriaHidden) {
            issues.push(`⚠️ Ícone decorativo #${index + 1}: deveria ter aria-hidden="true"`);
        } else {
            issues.push(`❌ Ícone #${index + 1}: problema de acessibilidade`);
        }
    });
    
    // 4. TESTE DE ESTRUTURA DE HEADINGS
    console.log("\n📖 4. TESTE DE ESTRUTURA DE HEADINGS");
    console.log("------------------------------------");
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    let headingScore = 0;
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent.substring(0, 50) + (heading.textContent.length > 50 ? '...' : '');
        
        if (level <= lastLevel + 1) {
            headingScore++;
            successes.push(`✅ ${heading.tagName}: "${text}"`);
        } else {
            issues.push(`⚠️ ${heading.tagName}: pode estar fora de ordem hierárquica`);
        }
        lastLevel = level;
    });
    
    score += headingScore;
    total += headings.length;
    
    // 5. TESTE DE NAVEGAÇÃO POR TECLADO
    console.log("\n⌨️ 5. TESTE DE NAVEGAÇÃO POR TECLADO");
    console.log("-----------------------------------");
    
    const focusableElements = document.querySelectorAll(
        'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    total++;
    if (focusableElements.length > 0) {
        score++;
        successes.push(`✅ ${focusableElements.length} elementos focusáveis encontrados`);
    } else {
        issues.push(`❌ Nenhum elemento focusável encontrado`);
    }
    
    // 6. TESTE DE ROLES E ARIA
    console.log("\n🎭 6. TESTE DE ROLES E ARIA");
    console.log("---------------------------");
    
    const roleElements = document.querySelectorAll('[role]');
    const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
    
    total += 2;
    if (roleElements.length > 0) {
        score++;
        successes.push(`✅ ${roleElements.length} elementos com role definido`);
    }
    
    if (ariaElements.length > 0) {
        score++;
        successes.push(`✅ ${ariaElements.length} elementos com atributos ARIA`);
    }
    
    // 7. CALCULAR RESULTADO FINAL
    const percentage = Math.round((score / total) * 100);
    
    console.log("\n" + "=".repeat(50));
    console.log("📊 RELATÓRIO FINAL DE ACESSIBILIDADE");
    console.log("=".repeat(50));
    
    console.log(`\n🎯 SCORE: ${score}/${total} pontos (${percentage}%)`);
    
    // Classificação
    let classification, emoji, recommendation;
    if (percentage >= 90) {
        classification = "EXCELENTE";
        emoji = "🏆";
        recommendation = "Sistema altamente acessível! Parabéns!";
    } else if (percentage >= 80) {
        classification = "MUITO BOM";
        emoji = "🥇";
        recommendation = "Ótimo nível de acessibilidade. Pequenos ajustes podem torná-lo perfeito.";
    } else if (percentage >= 70) {
        classification = "BOM";
        emoji = "✅";
        recommendation = "Bom nível de acessibilidade. Alguns pontos de melhoria identificados.";
    } else if (percentage >= 60) {
        classification = "REGULAR";
        emoji = "⚠️";
        recommendation = "Acessibilidade adequada, mas com espaço para melhorias importantes.";
    } else {
        classification = "PRECISA MELHORAR";
        emoji = "❌";
        recommendation = "Muitas melhorias necessárias para atingir padrões de acessibilidade.";
    }
    
    console.log(`\n${emoji} CLASSIFICAÇÃO: ${classification}`);
    console.log(`💡 RECOMENDAÇÃO: ${recommendation}`);
    
    // Mostrar sucessos
    if (successes.length > 0) {
        console.log(`\n✅ PONTOS POSITIVOS (${successes.length}):`);
        successes.slice(0, 10).forEach(success => console.log(success));
        if (successes.length > 10) {
            console.log(`... e mais ${successes.length - 10} sucessos!`);
        }
    }
    
    // Mostrar problemas
    if (issues.length > 0) {
        console.log(`\n❌ PONTOS DE MELHORIA (${issues.length}):`);
        issues.forEach(issue => console.log(issue));
    }
    
    return { score, total, percentage, classification, issues, successes };
}

// FUNÇÃO DE TESTE ESPECÍFICO DO FLOW METHOD
function testFlowMethodSpecific() {
    console.log("\n🔮 TESTE ESPECÍFICO - FLOW METHOD™");
    console.log("==================================");
    
    // Testar se o sistema está funcionando
    const validation = typeof validateQuestionData === 'function' ? validateQuestionData() : null;
    
    if (validation && validation.isValid) {
        console.log("✅ Sistema Flow Method validado e funcionando");
        console.log("📊 Pilares:", validation.pillarWeights);
    } else {
        console.log("❌ Sistema Flow Method não validado ou não carregado");
    }
    
    // Testar funcionalidades específicas
    const questionnaireElement = document.getElementById('questionnaire-page');
    const resultsElement = document.getElementById('results-page');
    const chartElement = document.getElementById('resultsChart');
    
    console.log(`📝 Questionário: ${questionnaireElement ? '✅' : '❌'}`);
    console.log(`📊 Página de resultados: ${resultsElement ? '✅' : '❌'}`);
    console.log(`📈 Gráfico de resultados: ${chartElement ? '✅' : '❌'}`);
    
    // Testar questões
    if (typeof questionData !== 'undefined') {
        const totalQuestions = Object.values(questionData).flat().length;
        console.log(`❓ Total de questões: ${totalQuestions}`);
        
        Object.keys(questionData).forEach(pillar => {
            console.log(`   ${pillar}: ${questionData[pillar].length} questões`);
        });
    }
}

// FUNÇÃO DE TESTE DE NAVEGAÇÃO POR TECLADO
function testKeyboardNavigation() {
    console.log("\n⌨️ GUIA DE TESTE DE NAVEGAÇÃO POR TECLADO");
    console.log("=========================================");
    
    console.log("Para testar manualmente:");
    console.log("1. 🔄 Pressione TAB para navegar pelos elementos");
    console.log("2. ↩️ Pressione ENTER/SPACE nos botões");
    console.log("3. ↑↓ Use setas nos radio buttons (quando em foco)");
    console.log("4. 👀 Verifique se o foco é sempre visível");
    console.log("5. 🚫 Certifique-se de que nenhum elemento fica 'preso'");
    
    const focusableElements = document.querySelectorAll(
        'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    console.log(`\n📋 ELEMENTOS FOCUSÁVEIS ENCONTRADOS (${focusableElements.length}):`);
    focusableElements.forEach((element, index) => {
        const tag = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : '';
        const text = element.textContent.trim().substring(0, 30);
        const type = element.type ? `[${element.type}]` : '';
        
        console.log(`${index + 1}. ${tag}${id}${type} "${text}${text.length > 30 ? '...' : ''}"`);
    });
}

// EXECUTAR TODOS OS TESTES
console.log("🚀 Executando bateria completa de testes...\n");

const mainResult = testAccessibility();
testFlowMethodSpecific();
testKeyboardNavigation();

console.log("\n" + "=".repeat(50));
console.log("🏁 TESTE COMPLETO FINALIZADO");
console.log("=".repeat(50));

console.log(`\n📈 RESULTADO GERAL: ${mainResult.percentage}% (${mainResult.classification})`);

console.log("\n🛠️ PRÓXIMOS PASSOS:");
if (mainResult.percentage >= 90) {
    console.log("✅ Sistema pronto para produção!");
    console.log("✅ Realize testes com usuários reais");
    console.log("✅ Considere testes com leitores de tela");
} else {
    console.log("🔧 Corrija os pontos de melhoria identificados");
    console.log("🔧 Execute este teste novamente após correções");
    console.log("🔧 Considere testes adicionais com ferramentas especializadas");
}

console.log("\n📚 RECURSOS ADICIONAIS:");
console.log("• WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/");
console.log("• Teste com NVDA: https://www.nvaccess.org/");
console.log("• Validador HTML: https://validator.w3.org/");

console.log("\n🎯 Flow Intangible Valuation™ - powered by Tami Saito");
console.log("Teste de acessibilidade finalizado! ✨");

// Retornar resultado para uso programático
return mainResult;