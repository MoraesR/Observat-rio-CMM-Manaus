import React, { useState } from 'react';
import { Vereador, EstatisticasGlobaisCMM } from '../types';
import { Building2, Search, ArrowUpRight, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';

interface AnalyticsChartsProps {
  stats: EstatisticasGlobaisCMM;
  vereadores: Vereador[];
  onSelectCouncilor: (vereador: Vereador) => void;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  stats,
  vereadores,
  onSelectCouncilor,
}) => {
  const [supplierSearch, setSupplierSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('todos');

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Aggregate all suppliers across all councilors
  const allSuppliers = React.useMemo(() => {
    const map = new Map<string, {
      cnpj: string;
      razaoSocial: string;
      nomeFantasia: string;
      servico: string;
      totalFaturado: number;
      quantidadeGabinetes: number;
      cidade: string;
      gabinetesAtendidos: string[];
    }>();

    vereadores.forEach(v => {
      v.dadosEconomicos.principaisFornecedores.forEach(forn => {
        const existing = map.get(forn.cnpj);
        if (existing) {
          existing.totalFaturado += forn.totalRecebido;
          if (!existing.gabinetesAtendidos.includes(v.nomeParlamentar)) {
            existing.gabinetesAtendidos.push(v.nomeParlamentar);
            existing.quantidadeGabinetes += 1;
          }
        } else {
          map.set(forn.cnpj, {
            cnpj: forn.cnpj,
            razaoSocial: forn.razaoSocial,
            nomeFantasia: forn.nomeFantasia,
            servico: forn.servico,
            totalFaturado: forn.totalRecebido,
            quantidadeGabinetes: 1,
            cidade: forn.cidade,
            gabinetesAtendidos: [v.nomeParlamentar]
          });
        }
      });
    });

    return Array.from(map.values()).sort((a, b) => b.totalFaturado - a.totalFaturado);
  }, [vereadores]);

  const filteredSuppliers = allSuppliers.filter(s =>
    s.nomeFantasia.toLowerCase().includes(supplierSearch.toLowerCase()) ||
    s.razaoSocial.toLowerCase().includes(supplierSearch.toLowerCase()) ||
    s.cnpj.includes(supplierSearch) ||
    s.servico.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  // Neighborhoods distribution for parliamentary amendments
  const bairrosManausEmendas = React.useMemo(() => {
    const map: Record<string, { total: number; quantidade: number }> = {};
    vereadores.forEach(v => {
      v.dadosEconomicos.emendas.forEach(e => {
        if (!map[e.bairroOuRegiao]) {
          map[e.bairroOuRegiao] = { total: 0, quantidade: 0 };
        }
        map[e.bairroOuRegiao].total += e.valorProposto;
        map[e.bairroOuRegiao].quantidade += 1;
      });
    });

    return Object.entries(map)
      .map(([bairro, data]) => ({ bairro, total: data.total, quantidade: data.quantidade }))
      .sort((a, b) => b.total - a.total);
  }, [vereadores]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <span>Inteligência de Mercado Público</span>
          <span aria-hidden="true">·</span>
          <span>Câmara Municipal de Manaus</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Concentração de Fornecedores & Destinação em Manaus
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Mapeamento das empresas que mais faturam prestando serviços aos 41 gabinetes e a geografia de recursos de emendas impositivas pelos bairros da capital.
        </p>
      </div>

      {/* Grid: Top Suppliers + Neighborhoods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Suppliers Ranking */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Maiores Contratos da CEAP</h3>
              <p className="text-xs text-slate-500 mt-0.5">Empresas com maior faturamento consolidado na CMM</p>
            </div>
            <span className="text-xs font-mono text-slate-500 font-medium">Top 5 Empresas</span>
          </div>

          <div className="space-y-3.5">
            {allSuppliers.slice(0, 5).map((sup, idx) => {
              const maxFaturado = allSuppliers[0].totalFaturado;
              const pctBar = Math.round((sup.totalFaturado / maxFaturado) * 100);
              return (
                <div key={sup.cnpj} className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {idx + 1}. {sup.nomeFantasia}
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono">{sup.cnpj}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono tabular-nums font-bold text-sm text-slate-900">
                        {formatBRL(sup.totalFaturado)}
                      </span>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {sup.quantidadeGabinetes} {sup.quantidadeGabinetes === 1 ? 'gabinete' : 'gabinetes'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${pctBar}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{sup.servico}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neighborhoods Distribution for Amendments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Emendas por Bairro de Manaus</h3>
              <p className="text-xs text-slate-500 mt-0.5">Recursos indicados para obras, UBSs e projetos sociais</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Capital</span>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {bairrosManausEmendas.map((b) => (
              <div key={b.bairro} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-xs">
                <div>
                  <strong className="text-slate-900 font-semibold">{b.bairro}</strong>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {b.quantidade} {b.quantidade === 1 ? 'emenda indicada' : 'emendas indicadas'}
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums font-bold text-slate-900">
                  {formatBRL(b.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Comprehensive Supplier Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Diretório Completo de Fornecedores da CMM</h3>
            <p className="text-xs text-slate-500 mt-0.5">Busque por CNPJ, Razão Social ou serviço contratado pelos vereadores</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por CNPJ ou nome..."
              value={supplierSearch}
              onChange={(e) => setSupplierSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2.5 font-medium">Nome Fantasia / Razão Social</th>
                <th className="pb-2.5 font-medium">CNPJ</th>
                <th className="pb-2.5 font-medium">Objeto do Serviço</th>
                <th className="pb-2.5 font-medium text-center">Gabinetes</th>
                <th className="pb-2.5 font-medium text-right">Total Liquidado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((s) => (
                <tr key={s.cnpj} className="hover:bg-slate-50">
                  <td className="py-3">
                    <div className="font-bold text-slate-900">{s.nomeFantasia}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">{s.razaoSocial}</div>
                  </td>
                  <td className="py-3 font-mono text-slate-600">{s.cnpj}</td>
                  <td className="py-3 text-slate-600 max-w-sm">{s.servico}</td>
                  <td className="py-3 text-center">
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      {s.quantidadeGabinetes}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums font-bold text-slate-900 whitespace-nowrap">
                    {formatBRL(s.totalFaturado)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
