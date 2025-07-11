import React, { useState, useEffect } from 'react';
import {
  User, Crown, Target, TrendingUp, Award, Calendar, FileText,
  BarChart3, Settings, Download, Share2, Clock, CheckCircle,
  Star, ArrowRight, Play, Pause, RotateCcw, Plus, Minus,
  Eye, Edit3, Save, Copy, Printer, Mail, BookOpen,
  Layers, Map, Compass, Heart, Brain, Lightbulb, Users,
  Activity, PieChart, LineChart, Filter, Search, Bell,
  MessageSquare, Video, Mic, Camera, Upload, AlertCircle,
  DollarSign, TrendingDown, Globe, Zap, Shield, Smartphone,
  Monitor, Headphones, Network, Database, CloudLightning,
  Cpu, Wifi, Lock, Unlock, RefreshCw, ExternalLink,
  ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  MoreHorizontal, ThumbsUp, ThumbsDown, Flag, Gift,
  Briefcase, GraduationCap, Building, Home, Car, Plane,
  Phone, PersonStanding, Sparkles, Workflow, Timer,
  ClipboardList, UserCheck, Bookmark, History, Send, X
} from 'lucide-react';

interface FlowPlatformProps {
  userData?: any;
  assessmentData?: any;
}

const FlowPlatform: React.FC<FlowPlatformProps> = ({ userData, assessmentData }) => {
  const [userRole, setUserRole] = useState('client');
  const [activeView, setActiveView] = useState('dashboard');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAsyncSession, setShowAsyncSession] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'coach', name: 'Tami Saito', message: 'Como você está se sentindo após a última sessão?', time: '10:30' },
    { id: 2, sender: 'client', name: 'João Silva', message: 'Muito bem! Os insights sobre networking foram transformadores.', time: '10:35' }
  ]);

  // Client Data
  const clientData = {
    name: userData?.name || 'João Silva',
    profession: 'CEO & Founder',
    company: 'TechVision Brasil',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    level: 'Nível 4 - Influência',
    flowScore: 82,
    marketValue: 850000,
    valuationGrowth: 18.3,
    marketPercentile: 92,
    sessionsCompleted: 24,
    nextSession: '2025-02-05 14:00',
    ...assessmentData
  };

  // Coach Data
  const coachData = {
    name: 'Tami Saito',
    title: 'Master Coach & Creator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5.0,
    clientsActive: 47,
    monthlyRevenue: 385000,
    sessionsThisMonth: 124,
    revenueGrowth: 24.5
  };

  // Navigation Items
  const clientNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assessment', label: 'Assessments', icon: Target },
    { id: 'coaching', label: 'Coaching', icon: Users },
    { id: 'valuation', label: 'Valuation', icon: TrendingUp },
    { id: 'frameworks', label: 'Frameworks', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'resources', label: 'Recursos', icon: BookOpen },
    { id: 'community', label: 'Comunidade', icon: Globe }
  ];

  const coachNavItems = [
    { id: 'coach-dashboard', label: 'Dashboard', icon: Home },
    { id: 'coach-clients', label: 'Clientes', icon: Users },
    { id: 'coach-sessions', label: 'Sessões', icon: Calendar },
    { id: 'coach-analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'coach-frameworks', label: 'Frameworks', icon: Layers },
    { id: 'coach-revenue', label: 'Financeiro', icon: DollarSign }
  ];

  // Notifications
  const notifications = [
    { id: 1, title: 'Nova sessão disponível', message: 'Strategic Relationship Mapping está pronta', unread: true },
    { id: 2, title: 'Conquista desbloqueada!', message: 'Você completou o framework Identity Matrix', unread: true },
    { id: 3, title: 'Lembrete de sessão', message: 'Sua próxima sessão é amanhã às 14h', unread: false }
  ];

  // Frameworks Data
  const frameworksData = [
    {
      id: 'identity-matrix',
      name: 'Identity Matrix™',
      pilar: 'Identidade',
      description: 'Mapeamento profundo da sua essência e valores fundamentais',
      duration: '90 min',
      difficulty: 'Intermediário',
      progress: 100,
      status: 'completed',
      icon: User
    },
    {
      id: 'influence-network',
      name: 'Influence Network Mapping™',
      pilar: 'Influência',
      description: 'Análise estratégica da sua rede de relacionamentos',
      duration: '120 min',
      difficulty: 'Avançado',
      progress: 65,
      status: 'in-progress',
      icon: Network
    },
    {
      id: 'legacy-blueprint',
      name: 'Legacy Blueprint™',
      pilar: 'Legado',
      description: 'Planejamento do impacto duradouro que você quer criar',
      duration: '150 min',
      difficulty: 'Expert',
      progress: 0,
      status: 'locked',
      icon: Crown
    }
  ];

  // Analytics Data
  const analyticsData = {
    flowProgress: [
      { month: 'Set', identidade: 65, influencia: 45, legado: 25 },
      { month: 'Out', identidade: 72, influencia: 52, legado: 28 },
      { month: 'Nov', identidade: 78, influencia: 61, legado: 35 },
      { month: 'Dez', identidade: 82, influencia: 68, legado: 42 },
      { month: 'Jan', identidade: 82, influencia: 71, legado: 53 }
    ]
  };

  // Coach Clients
  const coachClients = [
    {
      id: 1,
      name: 'João Silva',
      profession: 'CEO & Founder',
      company: 'TechVision Brasil',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      flowScore: 82,
      marketValue: 850000,
      sessionsCompleted: 24,
      nextSession: '2025-02-05 14:00'
    },
    {
      id: 2,
      name: 'Maria Santos',
      profession: 'VP Marketing',
      company: 'Growth Labs',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      flowScore: 76,
      marketValue: 620000,
      sessionsCompleted: 18,
      nextSession: '2025-02-06 10:00'
    }
  ];

  // Utility Functions
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const showSuccessMessage = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: userRole,
        name: userRole === 'client' ? clientData.name : coachData.name,
        message: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      showSuccessMessage('Mensagem enviada!');
    }
  };

  // Views
  const renderView = () => {
    if (userRole === 'coach') {
      switch(activeView) {
        case 'coach-dashboard':
          return <CoachDashboardView />;
        case 'coach-clients':
          return <ClientManagementView />;
        case 'coach-sessions':
          return <SessionCalendarView />;
        default:
          return <CoachDashboardView />;
      }
    }

    switch(activeView) {
      case 'dashboard':
        return <ClientDashboard />;
      case 'assessment':
        return <AssessmentView />;
      case 'coaching':
        return <CoachingView />;
      case 'valuation':
        return <ValuationView />;
      case 'frameworks':
        return <FrameworksView />;
      default:
        return <ClientDashboard />;
    }
  };

  // Client Dashboard
  const ClientDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={clientData.avatar}
              alt={clientData.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{clientData.name}</h1>
              <p className="text-gray-600">{clientData.profession} • {clientData.company}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-purple-600 font-medium">{clientData.level}</span>
                <span className="text-sm text-gray-500">Flow Score: {clientData.flowScore}/100</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(clientData.marketValue)}</div>
            <div className="text-sm text-gray-600">Valor de Mercado</div>
            <div className="text-sm text-green-600 font-medium mt-1">+{clientData.valuationGrowth}% este mês</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-purple-600" />
            <span className="text-green-600 text-sm font-medium">+8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{clientData.flowScore}/100</div>
          <div className="text-sm text-gray-600">Flow Score</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-green-600 text-sm font-medium">+{clientData.valuationGrowth}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(clientData.marketValue)}</div>
          <div className="text-sm text-gray-600">Valor de Mercado</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 text-sm font-medium">Top {100 - clientData.marketPercentile}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{clientData.marketPercentile}º</div>
          <div className="text-sm text-gray-600">Percentil de Mercado</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-orange-600" />
            <span className="text-orange-600 text-sm font-medium">Agendada</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{clientData.sessionsCompleted}</div>
          <div className="text-sm text-gray-600">Sessões Completas</div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">🚀 Próximos Passos Recomendados</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Complete o Assessment</h3>
            <p className="text-sm opacity-90">Finalize o Influence Network Mapping para desbloquear novos insights</p>
            <button className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
              Continuar
            </button>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Agende Sessão Live</h3>
            <p className="text-sm opacity-90">Próxima sessão: {formatDate(clientData.nextSession)}</p>
            <button className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
              Ver Agenda
            </button>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Explore Frameworks</h3>
            <p className="text-sm opacity-90">3 novos frameworks disponíveis para você</p>
            <button 
              onClick={() => setActiveView('frameworks')}
              className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Explorar
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Framework Identity Matrix concluído</p>
                <p className="text-sm text-gray-600">Há 2 dias</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">+15 pontos</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Valor de mercado aumentou</p>
                <p className="text-sm text-gray-600">Há 1 semana</p>
              </div>
            </div>
            <span className="text-sm font-medium text-blue-600">+R$ 50.000</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Assessment View
  const AssessmentView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Flow Assessments</h2>
        <p className="opacity-90">
          Avaliações detalhadas para mapear seu progresso nos 3 pilares
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {frameworksData.map((framework) => (
          <div key={framework.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                framework.pilar === 'Identidade' ? 'bg-purple-100' :
                framework.pilar === 'Influência' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                <framework.icon className={`w-6 h-6 ${
                  framework.pilar === 'Identidade' ? 'text-purple-600' :
                  framework.pilar === 'Influência' ? 'text-blue-600' :
                  'text-green-600'
                }`} />
              </div>
              {framework.status === 'completed' && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{framework.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progresso</span>
                <span className="font-medium">{framework.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    framework.status === 'completed' ? 'bg-green-600' :
                    framework.status === 'in-progress' ? 'bg-blue-600' :
                    'bg-gray-400'
                  }`}
                  style={{ width: `${framework.progress}%` }}
                />
              </div>
            </div>
            
            <button
              disabled={framework.status === 'locked'}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                framework.status === 'locked' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : framework.status === 'completed'
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {framework.status === 'locked' ? 'Bloqueado' :
               framework.status === 'completed' ? 'Revisar' :
               'Continuar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Coaching View
  const CoachingView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Sessões de Coaching</h2>
        <p className="opacity-90">
          Acompanhe suas sessões e progresso com seu coach
        </p>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Sessões</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Strategic Planning Session</h4>
                <p className="text-sm text-gray-600">Com Tami Saito • 05/02/2025 às 14:00</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Sessões</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((session) => (
            <div key={session} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Identity Deep Dive</p>
                  <p className="text-sm text-gray-600">22/01/2025 • 90 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Valuation View
  const ValuationView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Valuation Center</h2>
        <p className="opacity-90">
          Sistema avançado de avaliação de valor de mercado baseado nos 3 pilares Flow
        </p>
      </div>

      {/* Current Valuation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Valor de Mercado Atual</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatCurrency(clientData.marketValue)}
            </div>
            <div className="text-gray-600">
              Crescimento de <span className="text-green-600 font-semibold">+{formatPercentage(clientData.valuationGrowth)}</span> nos últimos 30 dias
            </div>
          </div>

          {/* Valuation Breakdown */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Marca Pessoal</span>
                <span className="font-semibold">{formatCurrency(clientData.marketValue * 0.4)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Rede de Influência</span>
                <span className="font-semibold">{formatCurrency(clientData.marketValue * 0.35)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ativos de Conhecimento</span>
                <span className="font-semibold">{formatCurrency(clientData.marketValue * 0.25)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Market Position */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Posição de Mercado</h3>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {clientData.marketPercentile}º
            </div>
            <div className="text-gray-600">Percentil Nacional</div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Top</span>
              <span className="font-semibold">{100 - clientData.marketPercentile}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Categoria</span>
              <span className="font-semibold">Elite</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Próximo Marco</span>
              <span className="font-semibold">R$ 1M</span>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700">
            Ver Relatório Completo
          </button>
        </div>
      </div>

      {/* Growth Projections */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projeções de Crescimento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(clientData.marketValue * 1.2)}</div>
            <div className="text-sm text-gray-600">3 meses</div>
            <div className="text-sm text-green-600 font-medium">+20%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(clientData.marketValue * 1.5)}</div>
            <div className="text-sm text-gray-600">6 meses</div>
            <div className="text-sm text-green-600 font-medium">+50%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(clientData.marketValue * 2.2)}</div>
            <div className="text-sm text-gray-600">12 meses</div>
            <div className="text-sm text-green-600 font-medium">+120%</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Frameworks View
  const FrameworksView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Flow Frameworks</h2>
        <p className="opacity-90">
          Ferramentas exclusivas para desenvolvimento nos 3 pilares
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworksData.map((framework) => (
          <div 
            key={framework.id} 
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedFramework(framework)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                framework.pilar === 'Identidade' ? 'bg-purple-100' :
                framework.pilar === 'Influência' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                <framework.icon className={`w-6 h-6 ${
                  framework.pilar === 'Identidade' ? 'text-purple-600' :
                  framework.pilar === 'Influência' ? 'text-blue-600' :
                  'text-green-600'
                }`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                framework.status === 'completed' ? 'bg-green-100 text-green-700' :
                framework.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {framework.status === 'completed' ? 'Concluído' :
                 framework.status === 'in-progress' ? 'Em Progresso' :
                 'Bloqueado'}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{framework.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {framework.duration}
              </span>
              <span>{framework.difficulty}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progresso</span>
                <span className="font-medium">{framework.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    framework.pilar === 'Identidade' ? 'bg-purple-600' :
                    framework.pilar === 'Influência' ? 'bg-blue-600' :
                    'bg-green-600'
                  }`}
                  style={{ width: `${framework.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Coach Dashboard View
  const CoachDashboardView = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Dashboard Coach - {coachData.name}</h2>
            <p className="opacity-90 mb-4">
              {coachData.clientsActive} clientes ativos • Receita mensal: {formatCurrency(coachData.monthlyRevenue)} • Rating: {coachData.rating}★
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveView('coach-sessions')}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50"
              >
                Ver Agenda
              </button>
              <button 
                onClick={() => setActiveView('coach-clients')}
                className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10"
              >
                Gerenciar Clientes
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src={coachData.avatar}
              alt={coachData.name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/* Coach Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Clientes Ativos', value: coachData.clientsActive, change: '+3', icon: Users, color: 'purple' },
          { label: 'Receita Mensal', value: formatCurrency(coachData.monthlyRevenue), change: `+${coachData.revenueGrowth}%`, icon: DollarSign, color: 'green' },
          { label: 'Sessões este Mês', value: coachData.sessionsThisMonth, change: '+12', icon: Calendar, color: 'blue' },
          { label: 'Rating Médio', value: `${coachData.rating}★`, change: 'Excelente', icon: Star, color: 'yellow' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                  <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{metric.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Client Performance Overview */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Clientes</h3>
        <div className="space-y-4">
          {coachClients.map(client => (
            <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <img 
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600">{client.profession} • {client.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{client.flowScore}</div>
                  <div className="text-xs text-gray-600">Flow Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{formatCurrency(client.marketValue)}</div>
                  <div className="text-xs text-gray-600">Valor de Mercado</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{client.sessionsCompleted}</div>
                  <div className="text-xs text-gray-600">Sessões</div>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Client Management View (Coach)
  const ClientManagementView = () => (
    <div className="bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Gestão de Clientes</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coachClients.map(client => (
          <div key={client.id} className="border p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img src={client.avatar} className="w-16 h-16 rounded-full" alt={client.name} />
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.profession}</p>
                <p className="text-sm text-gray-500">{client.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-purple-600">{client.flowScore}</div>
                <div className="text-xs text-gray-600">Flow Score</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{formatCurrency(client.marketValue/1000)}K</div>
                <div className="text-xs text-gray-600">Valor</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{client.sessionsCompleted}</div>
                <div className="text-xs text-gray-600">Sessões</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Session Calendar View (Coach)
  const SessionCalendarView = () => {
    const coachSessions = [
      {
        id: 1,
        client: 'João Silva',
        framework: 'Strategic Planning',
        date: '2025-02-05',
        time: '14:00',
        revenue: 2500,
        status: 'Agendada'
      },
      {
        id: 2,
        client: 'Maria Santos',
        framework: 'Influence Mapping',
        date: '2025-02-06',
        time: '10:00',
        revenue: 2500,
        status: 'Agendada'
      }
    ];

    return (
      <div className="bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Agenda de Sessões</h2>
        <div className="space-y-4">
          {coachSessions.map(session => (
            <div key={session.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{session.client}</h3>
                  <p className="text-sm text-gray-600">{session.framework}</p>
                  <p className="text-xs text-gray-500">{session.date} às {session.time}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(session.revenue)}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    session.status === 'Agendada' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {session.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-purple-600">Flow Method™</h1>
              
              {/* Role Switcher */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUserRole('client')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    userRole === 'client' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cliente
                </button>
                <button
                  onClick={() => setUserRole('coach')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    userRole === 'coach' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Coach
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              <button 
                onClick={() => setShowChat(!showChat)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {(userRole === 'client' ? clientNavItems : coachNavItems).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeView === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderView()}
        </main>
      </div>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="fixed top-16 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img 
                src={userRole === 'client' ? clientData.avatar : coachData.avatar}
                alt={userRole === 'client' ? clientData.name : coachData.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {userRole === 'client' ? clientData.name : coachData.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {userRole === 'client' ? clientData.profession : coachData.title}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Configurações
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Ajuda
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg cursor-pointer ${
                    notification.unread ? 'bg-blue-50' : 'bg-gray-50'
                  } hover:bg-gray-100`}
                >
                  <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-lg border border-gray-200 z-40 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Chat</h3>
            <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {chatMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === userRole ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === userRole 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm font-medium mb-1">{message.name}</p>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === userRole ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {showSuccess}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowPlatform;