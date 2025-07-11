import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Clock,
  User,
  CreditCard,
  Settings,
  Target,
  BookOpen,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  Mail,
  Phone,
  Video,
  FileText,
  Users,
  Zap,
  Star,
  Gift,
  Shield,
  Heart,
  Plus,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface JornadaClienteProps {
  progress?: any;
  onUpdate?: (progress: any) => void;
}

interface Project {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'planning' | 'paused';
  progress: number;
  revenue: number;
  targetRevenue: number;
  lastUpdated: string;
  description?: string;
}

const JornadaCliente: React.FC<JornadaClienteProps> = ({ progress, onUpdate }) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState('awareness');
  const [showOptimizationDashboard, setShowOptimizationDashboard] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Flow Method - Jornada Principal',
      status: 'active',
      progress: 75,
      revenue: 100000,
      targetRevenue: 225000,
      lastUpdated: '2025-01-28',
      type: 'Coaching Executivo'
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: '',
    type: 'Coaching Executivo',
    revenue: '',
    targetRevenue: '',
    description: ''
  });

  const journeyPhases = {
    awareness: {
      title: "1. Pré-Venda & Awareness",
      color: "bg-purple-500",
      description: "Cliente descobre o Flow Method"
    },
    consideration: {
      title: "2. Consideração & Interesse", 
      color: "bg-blue-500",
      description: "Avaliação e engajamento inicial"
    },
    conversion: {
      title: "3. Conversão & Pagamento",
      color: "bg-green-500", 
      description: "Decisão de compra e pagamento"
    },
    onboarding: {
      title: "4. Onboarding & Ativação",
      color: "bg-orange-500",
      description: "Integração e primeiros passos"
    },
    engagement: {
      title: "5. Engajamento Inicial",
      color: "bg-red-500",
      description: "Primeiras sessões e resultados"
    }
  };

  const journeyStages = {
    awareness: [
      {
        id: 'landing',
        title: 'Landing Page de Acesso Antecipado',
        icon: Play,
        duration: '2-5 min',
        description: 'Visitante chega na página através de marketing digital',
        touchpoints: ['Website', 'Anúncios', 'Redes Sociais'],
        actions: [
          'Visualiza proposta de valor',
          'Vê countdown timer',
          'Analisa preview das funcionalidades',
          'Lê testimoniais de beta testers'
        ],
        emotions: ['Curiosidade', 'Ceticismo inicial', 'Interesse crescente'],
        barriers: ['Desconfiança', 'Preço', 'Tempo'],
        conversion_rate: '15%'
      },
      {
        id: 'form_submit',
        title: 'Submissão do Formulário VIP',
        icon: User,
        duration: '3-7 min',
        description: 'Preenchimento do formulário de acesso antecipado',
        touchpoints: ['Formulário Web', 'E-mail de confirmação'],
        actions: [
          'Preenche dados pessoais',
          'Seleciona área de atuação', 
          'Confirma interesse',
          'Recebe e-mail de boas-vindas'
        ],
        emotions: ['Expectativa', 'Compromisso inicial'],
        barriers: ['Preguiça de preencher', 'Dúvidas sobre spam'],
        conversion_rate: '12%'
      }
    ],
    consideration: [
      {
        id: 'nurturing',
        title: 'Sequência de E-mails de Nutrição',
        icon: Mail,
        duration: '7-14 dias',
        description: 'Série de conteúdos educativos e social proof',
        touchpoints: ['E-mail', 'WhatsApp', 'SMS'],
        actions: [
          'Recebe conteúdo sobre valuation profissional',
          'Vê casos de sucesso detalhados',
          'Acessa webinar exclusivo',
          'Participa de grupo VIP no WhatsApp'
        ],
        emotions: ['Educação', 'Confiança crescente', 'FOMO'],
        barriers: ['Sobrecarga de informação', 'Competidores'],
        conversion_rate: '32%'
      },
      {
        id: 'consultation',
        title: 'Chamada de Diagnóstico Gratuita',
        icon: Video,
        duration: '45-60 min',
        description: 'Sessão individual para entender necessidades',
        touchpoints: ['Zoom/Meet', 'WhatsApp', 'Calendário'],
        actions: [
          'Agenda chamada pelo Calendly',
          'Participa do Flow Assessment gratuito',
          'Recebe diagnóstico personalizado',
          'Vê demonstração da plataforma'
        ],
        emotions: ['Validação', 'Clareza', 'Urgência'],
        barriers: ['Agenda', 'Compromisso de tempo'],
        conversion_rate: '38%'
      }
    ],
    conversion: [
      {
        id: 'proposal',
        title: 'Proposta Personalizada',
        icon: FileText,
        duration: '24-48h',
        description: 'Apresentação de proposta customizada baseada no diagnóstico',
        touchpoints: ['E-mail', 'PDF', 'Vídeo pessoal'],
        actions: [
          'Recebe proposta por e-mail',
          'Assiste vídeo explicativo personalizado',
          'Analisa plano de desenvolvimento',
          'Compara opções de investimento'
        ],
        emotions: ['Decisão', 'Investimento vs Retorno'],
        barriers: ['Preço', 'Timing', 'Aprovação familiar/empresa'],
        conversion_rate: '45%'
      },
      {
        id: 'payment',
        title: 'Processo de Pagamento',
        icon: CreditCard,
        duration: '5-15 min',
        description: 'Finalização da compra com opções flexíveis',
        touchpoints: ['Checkout Page', 'PIX', 'Cartão', 'Boleto'],
        actions: [
          'Escolhe forma de pagamento',
          'Confirma dados da compra',
          'Recebe confirmação de pagamento',
          'Acessa área de membros'
        ],
        emotions: ['Compromisso', 'Ansiedade', 'Empolgação'],
        barriers: ['Fricção no checkout', 'Dúvidas de última hora'],
        conversion_rate: '82%'
      }
    ],
    onboarding: [
      {
        id: 'welcome',
        title: 'Welcome Sequence Personalizada',
        icon: Gift,
        duration: '1-3 dias',
        description: 'Boas-vindas e primeiros passos na plataforma',
        touchpoints: ['E-mail', 'Dashboard', 'WhatsApp', 'Vídeo'],
        actions: [
          'Acessa dashboard personalizado',
          'Completa perfil inicial',
          'Agenda primeira sessão',
          'Recebe kit de boas-vindas'
        ],
        emotions: ['Empolgação', 'Ansiedade positiva'],
        barriers: ['Overwhelm', 'Complexidade técnica'],
        completion_rate: '92%'
      },
      {
        id: 'first_assessment',
        title: 'Flow Assessment Completo',
        icon: Target,
        duration: '60-90 min',
        description: 'Avaliação profunda dos 3 pilares do Flow Method',
        touchpoints: ['Plataforma', 'Zoom', 'Relatório PDF'],
        actions: [
          'Completa questionário detalhado',
          'Realiza exercícios práticos',
          'Recebe relatório personalizado',
          'Define metas iniciais'
        ],
        emotions: ['Autodescoberta', 'Clareza', 'Motivação'],
        barriers: ['Tempo', 'Vulnerabilidade'],
        completion_rate: '87%'
      }
    ],
    engagement: [
      {
        id: 'first_sessions',
        title: 'Primeiras 4 Sessões',
        icon: Calendar,
        duration: '30 dias',
        description: 'Implementação inicial e primeiros resultados',
        touchpoints: ['Zoom', 'Plataforma', 'WhatsApp', 'E-mail'],
        actions: [
          'Participa de sessões semanais',
          'Implementa tarefas práticas',
          'Compartilha progresso',
          'Ajusta estratégia conforme feedback'
        ],
        emotions: ['Progresso', 'Desafio', 'Realização'],
        barriers: ['Resistência à mudança', 'Agenda'],
        retention_rate: '89%'
      },
      {
        id: 'community',
        title: 'Integração na Comunidade',
        icon: Users,
        duration: 'Contínuo',
        description: 'Participação ativa na comunidade Flow Method',
        touchpoints: ['Grupo WhatsApp', 'Fórum', 'Lives', 'Eventos'],
        actions: [
          'Participa de discussões',
          'Compartilha conquistas',
          'Oferece suporte a outros',
          'Participa de eventos ao vivo'
        ],
        emotions: ['Pertencimento', 'Inspiração', 'Conexão'],
        barriers: ['Timidez', 'Falta de tempo'],
        satisfaction_rate: '94%'
      }
    ]
  };

  const getStagesByPhase = (phase: string) => {
    return journeyStages[phase as keyof typeof journeyStages] || [];
  };

  const StageCard = ({ stage, phaseColor }: any) => (
    <div 
      className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${phaseColor}`}
      onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${phaseColor.replace('bg-', 'bg-').replace('-500', '-100')} mr-4`}>
            <stage.icon className={`w-6 h-6 ${phaseColor.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{stage.title}</h4>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              {stage.duration}
            </div>
          </div>
        </div>
        {selectedStage === stage.id ? 
          <ChevronUp className="w-5 h-5 text-gray-400" /> : 
          <ChevronDown className="w-5 h-5 text-gray-400" />
        }
      </div>

      <p className="text-gray-600 mb-4">{stage.description}</p>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stage.conversion_rate && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Conversão: {stage.conversion_rate}
          </span>
        )}
        {stage.completion_rate && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Conclusão: {stage.completion_rate}
          </span>
        )}
        {stage.retention_rate && (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Retenção: {stage.retention_rate}
          </span>
        )}
        {stage.satisfaction_rate && (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            Satisfação: {stage.satisfaction_rate}
          </span>
        )}
      </div>

      {selectedStage === stage.id && (
        <div className="space-y-4 mt-6 pt-6 border-t">
          {/* Touchpoints */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Touchpoints
            </h5>
            <div className="flex flex-wrap gap-2">
              {stage.touchpoints.map((touchpoint: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {touchpoint}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Ações do Cliente
            </h5>
            <ul className="space-y-1">
              {stage.actions.map((action: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          {/* Emotions */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Emoções
            </h5>
            <div className="flex flex-wrap gap-2">
              {stage.emotions.map((emotion: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-lg text-sm">
                  {emotion}
                </span>
              ))}
            </div>
          </div>

          {/* Barriers */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Barreiras & Objeções
            </h5>
            <div className="flex flex-wrap gap-2">
              {stage.barriers.map((barrier: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                  {barrier}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ProjectManager = () => {
    const addNewProject = (e: React.FormEvent) => {
      e.preventDefault();
      const newProj: Project = {
        id: projects.length + 1,
        name: newProject.name,
        type: newProject.type,
        status: 'planning',
        progress: 0,
        revenue: parseInt(newProject.revenue),
        targetRevenue: parseInt(newProject.targetRevenue),
        lastUpdated: new Date().toISOString().split('T')[0],
        description: newProject.description
      };
      setProjects([...projects, newProj]);
      setNewProject({
        name: '',
        type: 'Coaching Executivo',
        revenue: '',
        targetRevenue: '',
        description: ''
      });
    };

    const updateProjectProgress = (id: number, newProgress: number) => {
      setProjects(projects.map(p => 
        p.id === id ? { ...p, progress: newProgress, lastUpdated: new Date().toISOString().split('T')[0] } : p
      ));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📁 Gerenciador de Projetos</h2>
              <button 
                onClick={() => setShowProjectManager(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Projects List */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projetos Ativos</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' :
                        project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status === 'active' ? 'Ativo' :
                         project.status === 'planning' ? 'Planejamento' : 'Pausado'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mt-3">
                        <span className="text-gray-600">
                          Revenue: R$ {project.revenue.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-gray-600">
                          Meta: R$ {project.targetRevenue.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          Atualizado: {project.lastUpdated}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateProjectProgress(project.id, Math.min(100, project.progress + 10))}
                            className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                          >
                            +10%
                          </button>
                          <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Project Form */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Projeto</h3>
              <form onSubmit={addNewProject} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Projeto
                    </label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Negócio
                    </label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Coaching Executivo">Coaching Executivo</option>
                      <option value="SaaS B2B">SaaS B2B</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Curso Online">Curso Online</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="App Mobile">App Mobile</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revenue Atual (R$)
                    </label>
                    <input
                      type="number"
                      value={newProject.revenue}
                      onChange={(e) => setNewProject({...newProject, revenue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="100000"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta de Revenue (R$)
                    </label>
                    <input
                      type="number"
                      value={newProject.targetRevenue}
                      onChange={(e) => setNewProject({...newProject, targetRevenue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="250000"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição do Projeto
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva os objetivos e características específicas deste projeto..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowProjectManager(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Criar Projeto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.targetRevenue, 0);
  const averageProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Project Manager Modal */}
        {showProjectManager && <ProjectManager />}

        {/* Optimization Dashboard Modal */}
        {showOptimizationDashboard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">🚀 Dashboard de Otimização da Jornada</h2>
                  <button 
                    onClick={() => setShowOptimizationDashboard(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Priority Improvements */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">🚨 Melhorias Críticas (Alto Impacto)</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Conversão Landing Page</h4>
                          <span className="text-red-600 font-bold">2% → 3.4%</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Atual taxa muito baixa. Otimizar headline, prova social e CTA.</p>
                        <div className="bg-red-50 rounded p-3">
                          <p className="text-sm font-medium text-red-800">ROI Estimado: +R$ 45.000/mês</p>
                          <p className="text-xs text-red-600 mt-1">Implementação: 1 semana</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Checkout Abandono</h4>
                          <span className="text-red-600 font-bold">82% → 92%</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">18% abandonam no pagamento. Simplificar processo.</p>
                        <div className="bg-red-50 rounded p-3">
                          <p className="text-sm font-medium text-red-800">ROI Estimado: +R$ 22.000/mês</p>
                          <p className="text-xs text-red-600 mt-1">Implementação: 3 dias</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">⚡ Quick Wins (Implementação Rápida)</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <h4 className="font-medium text-gray-900 mb-2">Exit Intent Popup</h4>
                        <p className="text-sm text-gray-600 mb-2">Recuperar 15% dos abandonos com oferta especial</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">Esforço: 2h</span>
                          <span className="text-xs font-medium text-green-700">+R$ 8.000/mês</span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <h4 className="font-medium text-gray-900 mb-2">Trust Badges no Checkout</h4>
                        <p className="text-sm text-gray-600 mb-2">Aumentar confiança com selos de segurança</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">Esforço: 1h</span>
                          <span className="text-xs font-medium text-green-700">+R$ 5.000/mês</span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <h4 className="font-medium text-gray-900 mb-2">PIX em Destaque</h4>
                        <p className="text-sm text-gray-600 mb-2">Posicionar PIX como opção principal</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">Esforço: 30min</span>
                          <span className="text-xs font-medium text-green-700">+R$ 3.000/mês</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Roadmap */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Roadmap de Implementação (90 dias)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm text-gray-700">Semanas 1-2</div>
                      <div className="flex-1 bg-purple-100 rounded p-3">
                        <p className="text-sm font-medium text-purple-800">Quick Wins + Landing Page</p>
                        <p className="text-xs text-purple-600 mt-1">Exit popup, trust badges, otimização de conversão</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm text-gray-700">Semanas 3-6</div>
                      <div className="flex-1 bg-blue-100 rounded p-3">
                        <p className="text-sm font-medium text-blue-800">A/B Tests Estruturados</p>
                        <p className="text-xs text-blue-600 mt-1">Headlines, CTAs, pricing, garantias</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm text-gray-700">Semanas 7-12</div>
                      <div className="flex-1 bg-green-100 rounded p-3">
                        <p className="text-sm font-medium text-green-800">Features Avançadas</p>
                        <p className="text-xs text-green-600 mt-1">Save & resume, gamification, live chat</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI Calculator */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">💰 Calculadora de ROI</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Revenue Atual</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 100.000/mês</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Revenue Projetado</p>
                      <p className="text-2xl font-bold text-purple-600">R$ 225.000/mês</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">ROI Total</p>
                      <p className="text-2xl font-bold text-green-600">+125% (2,500% ROI)</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Investimento Total (90 dias)</span>
                      <span className="font-medium text-gray-900">R$ 15.000</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">Retorno Esperado (12 meses)</span>
                      <span className="font-medium text-purple-600">R$ 1.500.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🚀 Jornada do Cliente - Flow Method
              </h1>
              <p className="text-gray-600">
                Mapeamento completo da experiência do cliente desde a descoberta até o engajamento
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Revenue Total</p>
              <p className="text-2xl font-bold text-purple-600">
                R$ {totalRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Meta: R$ {totalTarget.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button 
              onClick={() => setShowProjectManager(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Projeto
            </button>
            <button 
              onClick={() => setShowOptimizationDashboard(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Implementar Melhorias
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Analisar Dados
            </button>
          </div>
        </div>

        {/* Journey Phase Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {Object.entries(journeyPhases).map(([key, phase]) => (
            <button
              key={key}
              onClick={() => setCurrentPhase(key)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentPhase === key
                  ? `${phase.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-medium">{phase.title}</div>
                <div className="text-xs opacity-75 mt-1">{phase.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Journey Stages */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {journeyPhases[currentPhase as keyof typeof journeyPhases].title}
            </h2>
            <p className="text-gray-600">{journeyPhases[currentPhase as keyof typeof journeyPhases].description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {getStagesByPhase(currentPhase).map((stage) => (
              <StageCard 
                key={stage.id} 
                stage={stage} 
                phaseColor={journeyPhases[currentPhase as keyof typeof journeyPhases].color}
              />
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 Métricas da Jornada (Baseadas em Dados Reais)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1.6%</div>
              <div className="text-sm text-gray-500">Conversão Landing → Compra</div>
              <div className="text-xs text-gray-400 mt-1">Mercado: 0.5-3%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">78%</div>
              <div className="text-sm text-gray-500">Conclusão Flow Assessment</div>
              <div className="text-xs text-gray-400 mt-1">Benchmark: 65%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-500">Retenção 90 dias</div>
              <div className="text-xs text-gray-400 mt-1">Mercado: 70%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">R$ 12.5K</div>
              <div className="text-sm text-gray-500">Ticket Médio</div>
              <div className="text-xs text-gray-400 mt-1">LTV: R$ 45K</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JornadaCliente;