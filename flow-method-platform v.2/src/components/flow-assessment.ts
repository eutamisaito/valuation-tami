'use client';

import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  subcategory: string;
  weight: number;
  question: string;
  type: 'scale' | 'text';
  pillar: 'identidade' | 'influencia' | 'legado';
}

interface FlowAssessmentProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

const FlowAssessment: React.FC<FlowAssessmentProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentPillar, setCurrentPillar] = useState<'identidade' | 'influencia' | 'legado'>('identidade');

  const questions: Question[] = [
    // Identidade (15 perguntas)
    {
      id: 'proposito_definicao',
      category: 'Clareza de Propósito',
      subcategory: 'Definição do Propósito',
      weight: 20,
      question: 'O quanto você tem clareza sobre seu propósito de vida e carreira?',
      type: 'scale',
      pillar: 'identidade'
    },
    {
      id: 'proposito_alinhamento',
      category: 'Clareza de Propósito',
      subcategory: 'Alinhamento com Ações',
      weight: 15,
      question: 'O quanto suas ações diárias estão alinhadas com seu propósito?',
      type: 'scale',
      pillar: 'identidade'
    },
    {
      id: 'valores_identificacao',
      category: 'Valores Pessoais',
      subcategory: 'Identificação de Valores',
      weight: 15,
      question: 'O quanto você tem clareza sobre seus valores fundamentais?',
      type: 'scale',
      pillar: 'identidade'
    },
    {
      id: 'valores_vivencia',
      category: 'Valores Pessoais',
      subcategory: 'Vivência dos Valores',
      weight: 15,
      question: 'O quanto você vive seus valores no dia a dia?',
      type: 'scale',
      pillar: 'identidade'
    },
    {
      id: 'talentos_reconhecimento',
      category: 'Talentos e Competências',
      subcategory: 'Reconhecimento de Talentos',
      weight: 20,
      question: 'O quanto você reconhece e compreende seus talentos únicos?',
      type: 'scale',
      pillar: 'identidade'
    },
    {
      id: 'talentos_desenvolvimento',
      category: 'Talentos e Competências',
      subcategory: 'Desenvolvimento Contínuo',
      weight: 15,
      question: 'O quanto você investe no desenvolvimento de seus talentos?',
      type: 'scale',
      pillar: 'identidade'
    },
    // Influência (15 perguntas)
    {
      id: 'marca_consistencia',
      category: 'Marca Pessoal',
      subcategory: 'Consistência da Marca',
      weight: 20,
      question: 'O quanto sua comunicação e presença são consistentes em diferentes contextos?',
      type: 'scale',
      pillar: 'influencia'
    },
    {
      id: 'marca_reconhecimento',
      category: 'Marca Pessoal',
      subcategory: 'Reconhecimento Externo',
      weight: 15,
      question: 'O quanto as pessoas reconhecem e lembram de você por suas qualidades únicas?',
      type: 'scale',
      pillar: 'influencia'
    },
    {
      id: 'rede_qualidade',
      category: 'Rede de Relacionamentos',
      subcategory: 'Qualidade das Conexões',
      weight: 20,
      question: 'O quanto você cultiva relacionamentos profundos e significativos?',
      type: 'scale',
      pillar: 'influencia'
    },
    {
      id: 'rede_diversidade',
      category: 'Rede de Relacionamentos',
      subcategory: 'Diversidade da Rede',
      weight: 15,
      question: 'O quanto sua rede inclui pessoas de diferentes áreas e perspectivas?',
      type: 'scale',
      pillar: 'influencia'
    },
    {
      id: 'mentoria_oferecimento',
      category: 'Mentorias e Ensino',
      subcategory: 'Compartilhamento de Conhecimento',
      weight: 20,
      question: 'O quanto você compartilha conhecimento e orienta outras pessoas?',
      type: 'scale',
      pillar: 'influencia'
    },
    {
      id: 'mentoria_impacto',
      category: 'Mentorias e Ensino',
      subcategory: 'Impacto nas Pessoas',
      weight: 10,
      question: 'O quanto você vê transformações positivas nas pessoas que orienta?',
      type: 'scale',
      pillar: 'influencia'
    },
    // Legado (15 perguntas)
    {
      id: 'impacto_mensuracao',
      category: 'Impacto Mensurável',
      subcategory: 'Medição de Resultados',
      weight: 25,
      question: 'O quanto você consegue medir o impacto positivo de suas ações?',
      type: 'scale',
      pillar: 'legado'
    },
    {
      id: 'impacto_alcance',
      category: 'Impacto Mensurável',
      subcategory: 'Alcance do Impacto',
      weight: 20,
      question: 'O quanto seu impacto alcança diferentes pessoas e comunidades?',
      type: 'scale',
      pillar: 'legado'
    },
    {
      id: 'sustentabilidade_sistemas',
      category: 'Sustentabilidade',
      subcategory: 'Criação de Sistemas',
      weight: 25,
      question: 'O quanto você cria sistemas e processos que funcionam independentemente de você?',
      type: 'scale',
      pillar: 'legado'
    },
    {
      id: 'sustentabilidade_continuidade',
      category: 'Sustentabilidade',
      subcategory: 'Continuidade do Legado',
      weight: 15,
      question: 'O quanto você garante que seu trabalho terá continuidade no futuro?',
      type: 'scale',
      pillar: 'legado'
    },
    {
      id: 'sucessao_preparacao',
      category: 'Sucessão e Multiplicação',
      subcategory: 'Preparação de Sucessores',
      weight: 15,
      question: 'O quanto você prepara outras pessoas para continuar seu trabalho?',
      type: 'scale',
      pillar: 'legado'
    }
  ];

  const pillarQuestions = questions.filter(q => q.pillar === currentPillar);
  const currentQuestion = pillarQuestions[currentStep];
  const totalSteps = pillarQuestions.length;

  const handleAnswer = useCallback((value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  }, [currentQuestion?.id]);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Próximo pilar ou finalizar
      if (currentPillar === 'identidade') {
        setCurrentPillar('influencia');
        setCurrentStep(0);
      } else if (currentPillar === 'influencia') {
        setCurrentPillar('legado');
        setCurrentStep(0);
      } else {
        calculateResults();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Pilar anterior
      if (currentPillar === 'influencia') {
        setCurrentPillar('identidade');
        setCurrentStep(questions.filter(q => q.pillar === 'identidade').length - 1);
      } else if (currentPillar === 'legado') {
        setCurrentPillar('influencia');
        setCurrentStep(questions.filter(q => q.pillar === 'influencia').length - 1);
      }
    }
  };

  const calculateResults = () => {
    // Calcular scores por pilar
    const pillarScores = {
      identidade: 0,
      influencia: 0,
      legado: 0
    };

    const specificScores: Record<string, number> = {};

    // Calcular scores
    questions.forEach(question => {
      const answer = answers[question.id] || 0;
      const normalizedScore = answer / 10; // Normalizar para 0-1
      
      pillarScores[question.pillar] += normalizedScore * (question.weight / 100);
      specificScores[question.id] = normalizedScore;
    });

    // Normalizar scores dos pilares
    Object.keys(pillarScores).forEach(pillar => {
      const totalWeight = questions
        .filter(q => q.pillar === pillar as any)
        .reduce((sum, q) => sum + q.weight, 0);
      pillarScores[pillar as keyof typeof pillarScores] = 
        (pillarScores[pillar as keyof typeof pillarScores] * 100) / totalWeight;
    });

    // Calcular score geral
    const overallScore = (pillarScores.identidade + pillarScores.influencia + pillarScores.legado) / 3;

    // Determinar nível de maturidade
    let maturityLevel = '';
    if (overallScore <= 0.4) maturityLevel = 'Emergente';
    else if (overallScore <= 0.65) maturityLevel = 'Desenvolvimento';
    else if (overallScore <= 0.85) maturityLevel = 'Consolidação';
    else maturityLevel = 'Maestria';

    const results = {
      overallScore: overallScore / 100,
      maturityLevel,
      pillarScores: {
        identidade: pillarScores.identidade / 100,
        influencia: pillarScores.influencia / 100,
        legado: pillarScores.legado / 100
      },
      specificScores
    };

    onComplete(results);
  };

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'identidade': return <Target className="w-6 h-6" />;
      case 'influencia': return <TrendingUp className="w-6 h-6" />;
      case 'legado': return <Users className="w-6 h-6" />;
      default: return null;
    }
  };

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case 'identidade': return 'from-purple-500 to-purple-600';
      case 'influencia': return 'from-pink-500 to-pink-600';
      case 'legado': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const totalProgress = () => {
    const identidadeQuestions = questions.filter(q => q.pillar === 'identidade').length;
    const influenciaQuestions = questions.filter(q => q.pillar === 'influencia').length;
    const legadoQuestions = questions.filter(q => q.pillar === 'legado').length;
    
    let completed = 0;
    if (currentPillar === 'identidade') {
      completed = currentStep;
    } else if (currentPillar === 'influencia') {
      completed = identidadeQuestions + currentStep;
    } else {
      completed = identidadeQuestions + influenciaQuestions + currentStep;
    }
    
    return (completed / (identidadeQuestions + influenciaQuestions + legadoQuestions)) * 100;
  };

  if (!currentQuestion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-purple-900">Flow Method™ Assessment</h1>
              <p className="text-gray-600">Avaliação de Valor Intangível</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              {Math.round(totalProgress())}% completo
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress()}%` }}
            ></div>
          </div>

          {/* Current Pillar Indicator */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r ${getPillarColor(currentPillar)} text-white px-6 py-3 rounded-full flex items-center gap-3`}>
              {getPillarIcon(currentPillar)}
              <span className="font-semibold capitalize">{currentPillar}</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                {currentQuestion.category} • {currentQuestion.subcategory}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {currentQuestion.type === 'scale' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Discordo totalmente</span>
                  <span>Concordo totalmente</span>
                </div>
                
                <div className="px-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={answers[currentQuestion.id] || 5}
                    onChange={(e) => handleAnswer(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i + 1}>{i + 1}</span>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getPillarColor(currentPillar)} text-white px-4 py-2 rounded-full`}>
                    <span className="text-2xl font-bold">
                      {answers[currentQuestion.id] || 5}
                    </span>
                    <span className="text-sm">/ 10</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentPillar === 'identidade' && currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={nextStep}
              disabled={!answers[currentQuestion.id]}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentPillar === 'legado' && currentStep === totalSteps - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Finalizar Avaliação
                </>
              ) : (
                <>
                  Próxima
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Pillar Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {['identidade', 'influencia', 'legado'].map((pillar, index) => (
              <div
                key={pillar}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  pillar === currentPillar
                    ? `bg-gradient-to-r ${getPillarColor(pillar)} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {getPillarIcon(pillar)}
                <span className="text-sm font-medium capitalize">{pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowAssessment;