import React, { useState } from 'react';
import { Vereador } from '../types';
import { CouncilorAvatar } from './CouncilorAvatar';
import { Plus, X, Scale, Users, Fuel, Car, Megaphone, Receipt, Building2, Check, ArrowRight } from 'lucide-react';

interface ComparisonToolProps {
  allVereadores: Vereador[];
  comparedIds: string[];
  onToggleCompare: (vereador: Vereador) => void;
  onClearComparison: () => void;
  onSelectCouncilor: (vereador: Vereador) => void;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({
  allVereadores,
  comparedIds,
  onToggleCompare,
  onClearComparison,
  onSelectCouncilor
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedVereadores = allVereadores.filter(v => comparedIds.includes(v.id));

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Controle Social & Comparativo</span>
            <span aria-hidden="true">·</span>
            <span>Câmara Municipal de Manaus</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Comparador Econômico de Gabinetes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Compare lado a lado o desempenho fiscal, o consumo da CEAP ("Cotão"), gastos com combustível, locação de frotas e estrutura de assessores.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedVereadores.length > 0 && (
            <button
              onClick={onClearComparison}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Limpar Comparação
            </button>
          )}
          <button
            onClick={() => setSelectorOpen(!selectorOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Vereador ({selectedVereadores.length}/4)</span>
          </button>
        </div>
      </div>

      {/* Quick Add Dropdown Menu */}
      {selectorOpen && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800">Selecione um vereador para comparar:</span>
            <button
              onClick={() => setSelectorOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-1">
            {allVereadores.map((v) => {
              const isSelected = comparedIds.includes(v.id);
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    onToggleCompare(v);
                  }}
                  className={`p-2 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{v.nomeParlamentar} ({v.partido})</span>
                  {isSelected ? <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" /> : <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparison Matrix */}
      {selectedVereadores.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Scale className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nenhum gabinete selecionado</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Adicione pelo menos 2 vereadores clicando no botão <strong>+ Adicionar Vereador</strong> acima ou nos cartões da lista para confrontar os números dos gabinetes.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => {
                // Quick preset: Salazar, Zé Ricardo, Eduardo Alfaia
                const preset = allVereadores.slice(0, 3);
                preset.forEach(v => {
                  if (!comparedIds.includes(v.id)) onToggleCompare(v);
                });
              }}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Comparar 3 Vereadores Sugeridos
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 font-semibold text-slate-500 w-52">Indicador Econômico</th>
                {selectedVereadores.map((v) => (
                  <th key={v.id} className="p-4 font-bold text-slate-900 min-w-[200px]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <CouncilorAvatar
                          fotoUrl={v.fotoUrl}
                          nomeParlamentar={v.nomeParlamentar}
                          partido={v.partido}
                          corPartido={v.corPartido}
                          numeroUrna={v.numeroUrna}
                          size="sm"
                        />
                        <div>
                          <div className="text-sm font-bold">{v.nomeParlamentar}</div>
                          <div className="text-slate-500 font-normal text-[11px] mt-0.5">
                            {v.partido} · {v.votos.toLocaleString('pt-BR')} votos
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleCompare(v)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Row 1: Total CEAP */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">Total Liquidado em CEAP</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums font-bold text-slate-900">
                    {v.dadosEconomicos.exerciaMandatoNaCMM ? (
                      formatBRL(v.dadosEconomicos.ceapGastoTotalAno)
                    ) : (
                      <span className="text-slate-400 font-sans font-normal text-xs italic">Sem despesas em {v.dadosEconomicos.ano}</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 2: CEAP % */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">% do Teto Legal Consumido</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums">
                    {v.dadosEconomicos.exerciaMandatoNaCMM ? (
                      <span className={`font-bold ${
                        v.dadosEconomicos.ceapUtilizacaoPct > 95
                          ? 'text-rose-600'
                          : v.dadosEconomicos.ceapUtilizacaoPct < 80
                          ? 'text-emerald-700'
                          : 'text-slate-900'
                      }`}>
                        {v.dadosEconomicos.ceapUtilizacaoPct}%
                      </span>
                    ) : (
                      <span className="text-slate-400 font-sans font-normal text-xs italic">1º Mandato</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 3: Economia ao Erário */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">Economia Devolvida ao Erário</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums font-semibold text-emerald-700">
                    {v.dadosEconomicos.exerciaMandatoNaCMM ? (
                      formatBRL(v.dadosEconomicos.auditoria.economiaAcumuladaCeap)
                    ) : (
                      <span className="text-slate-400 font-sans font-normal text-xs italic">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 4: Divulgação Parlamentar */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-medium text-slate-700">Gasto com Divulgação e Marketing</td>
                {selectedVereadores.map((v) => {
                  const div = v.dadosEconomicos.despesasPorCategoria.find(c => c.categoria === 'Divulgação Parlamentar');
                  return (
                    <td key={v.id} className="p-4 font-mono tabular-nums text-slate-800">
                      {div ? formatBRL(div.valor) : 'R$ 0,00'}
                      <span className="text-slate-400 ml-1.5 text-[11px]">({div?.percentual}%)</span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 5: Locação de Veículos */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-medium text-slate-700">Locação de Veículos / Frotas</td>
                {selectedVereadores.map((v) => {
                  const loc = v.dadosEconomicos.despesasPorCategoria.find(c => c.categoria === 'Locação de Veículos');
                  return (
                    <td key={v.id} className="p-4 font-mono tabular-nums text-slate-800">
                      {loc ? formatBRL(loc.valor) : 'R$ 0,00'}
                      <span className="text-slate-400 ml-1.5 text-[11px]">({loc?.percentual}%)</span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 6: Combustível */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-medium text-slate-700">Combustível & Lubrificantes</td>
                {selectedVereadores.map((v) => {
                  const comb = v.dadosEconomicos.despesasPorCategoria.find(c => c.categoria === 'Combustíveis e Lubrificantes');
                  return (
                    <td key={v.id} className="p-4 font-mono tabular-nums text-slate-800">
                      {comb ? formatBRL(comb.valor) : 'R$ 0,00'}
                      <span className="text-slate-400 ml-1.5 text-[11px]">({comb?.percentual}%)</span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 7: Litros Gasolina / Mês */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-medium text-slate-700">Consumo Estimado de Gasolina</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums text-slate-600">
                    ~{v.dadosEconomicos.auditoria.estimativaLitrosGasolinaMes} L / mês
                  </td>
                ))}
              </tr>

              {/* Row 8: Assessores Nomeados */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">Assessores Comissionados Ativos</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums text-slate-900 font-semibold">
                    {v.gabinete.totalAssessoresAtivos} de 25
                  </td>
                ))}
              </tr>

              {/* Row 9: Folha Mensal Gabinete */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">Custo Folha de Gabinete (Mensal)</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums text-slate-900">
                    {formatBRL(v.dadosEconomicos.gastoFolhaAssessoresMes)}
                  </td>
                ))}
              </tr>

              {/* Row 10: Emendas Impositivas */}
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-800">Emendas Alocadas em Manaus</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4 font-mono tabular-nums text-slate-900">
                    {formatBRL(v.dadosEconomicos.emendasTotalAno)}
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr className="bg-slate-50">
                <td className="p-4 font-semibold text-slate-500">Ação</td>
                {selectedVereadores.map((v) => (
                  <td key={v.id} className="p-4">
                    <button
                      onClick={() => onSelectCouncilor(v)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800"
                    >
                      <span>Abrir Dossiê</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
