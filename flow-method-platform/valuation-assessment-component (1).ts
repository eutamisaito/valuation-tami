import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Home, Award, TrendingUp, Users, Target, Sparkles, Download, Calendar, FileText, ChevronLeft } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ValuationAssessmentProps {
  onComplete?: (data: any) => void;
}

interface QuestionData {
  question: string;
  subtext: string;
}

interface PillarData {
  name: string;
  icon: string;
  description: string;
  bgClass: string;
  textClass: string;
}

const ValuationAssessment: React.FC<ValuationAssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState('landing');
  const [currentPillar, setCurrentPillar] = useState('identidade');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionnaire, setQuestionnaire] = useState<any>({});
  const [results, setResults] = useState<any>(null);
  const [showDevelopmentPlan, setShowDevelopmentPlan] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  const questionData: Record<string, QuestionData[]> = {
    identidade: [
      {
        question: "Você já tem clareza sobre sua essência?",
        subtext: "Seus valores fundamentais, propósito de vida e aquilo que te torna único(a)"
      },
      {
        question: "Sua história pessoal está estruturada?",
        subtext: "Narrativa coerente conectando suas experiências, aprendizados e transformações"
      },
      {
        question: "Você desenvolveu sua voz autêntica?",
        subtext: "Estilo único de comunicação que reflete genuinamente quem você é"
      }
    ],
    influencia: [
      {
        question: "Você tem uma estratégia de visibilidade?",
        subtext: "Plano estruturado para ser visto(a) e reconhecido(a) em seu mercado"
      },
      {
        question: "Sua persuasão é autêntica e eficaz?",
        subtext: "Capacidade de influenciar decisões mantendo integridade e verdade"
      },
      {
        question: "Você constrói relacionamentos estratégicos?",
        subtext: "Rede de conexões significativas que amplificam seu impacto"
      }
    ],
    legado: [
      {
        question: "Você tem metodologias próprias documentadas?",
        subtext: "Frameworks, processos ou sistemas únicos que você desenvolveu"
      },
      {
        question: "Existe escalabilidade no seu trabalho?",
        subtext: "Capacidade de impactar mais pessoas sem depender só do seu tempo"
      },
      {
        question: "Você cultiva a próxima geração?",
        subtext: "Mentoria, ensino ou desenvolvimento de outros profissionais"
      }
    ]
  };

  const pillarData: Record<string, PillarData> = {
    identidade: {
      name: "Identidade",
      icon: "fa-fingerprint",
      description: "Descoberta e expressão da sua essência única",
      bgClass: "bg-purple-100",
      textClass: "text-purple-600"
    },
    influencia: {
      name: "Influência",
      icon: "fa-users",
      description: "Capacidade de impactar e transformar vidas",
      bgClass: "bg-blue-100",
      textClass: "text-blue-600"
    },
    legado: {
      name: "Legado",
      icon: "fa-monument",
      description: "Contribuição duradoura para o mundo",
      bgClass: "bg-green-100",
      textClass: "text-green-600"
    }
  };

  useEffect(() => {
    // Validate system on mount
    console.log('✅ Sistema Flow Intangible Valuation™ carregado com sucesso!');
  }, []);

  const calculateResults = () => {
    const pillarScores: any = {};
    const pillars = ['identidade', 'influencia', 'legado'];
    
    pillars.forEach(pillar => {
      const questions = questionData[pillar];
      let score = 0;
      questions.forEach((_, index) => {
        const answer = questionnaire[`${pillar}_q${index}`];
        if (answer) {
          score += parseInt(answer);
        }
      });
      pillarScores[pillar] = score / (questions.length * 4);
    });

    const overallScore = (pillarScores.identidade + pillarScores.influencia + pillarScores.legado) / 3;
    
    let maturityLevel = "Inicial";
    if (overallScore >= 0.8) maturityLevel = "Autoridade";
    else if (overallScore >= 0.6) maturityLevel = "Avançado";
    else if (overallScore >= 0.4) maturityLevel = "Intermediário";
    else if (overallScore >= 0.2) maturityLevel = "Desenvolvimento";

    const baseValue = 50000;
    const multiplier = 1 + (overallScore * 4);
    const marketValue = Math.round(baseValue * multiplier);

    const financialValuation = {
      total: marketValue,
      marcaPessoal: Math.round(marketValue * 0.4),
      conteudoCriacoes: Math.round(marketValue * 0.35),
      metodologias: Math.round(marketValue * 0.25),
      valorHora: Math.round(marketValue / 160)
    };

    const calculatedResults = {
      pillarScores,
      overallScore,
      maturityLevel,
      financialValuation
    };

    setResults(calculatedResults);
    
    if (onComplete) {
      onComplete(calculatedResults);
    }

    return calculatedResults;
  };

  const startQuestionnaire = () => {
    setCurrentStep('questionnaire');
    setCurrentPillar('identidade');
    setCurrentQuestion(0);
    setQuestionnaire({});
  };

  const nextQuestion = () => {
    const pillars = Object.keys(questionData);
    const currentPillarIndex = pillars.indexOf(currentPillar);
    const questionsInPillar = questionData[currentPillar].length;

    if (currentQuestion < questionsInPillar - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPillarIndex < pillars.length - 1) {
      setCurrentPillar(pillars[currentPillarIndex + 1]);
      setCurrentQuestion(0);
    } else {
      const results = calculateResults();
      setCurrentStep('results');
    }
  };

  const prevQuestion = () => {
    const pillars = Object.keys(questionData);
    const currentPillarIndex = pillars.indexOf(currentPillar);

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentPillarIndex > 0) {
      const prevPillar = pillars[currentPillarIndex - 1];
      setCurrentPillar(prevPillar);
      setCurrentQuestion(questionData[prevPillar].length - 1);
    }
  };

  const handleAnswer = (value: string) => {
    const key = `${currentPillar}_q${currentQuestion}`;
    setQuestionnaire({ ...questionnaire, [key]: value });
  };

  const getTotalProgress = () => {
    const totalQuestions = Object.values(questionData).flat().length;
    const pillars = Object.keys(questionData);
    let currentQuestionNumber = 0;
    
    for (let i = 0; i < pillars.indexOf(currentPillar); i++) {
      currentQuestionNumber += questionData[pillars[i]].length;
    }
    currentQuestionNumber += currentQuestion + 1;
    
    return (currentQuestionNumber / totalQuestions) * 100;
  };

  // Function to download report as PDF
  const downloadReport = () => {
    setDownloadingReport(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      // Create a simple text report
      const reportContent = `
FLOW INTANGIBLE VALUATION™ - RELATÓRIO COMPLETO
================================================

Data: ${new Date().toLocaleDateString('pt-BR')}
Nome: ${results.clientName || 'Cliente'}

RESUMO EXECUTIVO
----------------
Nível de Maturidade: ${results.maturityLevel}
Score Geral: ${(results.overallScore * 25).toFixed(0)}%

VALORAÇÃO FINANCEIRA
--------------------
Valor Total de Mercado: R$ ${results.financialValuation.total.toLocaleString('pt-BR')}
- Marca Pessoal: R$ ${results.financialValuation.marcaPessoal.toLocaleString('pt-BR')}
- Conteúdo/Criações: R$ ${results.financialValuation.conteudoCriacoes.toLocaleString('pt-BR')}
- Metodologias: R$ ${results.financialValuation.metodologias.toLocaleString('pt-BR')}

Valor/Hora Sugerido: R$ ${results.financialValuation.valorHora}

ANÁLISE POR PILAR
-----------------
Identidade: ${(results.pillarScores.identidade * 25).toFixed(0)}%
Influência: ${(results.pillarScores.influencia * 25).toFixed(0)}%
Legado: ${(results.pillarScores.legado * 25).toFixed(0)}%

PRÓXIMOS PASSOS
---------------
1. Agendar sessão de desenvolvimento personalizado
2. Implementar plano de ação baseado nos resultados
3. Acompanhar evolução trimestral

================================================
Flow Method™ - Desenvolvido por Tami Saito
      `;

      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Flow_Valuation_Report_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setDownloadingReport(false);
      alert('Relatório baixado com sucesso! Verifique sua pasta de downloads.');
    }, 2000);
  };

  // Function to show development plan
  const showDevelopmentPlanModal = () => {
    setShowDevelopmentPlan(true);
  };

  // Function to schedule session
  const scheduleSession = () => {
    setShowScheduleModal(true);
  };

  // Render different pages based on current step
  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Flow Intangible Valuation™
            </h1>
            <p className="text-xl opacity-90">
              Descubra o valor real da sua marca pessoal e ativos intangíveis
            </p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Identidade</h3>
                <p className="text-gray-600 text-sm">Descubra sua essência única</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Influência</h3>
                <p className="text-gray-600 text-sm">Amplie seu impacto no mundo</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Legado</h3>
                <p className="text-gray-600 text-sm">Construa algo duradouro</p>
              </div>
            </div>
            
            <button
              onClick={startQuestionnaire}
              className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Iniciar Avaliação Gratuita
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questionnaire') {
    const question = questionData[currentPillar][currentQuestion];
    const pillar = pillarData[currentPillar];
    const currentKey = `${currentPillar}_q${currentQuestion}`;
    const progress = getTotalProgress();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <div className="flex items-center justify-between text-white mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pillar.bgClass}`}>
                  <i className={`${pillar.icon} text-2xl ${pillar.textClass}`}></i>
                </div>
                <div>
                  <h2 className="font-semibold">Pilar: {pillar.name}</h2>
                  <p className="text-sm opacity-90">{pillar.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/90 mt-2">{Math.round(progress)}% concluído</p>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {question.question}
            </h3>
            <p className="text-gray-600 mb-8">
              {question.subtext}
            </p>
            
            <div className="space-y-3">
              {[
                { value: '0', label: 'Não iniciado', desc: 'Ainda não comecei a trabalhar nisso' },
                { value: '1', label: 'Inicial', desc: 'Primeiros passos, ainda muito a desenvolver' },
                { value: '2', label: 'Em desenvolvimento', desc: 'Progresso visível, mas ainda incompleto' },
                { value: '3', label: 'Avançado', desc: 'Bem desenvolvido, poucos ajustes necessários' },
                { value: '4', label: 'Excelência', desc: 'Totalmente desenvolvido e gerando resultados' }
              ].map((option) => (
                <label
                  key={option.value}
                  className="block cursor-pointer"
                >
                  <input
                    type="radio"
                    name={currentKey}
                    value={option.value}
                    checked={questionnaire[currentKey] === option.value}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    questionnaire[currentKey] === option.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900">{option.label}</span>
                        <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        questionnaire[currentKey] === option.value
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {questionnaire[currentKey] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="flex gap-4 mt-8">
              {(currentQuestion > 0 || currentPillar !== 'identidade') && (
                <button
                  onClick={prevQuestion}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
              )}
              
              <button
                onClick={nextQuestion}
                disabled={!questionnaire[currentKey]}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  questionnaire[currentKey]
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentPillar === 'legado' && currentQuestion === questionData[currentPillar].length - 1
                  ? 'Ver Resultados'
                  : 'Próxima'
                }
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && results) {
    const chartData = {
      labels: ['Identidade', 'Influência', 'Legado'],
      datasets: [
        {
          label: 'Seu Perfil Flow',
          data: [
            results.pillarScores.identidade * 100,
            results.pillarScores.influencia * 100,
            results.pillarScores.legado * 100
          ],
          backgroundColor: 'rgba(124, 14, 239, 0.2)',
          borderColor: 'rgba(124, 14, 239, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(124, 14, 239, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(124, 14, 239, 1)'
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.parsed.r.toFixed(0) + '%';
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            callback: function(value: any) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold' as const
            }
          }
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
              <h1 className="text-4xl font-bold mb-4">
                Seus Resultados Flow Intangible Valuation™
              </h1>
              <p className="text-xl opacity-90">
                Análise completa do valor da sua marca pessoal
              </p>
            </div>
            
            <div className="p-8">
              {/* Financial Valuation */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Valoração Financeira Total
                  </h2>
                  <div className="text-5xl font-bold text-purple-600 mb-4">
                    R$ {results.financialValuation.total.toLocaleString('pt-BR')}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Marca Pessoal</span>
                      <span className="font-semibold">
                        R$ {results.financialValuation.marcaPessoal.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Conteúdo/Criações</span>
                      <span className="font-semibold">
                        R$ {results.financialValuation.conteudoCriacoes.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Metodologias</span>
                      <span className="font-semibold">
                        R$ {results.financialValuation.metodologias.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Valor/Hora Sugerido</span>
                      <span className="text-2xl font-bold text-purple-600">
                        R$ {results.financialValuation.valorHora}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Análise de Maturidade
                  </h2>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Score Geral</span>
                      <span className="text-3xl font-bold text-purple-600">
                        {(results.overallScore * 25).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${results.overallScore * 25}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg text-gray-600 mb-2">Nível de Maturidade</div>
                      <div className="text-3xl font-bold text-purple-600">
                        {results.maturityLevel}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Identidade</span>
                        <span className="text-sm font-semibold">
                          {(results.pillarScores.identidade * 25).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${results.pillarScores.identidade * 25}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Influência</span>
                        <span className="text-sm font-semibold">
                          {(results.pillarScores.influencia * 25).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${results.pillarScores.influencia * 25}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Legado</span>
                        <span className="text-sm font-semibold">
                          {(results.pillarScores.legado * 25).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${results.pillarScores.legado * 25}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Radar Chart */}
              <div className="bg-gray-50 p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Perfil dos 3 Pilares
                </h2>
                <div className="h-80">
                  <Radar data={chartData} options={chartOptions} />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Voltar ao Início
                </button>
                
                <button
                  onClick={downloadReport}
                  disabled={downloadingReport}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  {downloadingReport ? 'Gerando...' : 'Baixar Relatório'}
                </button>
                
                <button
                  onClick={showDevelopmentPlanModal}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Plano Personalizado
                </button>
                
                <button
                  onClick={scheduleSession}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Sessão
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>© 2025 Flow Method™ - Desenvolvido por Tami Saito</p>
          </div>
        </div>
        
        {/* Development Plan Modal */}
        {showDevelopmentPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Plano de Desenvolvimento Personalizado
                  </h2>
                  <button
                    onClick={() => setShowDevelopmentPlan(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-purple-900 mb-3">
                      Baseado em sua avaliação:
                    </h3>
                    <p className="text-purple-700">
                      Você está no nível <strong>{results.maturityLevel}</strong> com um score de {(results.overallScore * 25).toFixed(0)}%.
                      Seu maior potencial está em desenvolver o pilar {
                        results.pillarScores.legado < results.pillarScores.influencia && 
                        results.pillarScores.legado < results.pillarScores.identidade ? 'Legado' :
                        results.pillarScores.influencia < results.pillarScores.identidade ? 'Influência' : 'Identidade'
                      }.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Recomendações Prioritárias:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Framework Identity Matrix™</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Aprofunde seu autoconhecimento e alinhe valores com propósito
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Strategic Networking Map™</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Construa uma rede estratégica de relacionamentos de alto valor
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Legacy Blueprint™</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Desenvolva metodologias próprias e crie impacto escalável
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Cronograma Sugerido:
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mês 1-2:</span>
                        <span className="font-medium">Consolidação da Identidade</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mês 3-4:</span>
                        <span className="font-medium">Expansão da Influência</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mês 5-6:</span>
                        <span className="font-medium">Construção do Legado</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowDevelopmentPlan(false);
                      setShowScheduleModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Agendar Sessão de Planejamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Schedule Session Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Agendar Sessão
                  </h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">
                      Agende uma sessão personalizada para discutir seus resultados e criar um plano de ação específico.
                    </p>
                  </div>
                  
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Agendamento realizado com sucesso! Você receberá um e-mail de confirmação em breve.');
                    setShowScheduleModal(false);
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferência de Horário
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Selecione...</option>
                        <option value="manha">Manhã (9h-12h)</option>
                        <option value="tarde">Tarde (14h-18h)</option>
                        <option value="noite">Noite (19h-21h)</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Confirmar Agendamento
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ValuationAssessment;