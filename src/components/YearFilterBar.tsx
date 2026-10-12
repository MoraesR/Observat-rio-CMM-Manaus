import React from 'react';
import { Calendar, AlertCircle, Info, ShieldAlert, CheckCircle2, TrendingUp, Clock, Scale } from 'lucide-react';
import { EstatisticasGlobaisCMM } from '../types';

interface YearFilterBarProps {
  selectedYear: '2025' | '2024' | '2023';
  onSelectYear: (year: '2025' | '2024' | '2023') => void;
  stats: EstatisticasGlobaisCMM;
}

export const YearFilterBar: React.FC<YearFilterBarProps> = ({
  selectedYear,
  onSelectYear,
  stats,
}) => {
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4 mb-6">
      
      {/* Top Flex: Segmented Selector + Context Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Label and Year Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Exercício Fiscal & Controle de Auditoria</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-medium text-slate-500">
              Segregação Obrigatória para Análise de Contas
            </span>
          </div>

          {/* Segmented Buttons for Years */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1">
            
            {/* 2025 - Vigente */}
            <button
              onClick={() => onSelectYear('2025')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedYear === '2025'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedYear === '2025' ? 'bg-emerald-300 animate-pulse' : 'bg-emerald-500'}`} />
              <span>Ano Vigente (2025)</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedYear === '2025' ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
              }`}>
                19ª Leg. · 41 Gabinetes
              </span>
            </button>

            {/* 2024 - Anterior / Eleitoral */}
            <button
              onClick={() => onSelectYear('2024')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedYear === '2024'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Ano Anterior (2024)</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedYear === '2024' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                18ª Leg. · 27 Reeleitos
              </span>
            </button>

            {/* 2023 - Histórico */}
            <button
              onClick={() => onSelectYear('2023')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedYear === '2023'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Histórico (2023)</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedYear === '2023' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                18ª Leg. Consolidada
              </span>
            </button>

          </div>
        </div>

        {/* Right: Year Snapshot Metrics */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs shrink-0">
          <div>
            <span className="text-[10px] font-medium uppercase text-slate-400 block">CEAP Liquidada no Exercício</span>
            <strong className="font-mono text-sm text-slate-900">{formatBRL(stats.totalGastoCeapAno)}</strong>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-[10px] font-medium uppercase text-slate-400 block">Devolução ao Erário</span>
            <strong className="font-mono text-sm text-emerald-700">{formatBRL(stats.economiaDevolvidaTotal)}</strong>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-[10px] font-medium uppercase text-slate-400 block">Gabinetes com Mandato</span>
            <strong className="font-mono text-sm text-slate-800">
              {stats.totalVereadoresComMandato ?? 41} de 41
            </strong>
          </div>
        </div>

      </div>

      {/* Explanatory Audit Banner to prevent confusing previous years with the current year */}
      {selectedYear === '2025' ? (
        <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-emerald-900">Auditoria do Ano Vigente (19ª Legislatura - 2025–2028):</strong>{' '}
            Você está auditando as contas do exercício atual. Todos os <strong>41 vereadores</strong> eleitos em Manaus estão empossados e possuem teto mensal de CEAP de R$ 33.086,88, com 10 meses apurados na plataforma.
          </div>
        </div>
      ) : selectedYear === '2024' ? (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-amber-900">Atenção Crítica de Auditoria (Exercício Anterior - 2024):</strong>{' '}
            Em 2024 (ano eleitoral municipal), apenas os <strong>27 vereadores reeleitos</strong> exerciam mandato na CMM e geraram despesas públicas. Os <strong>14 vereadores novatos de 1º mandato</strong> foram eleitos em outubro de 2024 e <em>não tinham gabinete nem cota parlamentar na CMM neste exercício</em>. Seus valores são devidamente segregados como R$ 0,00 para não distorcer a análise de auditoria fiscal.
          </div>
        </div>
      ) : (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2.5 text-xs text-blue-950">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-blue-900">Exercício Histórico Consolidado (2023 - 18ª Legislatura):</strong>{' '}
            Dados anuais consolidados da legislatura anterior para auditoria de longo prazo e verificação de reincidência de contratação de fornecedores (locadoras de veículos e postos) pelos vereadores reeleitos.
          </div>
        </div>
      )}

    </div>
  );
};
