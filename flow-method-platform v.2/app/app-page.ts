'use client';

import React, { useState } from 'react';
import FlowAssessment from '@/components/FlowAssessment';
import FlowDevelopmentPlanGenerator from '@/components/FlowDevelopmentPlanGenerator';
import { Play, Target, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const [currentView, setCurrentView] = useState('landing');
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentView('results');
  };

  const handleGeneratePlan = () => {
    setCurrentView('plan');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setAssessmentResults(null);
  };

  if (currentView === 'assessment') {
    return (
      <FlowAssessment 
        onComplete={handleAssessmentComplete}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentView === 'plan' && assessmentResults) {
    return (
      <FlowDevelopmentPlanGenerator 
        results={assessmentResults}
        onBack={() => setCurrentView('results')}
      />
    );
  }

  if (currentView === 'results' && assessmentResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-900 mb-4">
                Seus Resultados Flow Method™
              </h1>
              <p className="text-xl text-gray-600">
                Análise completa do seu valor intangível
              </p>
            </div>

            {/* Results Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {Math.round(assessmentResults.overallScore * 100)}%
                  </div>
                  <div className="text-gray-600">Score Geral</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-2">
                    {assessmentResults.maturityLevel}
                  </div>
                  <div className="text-gray-600">Nível de Maturidade</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600 mb-2">
                    {Object.entries(assessmentResults.pillarScores)
                      .reduce((a, b) => assessmentResults.pillarScores[a[0]] < assessmentResults.pillarScores[b[0]] ? b : a)[0]
                      .charAt(0).toUpperCase() + Object.entries(assessmentResults.pillarScores)
                      .reduce((a, b) => assessmentResults.pillarScores[a[0]] < assessmentResults.pillarScores[b[0]] ? b : a)[0]
                      .slice(1)}
                  </div>
                  <div className="text-gray-600">Pilar Mais Forte</div>
                </div>
              </div>
            </div>

            {/* Pillar Scores */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {Object.entries(assessmentResults.pillarScores).map(([pillar, score]) => (
                <div key={pillar} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {pillar === 'identidade' && <Target className="w-6 h-6 text-purple-600 mr-2" />}
                    {pillar === 'influencia' && <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />}
                    {pillar === 'legado' && <Users className="w-6 h-6 text-purple-600 mr-2" />}
                    <h3 className="text-lg font-semibold capitalize">{pillar}</h3>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {Math.round(score * 100)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={handleGeneratePlan}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3"
              >
                <Target className="w-5 h-5" />
                Gerar Plano de Desenvolvimento
              </button>
              <button
                onClick={() => window.open('https://calendly.com/flow-method', '_blank')}
                className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5" />
                Agendar Sessão
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-gray-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                Nova Avaliação
              </button>
            </div>

            <div className="text-center text-gray-600 text-sm">
              <p>© 2025 Flow Method™ - Desenvolvido por Tami Saito</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-purple-900 mb-6">
              Flow Method™
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra, desenvolva e maximize seu valor intangível através de uma metodologia 
              científica baseada nos pilares de Identidade, Influência e Legado.
            </p>
            <button
              onClick={handleStartAssessment}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl py-4 px-8 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Iniciar Avaliação
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Identidade</h3>
              <p className="text-gray-600">
                Clareza de propósito, valores e talentos únicos que definem quem você é.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Influência</h3>
              <p className="text-gray-600">
                Capacidade de impactar e inspirar outros através de sua presença e ações.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Legado</h3>
              <p className="text-gray-600">
                Impacto duradouro que transcende sua presença física e beneficia gerações futuras.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white p-8">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para descobrir seu valor único?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              A avaliação Flow Method™ leva apenas 15 minutos e fornece insights personalizados 
              para acelerar seu desenvolvimento.
            </p>
            <button
              onClick={handleStartAssessment}
              className="bg-white text-purple-600 py-3 px-8 rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Começar Agora
            </button>
          </div>

          <div className="mt-16 text-center text-gray-600 text-sm">
            <p>© 2025 Flow Method™ - Desenvolvido por Tami Saito</p>
          </div>
        </div>
      </div>
    </div>
  );
}