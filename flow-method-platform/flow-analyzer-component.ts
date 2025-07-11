import React, { useState } from 'react';
import {
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown,
  Users, Target, Award, Calendar, Clock, Star,
  Download, Share2, Filter, Search, ChevronDown,
  ArrowUp, ArrowDown, Activity, Brain, Heart,
  Zap, Shield, Compass, Map, BookOpen, FileText,
  CheckCircle, AlertCircle, Info, Settings, Eye
} from 'lucide-react';

interface FlowAnalyzerProps {
  clientData?: any;
}

interface ClientData {
  name: string;
  currentLevel: string;
  overallProgress: number;
  pillarScores: {
    identidade: number;
    influencia: number;
    legado: number;
  };
  etapasProgress: {
    etapa1: number;
    etapa2: number;
    etapa3: number;
    etapa4: number;
    etapa5: number;
    etapa6: number;
    etapa7: number;
    etapa8: number;
    etapa9: number;
  };
  ativosIntangiveis: {
    marcaPessoal: number;
    redeRelacionamentos: number;
    conhecimentoEspecializado: number;
    metodologiasProprias: number;
    reputacaoCredibilidade: number;
    influenciaDigital: number;
    experienciaAcumulada: number;
    visaoEstrategica: number;
    capacidadeInovacao: number;
  };
}

