import React from 'react';
import { EstatisticasGlobaisCMM } from '../types';
import { Landmark, Users, Receipt, TrendingUp, PiggyBank, FileText, ArrowUpRight, Network, ChevronRight } from 'lucide-react';

interface OverviewStatsProps {
  stats: EstatisticasGlobaisCMM;
  onExploreCouncilors: () => void;
  onExploreSuppliers: () => void;
  onExploreGraph?: () => void;
  onOpenSync?: () => void;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({
  stats,
  onExploreCouncilors,
  onExploreSuppliers,
  onExploreGraph,
  onOpenSync,
}) => {
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Civic transparency context */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Câmara Municipal de Manaus</span>
            <span aria-hidden="true">·</span>
            <span>19ª Legislatura (2025–2028)</span>
            <span aria-hidden="true">·</span>
            <span>Exercício Apurado 2025</span>
            {onOpenSync && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onOpenSync}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Ciclo de Atualização Mensal
                </button>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
            Observatório Econômico dos Gabinetes Parlamentares
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Painel cívico independente para acompanhamento detalhado da Cota para o Exercício da Atividade Parlamentar (CEAP), despesas de gabinete, quadro de assessores comissionados e emendas impositivas dos 41 vereadores de Manaus.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>Teto CEAP Mensal por Gabinete: <strong className="font-mono tabular-nums text-slate-800">R$ 33.086,88</strong></span>
            <span aria-hidden="true">·</span>
            <span>Subsídio Parlamentar: <strong className="font-mono tabular-nums text-slate-800">R$ 24.754,79</strong></span>
            <span aria-hidden="true">·</span>
            <span>Limite de Assessores: <strong className="font-mono tabular-nums text-slate-800">25 por gabinete</strong></span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (6 metrics, tabular-nums) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Liquidado em CEAP (Cotão)</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-md">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {formatBRL(stats.totalGastoCeapAno)}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>Teto global: <span className="font-mono tabular-nums">{formatBRL(stats.tetoDisponivelCeapAno)}</span></span>
            <span className="font-semibold text-emerald-700 font-mono tabular-nums">{stats.percentualMedioUtilizacaoCeap}% utilizado</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Economia Devolvida ao Erário</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-md">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-blue-700">
            {formatBRL(stats.economiaDevolvidaTotal)}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Cota autorizada e não liquidada pelos 41 gabinetes no exercício.
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Folha Mensal de Assessores (CMM)</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-md">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {formatBRL(stats.totalFolhaAssessoresMes)}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>{stats.totalAssessoresNomeados} cargos comissionados ativos</span>
            <span className="font-mono tabular-nums text-slate-700">Média ~21 / gabinete</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Emendas Impositivas Destinadas</span>
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-md">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {formatBRL(stats.totalEmendasCadastradas)}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>Executado: <span className="font-mono tabular-nums">{formatBRL(stats.totalEmendasExecutadas)}</span></span>
            <span className="font-mono tabular-nums text-indigo-700 font-semibold">
              {Math.round((stats.totalEmendasExecutadas / stats.totalEmendasCadastradas) * 100)}% pago
            </span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Média de Gasto Mensal / Gabinete</span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-md">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {formatBRL(stats.totalGastoCeapAno / (stats.totalVereadores * 10))}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Teto máximo autorizado: <span className="font-mono tabular-nums font-semibold">R$ 33.086,88</span>/mês.
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Notas Fiscais Auditadas</span>
            <div className="p-2 bg-slate-100 text-slate-700 rounded-md">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900">
            {stats.totalNotasFiscaisAuditadas} notas
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Documentos fiscais validados no Portal da Transparência da CMM.
          </div>
        </div>
      </div>

      {/* Relational Network Graph Feature Banner */}
      {onExploreGraph && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-slate-700">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 bg-emerald-600 rounded-xl text-white shrink-0 shadow-xs">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Grafo de Conexões: Fornecedores, Gabinetes e Assessores
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono font-semibold">
                  Novo
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Visualize em formato de rede relacional quais locadoras de veículos e postos de combustíveis atendem múltiplos vereadores, e veja a qual parlamentar cada assessor de gabinete está vinculado.
              </p>
            </div>
          </div>

          <button
            onClick={onExploreGraph}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start md:self-center shrink-0 shadow-xs"
          >
            <span>Abrir Grafo Interativo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Breakdown Section: Top Spending Categories & Party Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Categories Bar Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Destinação da CEAP por Rubrica</h2>
              <p className="text-xs text-slate-500 mt-0.5">Onde os vereadores de Manaus mais investem a cota pública</p>
            </div>
            <button
              onClick={onExploreSuppliers}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Ver Fornecedores
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {stats.distribuicaoPorCategoria.map((cat) => (
              <div key={cat.categoria} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{cat.categoria}</span>
                  <div className="flex items-center gap-2 font-mono tabular-nums">
                    <span className="text-slate-900 font-semibold">{formatBRL(cat.total)}</span>
                    <span className="text-slate-500">({cat.percentual}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${cat.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Party Bancadas Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Gastos Acumulados por Bancada Partidária</h2>
              <p className="text-xs text-slate-500 mt-0.5">Consumo total e média por parlamentar em cada partido</p>
            </div>
            <button
              onClick={onExploreCouncilors}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Ver Vereadores
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-2 font-medium">Partido</th>
                  <th className="pb-2 font-medium text-center">Bancada</th>
                  <th className="pb-2 font-medium text-right">Total Liquidado</th>
                  <th className="pb-2 font-medium text-right">Média / Vereador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.partidosMaioresGastos.slice(0, 6).map((p) => (
                  <tr key={p.partido} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 font-bold text-slate-900">{p.partido}</td>
                    <td className="py-2.5 text-center font-mono tabular-nums text-slate-600">
                      {p.bancadaTamanho} {p.bancadaTamanho === 1 ? 'cadeira' : 'cadeiras'}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {formatBRL(p.totalGasto)}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">
                      {formatBRL(p.mediaPorVereador)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
