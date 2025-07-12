'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, Target, Calendar, TrendingUp, CheckCircle, Clock, 
  Star, ArrowRight, Download, RefreshCw, ArrowLeft, Users 
} from 'lucide-react';

interface AssessmentResults {
  overallScore: number;
  maturityLevel: string;
  pillarScores: {
    identidade: number;
    influencia: number;
    legado: number;
  };
  specificScores: Record<string, number>;
}

interface FlowDevelopmentPlanGeneratorProps {
  results: AssessmentResults;
  onBack: () => void;
}

interface DevelopmentPlan {
  executiveSummary: {
    title: string;
    subtitle: string;
    keyInsights: string[];
    focusArea: string;
  };
  priorityActions: Array<{
    title: string;
    description: string;
    timeframe: string;
    priority: 'Alta' | 'Média' | 'Baixa';
  }>;
  weeklyPlan: Array<{
    week: number;
    theme: string;
    activities: string[];
  }>;
  monthlyMilestones: Array<{
    month: number;
    title: string;
    goals: string[];
    target: number;
  }>;
  resources: {
    recommended: Array<{
      type: string;
      title: string;
      description: string;
    }>;
    specific: string[];
  };
  successMetrics: Array<{
    metric: string;
    current: number;
    target: number;
    unit: string;
  }>;
}

