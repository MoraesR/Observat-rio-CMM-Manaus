import React, { useState } from 'react';
import { VEREADORES, getEstatisticasGlobais, getVereadoresNoExercicio } from './data/vereadores';
import { Vereador } from './types';
import { Navbar } from './components/Navbar';
import { YearFilterBar } from './components/YearFilterBar';
import { OverviewStats } from './components/OverviewStats';
import { CouncilorGrid } from './components/CouncilorGrid';
import { CouncilorModal } from './components/CouncilorModal';
import { ComparisonTool } from './components/ComparisonTool';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { MethodologyView } from './components/MethodologyView';
import { AiAuditModal } from './components/AiAuditModal';
import { ExportModal } from './components/ExportModal';
import { SyncStatusModal } from './components/SyncStatusModal';
import { NetworkGraphView } from './components/NetworkGraphView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'vereadores' | 'grafo' | 'comparador' | 'analise' | 'metodologia'>('dashboard');
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023'>('2025');
  const [selectedCouncilor, setSelectedCouncilor] = useState<Vereador | null>(null);
  const [comparedIds, setComparedIds] = useState<string[]>(['sargento-salazar', 'ze-ricardo']);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Hoje, às 14:30');

  // Compute active councilors profile and global stats for the chosen fiscal year
  const activeVereadores = React.useMemo(() => getVereadoresNoExercicio(selectedYear), [selectedYear]);
  const stats = React.useMemo(() => getEstatisticasGlobais(selectedYear), [selectedYear]);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setLastSyncTime(`Hoje, às ${hours}:${minutes}`);
      setIsRefreshing(false);
    }, 1200);
  };

  const handleToggleCompare = (vereador: Vereador) => {
    setComparedIds(prev => {
      if (prev.includes(vereador.id)) {
        return prev.filter(id => id !== vereador.id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), vereador.id];
        }
        return [...prev, vereador.id];
      }
    });
  };

  const handleClearComparison = () => {
    setComparedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      
      {/* Strict Top Bar Contract Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenSync={() => setIsSyncModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Prominent Fiscal Year Selector & Audit Separation Bar */}
        {currentTab !== 'metodologia' && (
          <YearFilterBar
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
            stats={stats}
          />
        )}

        {currentTab === 'dashboard' && (
          <OverviewStats
            stats={stats}
            onExploreCouncilors={() => setCurrentTab('vereadores')}
            onExploreSuppliers={() => setCurrentTab('analise')}
            onExploreGraph={() => setCurrentTab('grafo')}
            onOpenSync={() => setIsSyncModalOpen(true)}
          />
        )}

        {currentTab === 'vereadores' && (
          <CouncilorGrid
            vereadores={activeVereadores}
            onSelectCouncilor={(v) => setSelectedCouncilor(v)}
            comparedIds={comparedIds}
            onToggleCompare={handleToggleCompare}
            onOpenCompareView={() => setCurrentTab('comparador')}
          />
        )}

        {currentTab === 'grafo' && (
          <NetworkGraphView
            vereadores={activeVereadores}
            onSelectCouncilor={(v) => setSelectedCouncilor(v)}
          />
        )}

        {currentTab === 'comparador' && (
          <ComparisonTool
            allVereadores={activeVereadores}
            comparedIds={comparedIds}
            onToggleCompare={handleToggleCompare}
            onClearComparison={handleClearComparison}
            onSelectCouncilor={(v) => setSelectedCouncilor(v)}
          />
        )}

        {currentTab === 'analise' && (
          <AnalyticsCharts
            stats={stats}
            vereadores={activeVereadores}
            onSelectCouncilor={(v) => setSelectedCouncilor(v)}
          />
        )}

        {currentTab === 'metodologia' && (
          <MethodologyView />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">CMM Transparência Manaus</span>
            <span aria-hidden="true">·</span>
            <span>19ª Legislatura (2025–2028)</span>
            <span aria-hidden="true">·</span>
            <span>Dados da Câmara Municipal de Manaus</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentTab('grafo')}
              className="hover:text-slate-800 transition-colors"
            >
              Grafo de Vínculos
            </button>
            <button
              onClick={() => setCurrentTab('metodologia')}
              className="hover:text-slate-800 transition-colors"
            >
              Regulamentação da CEAP
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-800 transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={() => setIsAuditOpen(true)}
              className="hover:text-slate-800 transition-colors"
            >
              Auditoria Cívica
            </button>
          </div>
        </div>
      </footer>

      {/* Councilor Deep-Dive Dossier Modal */}
      {selectedCouncilor && (
        <CouncilorModal
          vereador={selectedCouncilor}
          onClose={() => setSelectedCouncilor(null)}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedIds.includes(selectedCouncilor.id)}
        />
      )}

      {/* AI Fiscal Audit Modal */}
      {isAuditOpen && (
        <AiAuditModal
          vereadores={activeVereadores}
          onClose={() => setIsAuditOpen(false)}
          onSelectCouncilor={(v) => setSelectedCouncilor(v)}
        />
      )}

      {/* Export Modal */}
      {isExportOpen && (
        <ExportModal
          vereadores={activeVereadores}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Sync Status & Update Cycle Modal */}
      {isSyncModalOpen && (
        <SyncStatusModal
          onClose={() => setIsSyncModalOpen(false)}
          onRefreshData={handleRefreshData}
          isRefreshing={isRefreshing}
          lastSyncTime={lastSyncTime}
        />
      )}

    </div>
  );
}
