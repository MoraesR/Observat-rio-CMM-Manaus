import React from 'react';
import { Vereador } from '../types';
import { CouncilorAvatar } from './CouncilorAvatar';
import { Eye, Plus, Check, AlertCircle, Building2, Fuel, Car, Megaphone, FileText, Camera } from 'lucide-react';

interface CouncilorCardProps {
  vereador: Vereador;
  onSelect: (vereador: Vereador) => void;
  onToggleCompare: (vereador: Vereador) => void;
  isCompared: boolean;
}

export const CouncilorCard: React.FC<CouncilorCardProps> = ({
  vereador,
  onSelect,
  onToggleCompare,
  isCompared,
}) => {
  const { dadosEconomicos } = vereador;
  const pct = dadosEconomicos.ceapUtilizacaoPct;

  // Determine top spend category
  const topCategoria = [...dadosEconomicos.despesasPorCategoria].sort((a, b) => b.valor - a.valor)[0];

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        {/* Top Header with clean zero-pill metadata and public profile photo */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <CouncilorAvatar
              fotoUrl={vereador.fotoUrl}
              nomeParlamentar={vereador.nomeParlamentar}
              partido={vereador.partido}
              corPartido={vereador.corPartido}
              numeroUrna={vereador.numeroUrna}
              size="md"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {vereador.nomeParlamentar}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span>{vereador.partido}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{vereador.votos.toLocaleString('pt-BR')} votos</span>
                <span aria-hidden="true">·</span>
                <span>{vereador.situacao}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 font-mono">
                <span>Nº {vereador.numeroUrna}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Foto Pública Oficial</span>
              </div>
            </div>
          </div>

          {/* Compare toggle button */}
          <button
            onClick={() => onToggleCompare(vereador)}
            title={isCompared ? 'Remover da comparação' : 'Adicionar ao comparador'}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              isCompared
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bureau / Cabinet info */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{vereador.gabinete.numeroSala}</span>
          </div>
          <div className="font-mono tabular-nums">
            {dadosEconomicos.exerciaMandatoNaCMM ? (
              <>
                <strong className="text-slate-800">{vereador.gabinete.totalAssessoresAtivos}</strong> assessores comissionados
              </>
            ) : (
              <span className="text-slate-400 font-medium">Sem assessores em {dadosEconomicos.ano}</span>
            )}
          </div>
        </div>

        {/* If councilor didn't hold office in this fiscal year (e.g. 1º mandato in 2024 or 2023) */}
        {!dadosEconomicos.exerciaMandatoNaCMM ? (
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-mono">
                Exercício {dadosEconomicos.ano}
              </span>
              <span>1º Mandato (Sem Despesas)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {dadosEconomicos.motivoSemDados || `Parlamentar sem mandato na CMM no ano fiscal de ${dadosEconomicos.ano}. Não gerou gastos de CEAP.`}
            </p>
          </div>
        ) : (
          <>
            {/* CEAP progress bar & monetary value */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">
                  CEAP Liquidado ({dadosEconomicos.ano}):
                </span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {formatBRL(dadosEconomicos.ceapGastoTotalAno)}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct > 95
                      ? 'bg-rose-500'
                      : pct > 80
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono tabular-nums">
                <span>{pct}% do teto legal</span>
                {dadosEconomicos.auditoria.economiaAcumuladaCeap > 0 ? (
                  <span className="text-emerald-700 font-medium">
                    Economizou {formatBRL(dadosEconomicos.auditoria.economiaAcumuladaCeap)}
                  </span>
                ) : (
                  <span className="text-rose-600">No teto limite</span>
                )}
              </div>
            </div>

            {/* Primary expenditure item */}
            {topCategoria && (
              <div className="mt-3 bg-slate-50 rounded-lg p-2.5 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Maior Gasto:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                    {topCategoria.categoria}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono tabular-nums text-[11px] text-slate-500">
                  <span>{formatBRL(topCategoria.valor)}</span>
                  <span>{topCategoria.percentual}% da cota</span>
                </div>
              </div>
            )}

            {/* Compliance Alert preview if any */}
            {dadosEconomicos.auditoria.alertas.length > 0 && (
              <div className="mt-2.5 flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded-md">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="truncate">{dadosEconomicos.auditoria.alertas[0].titulo}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(vereador)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
          <span>Examinar Gabinete</span>
        </button>
      </div>
    </div>
  );
};