const FlowDevelopmentPlanGenerator: React.FC<FlowDevelopmentPlanGeneratorProps> = ({ 
  results, 
  onBack 
}) => {
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState('generating');

  const maturityLevels = {
    "Emergente": {
      range: "0-40%",
      description: "Início da jornada de autodescoberta",
      focus: "Autoconhecimento e clareza de propósito"
    },
    "Desenvolvimento": {
      range: "41-65%",
      description: "Construindo base sólida",
      focus: "Desenvolver competências e expandir influência"
    },
    "Consolidação": {
      range: "66-85%",
      description: "Refinando e otimizando",
      focus: "Maximizar impacto e construir legado"
    },
    "Maestria": {
      range: "86-100%",
      description: "Plenitude e transcendência",
      focus: "Mentor sistêmico e multiplicador de valor"
    }
  };

  const generatePersonalizedPlan = (results: AssessmentResults): DevelopmentPlan => {
    const { pillarScores, specificScores, maturityLevel, overallScore } = results;
    
    // Identificar pilar mais fraco para foco prioritário
    const weakestPillar = Object.entries(pillarScores).reduce((a, b) => 
      pillarScores[a[0] as keyof typeof pillarScores] < pillarScores[b[0] as keyof typeof pillarScores] ? a : b
    )[0] as keyof typeof pillarScores;

    // Identificar top 3 áreas para desenvolvimento
    const developmentAreas = Object.entries(specificScores)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 3);

    const plan: DevelopmentPlan = {
      executiveSummary: generateExecutiveSummary(results, weakestPillar),
      priorityActions: generatePriorityActions(weakestPillar, developmentAreas),
      weeklyPlan: generateWeeklyPlan(weakestPillar, maturityLevel),
      monthlyMilestones: generateMonthlyMilestones(results),
      resources: generateResources(weakestPillar, developmentAreas),
      successMetrics: generateSuccessMetrics(results)
    };

    return plan;
  };

  const generateExecutiveSummary = (results: AssessmentResults, weakestPillar: string) => {
    const score = Math.round(results.overallScore * 100);
    const pillarNames = {
      identidade: "Identidade",
      influencia: "Influência", 
      legado: "Legado"
    };

    return {
      title: `Plano de Desenvolvimento Flow Method™`,
      subtitle: `Baseado em sua avaliação - Nível ${results.maturityLevel} (${score}%)`,
      keyInsights: [
        `Seu maior potencial de crescimento está no pilar ${pillarNames[weakestPillar as keyof typeof pillarNames]}`,
        `Você demonstra forte alinhamento em suas competências naturais`,
        `Oportunidade de expansão de impacto através de desenvolvimento sistêmico`
      ],
      focusArea: pillarNames[weakestPillar as keyof typeof pillarNames]
    };
  };

  const generatePriorityActions = (weakestPillar: string, developmentAreas: any[]) => {
    const actions = {
      identidade: [
        {
          title: "Clarificação de Propósito",
          description: "Desenvolver declaração de propósito clara e alinhada com valores pessoais",
          timeframe: "2 semanas",
          priority: "Alta" as const
        },
        {
          title: "Mapeamento de Talentos",
          description: "Identificar e catalogar competências únicas através de ferramentas de assessment",
          timeframe: "1 semana",
          priority: "Alta" as const
        },
        {
          title: "Desenvolvimento de Marca Pessoal",
          description: "Criar estratégia consistente de comunicação e presença",
          timeframe: "4 semanas",
          priority: "Média" as const
        }
      ],
      influencia: [
        {
          title: "Expansão de Rede Estratégica",
          description: "Conectar-se com 5 pessoas-chave por mês em sua área de atuação",
          timeframe: "Contínuo",
          priority: "Alta" as const
        },
        {
          title: "Programa de Mentoria",
          description: "Iniciar mentoria ativa de 2-3 pessoas para desenvolver liderança",
          timeframe: "1 mês",
          priority: "Alta" as const
        },
        {
          title: "Criação de Conteúdo Relevante",
          description: "Publicar insights e conhecimentos semanalmente",
          timeframe: "Contínuo",
          priority: "Média" as const
        }
      ],
      legado: [
        {
          title: "Definição de Impacto Mensurável",
          description: "Estabelecer métricas claras de contribuição e impacto social",
          timeframe: "2 semanas",
          priority: "Alta" as const
        },
        {
          title: "Projeto de Impacto Sistêmico",
          description: "Iniciar iniciativa que beneficie comunidade ou setor",
          timeframe: "3 meses",
          priority: "Alta" as const
        },
        {
          title: "Documentação de Conhecimento",
          description: "Criar recursos que perdurem além de sua presença",
          timeframe: "2 meses",
          priority: "Média" as const
        }
      ]
    };

    return actions[weakestPillar as keyof typeof actions] || actions.identidade;
  };

  const generateWeeklyPlan = (focusPillar: string, maturityLevel: string) => {
    const weeks = [
      {
        week: 1,
        theme: "Diagnóstico e Planejamento",
        activities: [
          "Revisão completa dos resultados da avaliação Flow Method™",
          "Definição de metas específicas para os próximos 90 dias",
          "Identificação de recursos e suporte necessários",
          "Criação de sistema de acompanhamento semanal"
        ]
      },
      {
        week: 2,
        theme: "Desenvolvimento Foundacional",
        activities: [
          "Implementação das primeiras ações prioritárias",
          "Estabelecimento de rotinas de desenvolvimento diário",
          "Criação de sistema de feedback e autoavaliação",
          "Início do journaling reflexivo sobre progresso"
        ]
      },
      {
        week: 3,
        theme: "Expansão e Conexões",
        activities: [
          "Ativação de rede de contatos estratégicos",
          "Busca por oportunidades de aplicação prática",
          "Início de atividades de mentoria ou ensino",
          "Participação em comunidades relevantes"
        ]
      },
      {
        week: 4,
        theme: "Consolidação e Ajustes",
        activities: [
          "Avaliação do progresso das primeiras 3 semanas",
          "Ajustes no plano baseado em aprendizados",
          "Preparação para próximo ciclo de desenvolvimento",
          "Celebração de conquistas e marcos alcançados"
        ]
      }
    ];

    return weeks;
  };

  const generateMonthlyMilestones = (results: AssessmentResults) => {
    return [
      {
        month: 1,
        title: "Fundação Sólida",
        goals: [
          "Propósito claramente definido e articulado",
          "Rede de desenvolvimento ativada",
          "Primeiras ações de impacto implementadas",
          "Sistema de acompanhamento funcionando"
        ],
        target: Math.min(Math.round((results.overallScore + 0.15) * 100), 100)
      },
      {
        month: 2,
        title: "Momentum e Expansão",
        goals: [
          "Influência mensuravelmente expandida",
          "Projeto de legado em andamento",
          "Mentoria ativa estabelecida",
          "Marca pessoal consistente"
        ],
        target: Math.min(Math.round((results.overallScore + 0.25) * 100), 100)
      },
      {
        month: 3,
        title: "Integração e Impacto",
        goals: [
          "Três pilares integrados e alinhados",
          "Impacto sistêmico documentado",
          "Sustentabilidade do desenvolvimento assegurada",
          "Plano de longo prazo estabelecido"
        ],
        target: Math.min(Math.round((results.overallScore + 0.35) * 100), 100)
      }
    ];
  };

  const generateResources = (focusPillar: string, developmentAreas: any[]) => {
    return {
      recommended: [
        {
          type: "Metodologia",
          title: "Flow Method™ - Guia Completo",
          description: "Metodologia completa para desenvolvimento de valor intangível"
        },
        {
          type: "Ferramenta",
          title: "Template de Planejamento Pessoal",
          description: "Planilha estruturada para acompanhamento de metas e progresso"
        },
        {
          type: "Comunidade",
          title: "Rede Flow Method™",
          description: "Comunidade de practitioners para suporte mútuo e networking"
        },
        {
          type: "Assessment",
          title: "Avaliações Trimestrais",
          description: "Reavaliações regulares para monitorar progresso"
        }
      ],
      specific: focusPillar === 'identidade' ? [
        "Assessment de Talentos StrengthsFinder 2.0",
        "Workshop de Definição de Propósito de Vida",
        "Mentoria em Desenvolvimento de Marca Pessoal",
        "Curso de Autoconhecimento e Inteligência Emocional"
      ] : focusPillar === 'influencia' ? [
        "Curso de Comunicação Estratégica e Persuasão",
        "Programa de Desenvolvimento de Liderança",
        "Workshop de Networking Efetivo e Autêntico",
        "Treinamento em Mentoria e Coaching"
      ] : [
        "Programa de Criação de Impacto Social",
        "Curso de Sustentabilidade e Responsabilidade Social",
        "Workshop de Planejamento de Legado Pessoal",
        "Formação em Liderança Sistêmica"
      ]
    };
  };

  const generateSuccessMetrics = (results: AssessmentResults) => {
    return [
      {
        metric: "Score Global Flow",
        current: Math.round(results.overallScore * 100),
        target: Math.min(Math.round((results.overallScore + 0.3) * 100), 100),
        unit: "%"
      },
      {
        metric: "Clareza de Propósito",
        current: Math.round((results.specificScores.proposito_definicao || 0.5) * 100),
        target: 90,
        unit: "%"
      },
      {
        metric: "Rede de Influência",
        current: Math.round((results.specificScores.rede_qualidade || 0.5) * 100),
        target: 85,
        unit: "%"
      },
      {
        metric: "Impacto Mensurável",
        current: Math.round((results.specificScores.impacto_mensuracao || 0.5) * 100),
        target: 80,
        unit: "%"
      }
    ];
  };

  useEffect(() => {
    setIsGenerating(true);
    
    // Simular processamento
    setTimeout(() => {
      const plan = generatePersonalizedPlan(results);
      setDevelopmentPlan(plan);
      setIsGenerating(false);
      setCurrentStep('plan');
    }, 3000);
  }, [results]);

  const handleDownloadPlan = () => {
    // Implementar download de PDF
    console.log('Baixando plano...', developmentPlan);
    // Aqui você pode integrar com jsPDF ou outra biblioteca
  };

  const handleScheduleSession = () => {
    window.open('https://calendly.com/flow-method', '_blank');
  };

  if (isGenerating || !developmentPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <RefreshCw className="w-16 h-16 text-purple-600 mx-auto animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Gerando Seu Plano Personalizado
          </h2>
          <p className="text-gray-600 mb-8">
            Analisando seus resultados e criando recomendações específicas para 
            acelerar seu desenvolvimento nos três pilares do Flow Method™.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-gray-700">Analisando pontos fortes e oportunidades</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-gray-700">Criando plano de ação personalizado</span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="w-5 h-5 text-purple-600 mr-3 animate-spin" />
              <span className="text-gray-700">Selecionando recursos recomendados</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-purple-900 mb-2">
                  {developmentPlan.executiveSummary.title}
                </h1>
                <p className="text-gray-600">{developmentPlan.executiveSummary.subtitle}</p>
              </div>
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="font-semibold text-purple-900 mb-3">Insights Principais:</h3>
              <ul className="space-y-2">
                {developmentPlan.executiveSummary.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-purple-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 text-purple-600 mr-3" />
              Ações Prioritárias
            </h2>
            <div className="grid gap-4">
              {developmentPlan.priorityActions.map((action, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      action.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                      action.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{action.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {action.timeframe}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 text-purple-600 mr-3" />
              Plano Semanal - Primeiro Mês
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {developmentPlan.weeklyPlan.map((week, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Semana {week.week}: {week.theme}
                  </h3>
                  <ul className="space-y-2">
                    {week.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Milestones */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
              Marcos de 90 Dias
            </h2>
            <div className="space-y-6">
              {developmentPlan.monthlyMilestones.map((milestone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Mês {milestone.month}: {milestone.title}
                    </h3>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Meta: {milestone.target}%
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {milestone.goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Métricas de Sucesso</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {developmentPlan.successMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{metric.metric}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Atual: {metric.current}{metric.unit}</span>
                    <span className="text-sm font-medium text-purple-600">Meta: {metric.target}{metric.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Recomendados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Gerais</h3>
                <div className="space-y-4">
                  {developmentPlan.resources.recommended.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FileText className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="font-medium text-gray-900">{resource.title}</span>
                        <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Específicos para {developmentPlan.executiveSummary.focusArea}
                </h3>
                <ul className="space-y-3">
                  {developmentPlan.resources.specific.map((resource, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Passos</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button 
                onClick={handleDownloadPlan}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Download className="w-5 h-5" />
                Baixar Plano Completo
              </button>
              <button 
                onClick={handleScheduleSession}
                className="flex items-center justify-center gap-3 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Agendar Sessão
              </button>
              <button 
                onClick={onBack}
                className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                Ver Resultados
              </button>
            </div>
          </div>

          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 Flow Method™ - Desenvolvido por Tami Saito</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowDevelopmentPlanGenerator;