import React from 'react';
import { Download, Landmark, Search, BarChart3, Scale, ShieldCheck, HelpCircle, Network } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'vereadores' | 'grafo' | 'comparador' | 'analise' | 'metodologia';
  onSelectTab: (tab: 'dashboard' | 'vereadores' | 'grafo' | 'comparador' | 'analise' | 'metodologia') => void;
  onOpenExport: () => void;
  onOpenAudit: () => void;
  onOpenSync: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenExport,
  onOpenAudit,
  onOpenSync,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              CMM
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Transparência Manaus
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentTab === 'dashboard'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => onSelectTab('vereadores')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentTab === 'vereadores'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              41 Vereadores
            </button>
            <button
              onClick={() => onSelectTab('grafo')}
              className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
                currentTab === 'grafo'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Grafo de Vínculos</span>
            </button>
            <button
              onClick={() => onSelectTab('comparador')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentTab === 'comparador'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Comparador
            </button>
            <button
              onClick={() => onSelectTab('analise')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentTab === 'analise'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Gastos & Fornecedores
            </button>
            <button
              onClick={() => onSelectTab('metodologia')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentTab === 'metodologia'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Metodologia & CEAP
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSync}
              title="Verificar ciclo de atualização e status oficial da CMM"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Atualização CMM</span>
            </button>
            <button
              onClick={onOpenAudit}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Auditoria Fiscal</span>
            </button>
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Dados</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav sub-bar */}
      <div className="md:hidden flex items-center gap-4 px-4 py-2 border-t border-slate-100 overflow-x-auto text-xs font-medium text-slate-600 bg-slate-50">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'dashboard' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => onSelectTab('vereadores')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'vereadores' ? 'text-emerald-700 font-bold' : ''}`}
        >
          41 Vereadores
        </button>
        <button
          onClick={() => onSelectTab('grafo')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'grafo' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Grafo de Vínculos
        </button>
        <button
          onClick={() => onSelectTab('comparador')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'comparador' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Comparador
        </button>
        <button
          onClick={() => onSelectTab('analise')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'analise' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Fornecedores
        </button>
        <button
          onClick={() => onSelectTab('metodologia')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'metodologia' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Regras CEAP
        </button>
      </div>
    </header>
  );
};
