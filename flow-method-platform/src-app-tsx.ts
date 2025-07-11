import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Target, Route as RouteIcon, BarChart3, Users, Menu, X } from 'lucide-react';

// Import components
import ValuationAssessment from './components/ValuationAssessment';
import JornadaCliente from './components/JornadaCliente';
import FlowPlatform from './components/FlowPlatform';
import FlowAnalyzer from './components/FlowAnalyzer';

interface AppState {
  user: any;
  assessmentData: any;
  journeyProgress: any;
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/assessment', label: 'Assessment', icon: Target },
    { path: '/jornada', label: 'Jornada', icon: RouteIcon },
    { path: '/platform', label: 'Platform', icon: Users },
    { path: '/analyzer', label: 'Analyzer', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-600">Flow Method™</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${isActive 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Flow Method™ Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Sistema integrado de avaliação e desenvolvimento baseado nos 3 pilares fundamentais: 
          Identidade, Influência e Legado
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Link to="/assessment" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <Target className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Valuation Assessment</h3>
            <p className="text-gray-600 text-sm">
              Avalie seu valor de mercado baseado nos 3 pilares do Flow Method
            </p>
          </div>
        </Link>

        <Link to="/jornada" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <RouteIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Jornada do Cliente</h3>
            <p className="text-gray-600 text-sm">
              Otimize cada etapa da jornada do cliente para maximizar conversões
            </p>
          </div>
        </Link>

        <Link to="/platform" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Completa</h3>
            <p className="text-gray-600 text-sm">
              Gerencie clientes, sessões e acompanhe o progresso em tempo real
            </p>
          </div>
        </Link>

        <Link to="/analyzer" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flow Analyzer</h3>
            <p className="text-gray-600 text-sm">
              Análise profunda e geração de relatórios personalizados
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sobre o Flow Method™
        </h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            O Flow Method™ é uma metodologia inovadora desenvolvida por Tami Saito para 
            construção de marca pessoal de autoridade. Baseado em três pilares fundamentais - 
            Identidade, Influência e Legado - o método oferece um caminho estruturado para 
            profissionais que desejam se posicionar como referência em suas áreas.
          </p>
          <p>
            Esta plataforma integra todas as ferramentas necessárias para aplicar o Flow Method™ 
            de forma sistemática, desde a avaliação inicial até o acompanhamento contínuo do 
            desenvolvimento, proporcionando insights acionáveis e resultados mensuráveis.
          </p>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-600 text-sm">
        <p>© 2025 Flow Method™ - Desenvolvido por Tami Saito. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
);

function App() {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    assessmentData: null,
    journeyProgress: {}
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/assessment" element={
            <ValuationAssessment 
              onComplete={(data) => setAppState({...appState, assessmentData: data})}
            />
          } />
          
          <Route path="/jornada" element={
            <JornadaCliente 
              progress={appState.journeyProgress}
              onUpdate={(progress) => setAppState({...appState, journeyProgress: progress})}
            />
          } />
          
          <Route path="/platform" element={
            <FlowPlatform 
              userData={appState.user}
              assessmentData={appState.assessmentData}
            />
          } />
          
          <Route path="/analyzer" element={
            <FlowAnalyzer 
              clientData={appState.assessmentData}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;