const FlowAnalyzer: React.FC<FlowAnalyzerProps> = ({ clientData }) => {
  const [activeReport, setActiveReport] = useState('assessment');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [timeRange, setTimeRange] = useState('3months');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [analysisDepth, setAnalysisDepth] = useState('detailed');

  // Default client data if not provided
  const defaultClientData: ClientData = {
    name: clientData?.name || 'João Silva',
    currentLevel: 'Nível 4 - Influência Estabelecida',
    overallProgress: 75,
    pillarScores: {
      identidade: 85,
      influencia: 72,
      legado: 68
    },
    etapasProgress: {
      etapa1: 100,
      etapa2: 100,
      etapa3: 100,
      etapa4: 90,
      etapa5: 80,
      etapa6: 70,
      etapa7: 60,
      etapa8: 40,
      etapa9: 30
    },
    ativosIntangiveis: {
      marcaPessoal: 850000,
      redeRelacionamentos: 620000,
      conhecimentoEspecializado: 480000,
      metodologiasProprias: 320000,
      reputacaoCredibilidade: 750000,
      influenciaDigital: 420000,
      experienciaAcumulada: 580000,
      visaoEstrategica: 380000,
      capacidadeInovacao: 290000
    }
  };

  const client = { ...defaultClientData, ...clientData };

  // Framework insights data
  const frameworkInsights = {
    'identity-matrix': {
      completionRate: 85,
      timeSpent: '12.5 horas',
      keyInsights: [
        'Forte alinhamento entre valores pessoais e profissionais',
        'Clareza na definição de propósito de vida',
        'Narrativa pessoal bem estruturada e autêntica'
      ],
      recommendations: [
        'Aprofundar a exploração de talentos latentes',
        'Desenvolver rituais de autoconhecimento contínuo',
        'Documentar evolução da identidade ao longo do tempo'
      ]
    },
    'influence-network': {
      completionRate: 72,
      timeSpent: '8.3 horas',
      keyInsights: [
        'Rede de relacionamentos diversificada e estratégica',
        'Alta taxa de reciprocidade em conexões profissionais',
        'Presença digital crescente com engajamento autêntico'
      ],
      recommendations: [
        'Expandir presença em comunidades internacionais',
        'Desenvolver estratégia de thought leadership',
        'Criar sistema de nurturing para relacionamentos-chave'
      ]
    },
    'legacy-blueprint': {
      completionRate: 45,
      timeSpent: '5.7 horas',
      keyInsights: [
        'Visão clara de impacto desejado a longo prazo',
        'Primeiros passos em direção a criação de metodologias',
        'Interesse em mentoria e desenvolvimento de outros'
      ],
      recommendations: [
        'Estruturar programa de mentoria formal',
        'Documentar e sistematizar conhecimento único',
        'Criar plataforma para escalar impacto'
      ]
    }
  };

  // Generate reports
  const generateReport = (type: string) => {
    switch(type) {
      case 'assessment':
        return generateAssessmentReport();
      case 'strategic':
        return generateStrategicReport();
      case 'valuation':
        return generateValuationReport();
      case 'development':
        return generateDevelopmentReport();
      default:
        return null;
    }
  };

  const generateAssessmentReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Flow Assessment Report™</h3>
        
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Progresso Geral</span>
            <span className="text-2xl font-bold text-purple-600">{client.overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
              style={{ width: `${client.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Pillar Scores */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {client.pillarScores.identidade}%
            </div>
            <div className="text-sm text-gray-600">Identidade</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {client.pillarScores.influencia}%
            </div>
            <div className="text-sm text-gray-600">Influência</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {client.pillarScores.legado}%
            </div>
            <div className="text-sm text-gray-600">Legado</div>
          </div>
        </div>

        {/* Level Information */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Nível Atual</h4>
              <p className="text-sm text-gray-600 mt-1">{client.currentLevel}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Detailed Etapas Progress */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso por Etapa</h3>
        <div className="space-y-3">
          {Object.entries(client.etapasProgress).map(([etapa, progress]) => (
            <div key={etapa} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  progress === 100 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {etapa.replace('etapa', '')}
                </div>
                <span className="text-sm text-gray-700">
                  Etapa {etapa.replace('etapa', '')} - {getEtapaName(etapa)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-12 text-right">
                  {progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const generateStrategicReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Estratégico Flow Method</h3>
        
        {/* Strategic Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Resumo Executivo</h4>
          <p className="text-gray-700 leading-relaxed">
            {client.name} está no {client.currentLevel} de desenvolvimento, com {client.overallProgress}% 
            de progresso geral. Forte base em Identidade ({client.pillarScores.identidade}%), 
            desenvolvendo Influência ({client.pillarScores.influencia}%), e preparando 
            terreno para Legado ({client.pillarScores.legado}%).
          </p>
        </div>

        {/* Strategic Pillars Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Identidade</h5>
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pontos Fortes:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Clareza de propósito</li>
                  <li>• Valores bem definidos</li>
                  <li>• Narrativa autêntica</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <span className="font-medium">Oportunidades:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Aprofundar autoconhecimento</li>
                  <li>• Explorar talentos latentes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Influência</h5>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pontos Fortes:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Rede diversificada</li>
                  <li>• Comunicação eficaz</li>
                  <li>• Presença digital crescente</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <span className="font-medium">Oportunidades:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Thought leadership</li>
                  <li>• Parcerias estratégicas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Legado</h5>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pontos Fortes:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Visão de impacto clara</li>
                  <li>• Metodologias em desenvolvimento</li>
                  <li>• Interesse em mentoria</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <span className="font-medium">Oportunidades:</span>
                <ul className="mt-1 space-y-1">
                  <li>• Sistematizar conhecimento</li>
                  <li>• Escalar impacto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plano de Ação Estratégico</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-red-600">1</span>
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-gray-900">Curto Prazo (0-3 meses)</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Completar frameworks em andamento</li>
                <li>• Estabelecer rotina de práticas Flow</li>
                <li>• Iniciar documentação de insights</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-yellow-600">2</span>
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-gray-900">Médio Prazo (3-6 meses)</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Desenvolver primeira metodologia própria</li>
                <li>• Expandir rede estratégica em 30%</li>
                <li>• Lançar iniciativa de thought leadership</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-green-600">3</span>
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-gray-900">Longo Prazo (6-12 meses)</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Estruturar programa de mentoria</li>
                <li>• Criar produto/serviço escalável</li>
                <li>• Estabelecer presença internacional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const generateValuationReport = () => {
    const totalValue = Object.values(client.ativosIntangiveis).reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Relatório de Valoração de Ativos Intangíveis</h3>
          
          {/* Total Valuation */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Valor Total dos Ativos Intangíveis</p>
              <p className="text-4xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(totalValue)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Crescimento de +18.3% nos últimos 3 meses
              </p>
            </div>
          </div>

          {/* Assets Breakdown */}
          <div className="space-y-4">
            {Object.entries(client.ativosIntangiveis).map(([asset, value]) => {
              const percentage = (value / totalValue * 100).toFixed(1);
              return (
                <div key={asset} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {formatAssetName(asset)}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0
                        }).format(value)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Valuation Insights */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights de Valoração</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                Ativos em Alta
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">Marca Pessoal</span>
                  <span className="text-sm font-medium text-green-600">+22%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">Influência Digital</span>
                  <span className="text-sm font-medium text-green-600">+18%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">Reputação</span>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                Oportunidades de Crescimento
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-700">Metodologias Próprias</span>
                  <span className="text-sm font-medium text-blue-600">Alto Potencial</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-700">Capacidade de Inovação</span>
                  <span className="text-sm font-medium text-blue-600">Médio Potencial</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-700">Visão Estratégica</span>
                  <span className="text-sm font-medium text-blue-600">Em Desenvolvimento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generateDevelopmentReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plano de Desenvolvimento Personalizado</h3>
        
        {/* Current State Analysis */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Análise do Estado Atual</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {client.currentLevel.split(' - ')[0]}
              </div>
              <div className="text-sm text-gray-600">Nível Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {client.overallProgress}%
              </div>
              <div className="text-sm text-gray-600">Progresso Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.round((client.pillarScores.identidade + client.pillarScores.influencia + client.pillarScores.legado) / 3)}%
              </div>
              <div className="text-sm text-gray-600">Score Médio</div>
            </div>
          </div>
        </div>

        {/* Development Priorities */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-900">Prioridades de Desenvolvimento</h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">Alta Prioridade</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Completar frameworks do pilar Legado para equilibrar desenvolvimento
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Urgente</span>
                  <span className="text-xs text-gray-500">Impacto: Alto</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">Média Prioridade</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Desenvolver metodologias próprias e sistematizar conhecimento
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Importante</span>
                  <span className="text-xs text-gray-500">Impacto: Médio</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">Manutenção</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Continuar práticas de autoconhecimento e networking estratégico
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Contínuo</span>
                  <span className="text-xs text-gray-500">Impacto: Sustentado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Próximos Passos Recomendados</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">Framework: Legacy Blueprint</h5>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Novo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Desenvolva sua visão de legado e crie estruturas para impacto duradouro
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
                Iniciar Framework
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">Sessão: Strategic Planning</h5>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Live</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Sessão personalizada para definir estratégias de crescimento exponencial
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Agendar Sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions
  const getEtapaName = (etapa: string): string => {
    const names: { [key: string]: string } = {
      etapa1: 'Descoberta da Essência',
      etapa2: 'Alinhamento de Valores',
      etapa3: 'Construção de Narrativa',
      etapa4: 'Desenvolvimento de Voz',
      etapa5: 'Expansão de Rede',
      etapa6: 'Estratégias de Influência',
      etapa7: 'Visão de Legado',
      etapa8: 'Criação de Metodologias',
      etapa9: 'Impacto Escalável'
    };
    return names[etapa] || etapa;
  };

  const formatAssetName = (asset: string): string => {
    const names: { [key: string]: string } = {
      marcaPessoal: 'Marca Pessoal',
      redeRelacionamentos: 'Rede de Relacionamentos',
      conhecimentoEspecializado: 'Conhecimento Especializado',
      metodologiasProprias: 'Metodologias Próprias',
      reputacaoCredibilidade: 'Reputação e Credibilidade',
      influenciaDigital: 'Influência Digital',
      experienciaAcumulada: 'Experiência Acumulada',
      visaoEstrategica: 'Visão Estratégica',
      capacidadeInovacao: 'Capacidade de Inovação'
    };
    return names[asset] || asset;
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format...`);
    // Implementation for export functionality
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Flow Method Analyzer™</h1>
              <p className="text-gray-600 mt-1">
                Análise profunda e geração de relatórios personalizados para {client.name}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Share2 className="w-5 h-5" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>

          {/* Export Options Dropdown */}
          {showExportOptions && (
            <div className="absolute right-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => exportReport('pdf')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              >
                Exportar como PDF
              </button>
              <button
                onClick={() => exportReport('excel')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              >
                Exportar como Excel
              </button>
              <button
                onClick={() => exportReport('ppt')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              >
                Exportar como PowerPoint
              </button>
            </div>
          )}
        </div>

        {/* Report Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'assessment', label: 'Assessment Report', icon: Target },
              { id: 'strategic', label: 'Framework Estratégico', icon: Compass },
              { id: 'valuation', label: 'Valoração de Ativos', icon: TrendingUp },
              { id: 'development', label: 'Plano de Desenvolvimento', icon: Map }
            ].map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setActiveReport(report.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeReport === report.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{report.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Período:</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="1month">Último mês</option>
                  <option value="3months">Últimos 3 meses</option>
                  <option value="6months">Últimos 6 meses</option>
                  <option value="1year">Último ano</option>
                  <option value="all">Todo período</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Profundidade:</label>
                <select
                  value={analysisDepth}
                  onChange={(e) => setAnalysisDepth(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="summary">Resumo Executivo</option>
                  <option value="detailed">Análise Detalhada</option>
                  <option value="comprehensive">Relatório Completo</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div>{generateReport(activeReport)}</div>

        {/* Report Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Relatório gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
          </p>
          <p className="mt-1">
            Flow Method™ - Sistema de Análise Avançada | Desenvolvido por Tami Saito
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlowAnalyzer;