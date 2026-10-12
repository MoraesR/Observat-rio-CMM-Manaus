import React, { useState, useMemo } from 'react';
import { Vereador } from '../types';
import { CouncilorCard } from './CouncilorCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Scale } from 'lucide-react';

interface CouncilorGridProps {
  vereadores: Vereador[];
  onSelectCouncilor: (vereador: Vereador) => void;
  comparedIds: string[];
  onToggleCompare: (vereador: Vereador) => void;
  onOpenCompareView: () => void;
}

type FilterStatus = 'todos' | 'mais_gastaram' | 'mais_economicos' | 'reeleitos' | 'novos';
type SortOption = 'votos' | 'maior_gasto' | 'menor_gasto' | 'assessores' | 'nome';

export const CouncilorGrid: React.FC<CouncilorGridProps> = ({
  vereadores,
  onSelectCouncilor,
  comparedIds,
  onToggleCompare,
  onOpenCompareView,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState<string>('todos');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('todos');
  const [sortOption, setSortOption] = useState<SortOption>('votos');

  // List of unique parties
  const parties = useMemo(() => {
    const set = new Set(vereadores.map(v => v.partido));
    return ['todos', ...Array.from(set).sort()];
  }, [vereadores]);

  // Filtered and sorted list
  const filteredVereadores = useMemo(() => {
    return vereadores.filter((v) => {
      // Search text match
      const search = searchTerm.toLowerCase();
      const matchSearch =
        v.nomeParlamentar.toLowerCase().includes(search) ||
        v.nomeCompleto.toLowerCase().includes(search) ||
        v.partido.toLowerCase().includes(search) ||
        v.gabinete.numeroSala.toLowerCase().includes(search) ||
        v.comissoes.some(c => c.toLowerCase().includes(search));

      if (!matchSearch) return false;

      // Party match
      if (selectedParty !== 'todos' && v.partido !== selectedParty) {
        return false;
      }

      // Filter category
      if (activeFilter === 'mais_gastaram') {
        return v.dadosEconomicos.ceapUtilizacaoPct >= 90;
      }
      if (activeFilter === 'mais_economicos') {
        return v.dadosEconomicos.ceapUtilizacaoPct < 80;
      }
      if (activeFilter === 'reeleitos') {
        return v.situacao === 'Reeleito';
      }
      if (activeFilter === 'novos') {
        return v.situacao === '1º Mandato';
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'votos') {
        return b.votos - a.votos;
      }
      if (sortOption === 'maior_gasto') {
        return b.dadosEconomicos.ceapGastoTotalAno - a.dadosEconomicos.ceapGastoTotalAno;
      }
      if (sortOption === 'menor_gasto') {
        return a.dadosEconomicos.ceapGastoTotalAno - b.dadosEconomicos.ceapGastoTotalAno;
      }
      if (sortOption === 'assessores') {
        return b.gabinete.totalAssessoresAtivos - a.gabinete.totalAssessoresAtivos;
      }
      if (sortOption === 'nome') {
        return a.nomeParlamentar.localeCompare(b.nomeParlamentar);
      }
      return 0;
    });
  }, [vereadores, searchTerm, selectedParty, activeFilter, sortOption]);

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome do vereador, partido, sala ou comissão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Party Selector */}
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="todos">Todos os Partidos ({parties.length - 1})</option>
              {parties.filter(p => p !== 'todos').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="votos">Mais Votados (Eleição 2024)</option>
                <option value="maior_gasto">Maior Gasto em CEAP</option>
                <option value="menor_gasto">Mais Econômicos (Menor CEAP)</option>
                <option value="assessores">Mais Assessores no Gabinete</option>
                <option value="nome">Ordem Alfabética</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveFilter('todos')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'todos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (41)
            </button>
            <button
              onClick={() => setActiveFilter('mais_gastaram')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'mais_gastaram'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teto Máximo (&gt;90%)
            </button>
            <button
              onClick={() => setActiveFilter('mais_economicos')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'mais_economicos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mais Econômicos (&lt;80%)
            </button>
            <button
              onClick={() => setActiveFilter('reeleitos')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'reeleitos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reeleitos (28)
            </button>
            <button
              onClick={() => setActiveFilter('novos')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'novos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1º Mandato (13)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Exibindo <strong className="text-slate-800">{filteredVereadores.length}</strong> de 41 vereadores</span>
            {comparedIds.length > 0 && (
              <button
                onClick={onOpenCompareView}
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-md font-semibold hover:bg-emerald-800 transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparar ({comparedIds.length})</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Grid of Councilor Cards */}
      {filteredVereadores.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-base font-semibold text-slate-800">Nenhum vereador encontrado</p>
          <p className="text-xs text-slate-500 mt-1">Tente remover os filtros ou buscar por outro termo.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedParty('todos');
              setActiveFilter('todos');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVereadores.map((vereador) => (
            <CouncilorCard
              key={vereador.id}
              vereador={vereador}
              onSelect={onSelectCouncilor}
              onToggleCompare={onToggleCompare}
              isCompared={comparedIds.includes(vereador.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
};
