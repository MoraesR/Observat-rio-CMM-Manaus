import React, { useState } from 'react';
import { Vereador } from '../types';
import { X, ShieldCheck, Sparkles, AlertTriangle, CheckCircle2, Copy, Check, FileText } from 'lucide-react';

interface AiAuditModalProps {
  vereadores: Vereador[];
  onClose: () => void;
  onSelectCouncilor: (vereador: Vereador) => void;
}

export const AiAuditModal: React.FC<AiAuditModalProps> = ({
  vereadores,
  onClose,
  onSelectCouncilor,
}) => {
  const [selectedCouncilorId, setSelectedCouncilorId] = useState<string>(vereadores[0].id);
  const [copied, setCopied] = useState(false);

  const selected = vereadores.find(v => v.id === selectedCouncilorId) || vereadores[0];
  const { dadosEconomicos } = selected;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const copyReport = () => {
    const text = `RELATÓRIO DE AUDITORIA CÍVICA - CMM TRANSPARÊNCIA
Vereador: ${selected.nomeParlamentar} (${selected.partido})
Gabinete: ${selected.gabinete.numeroSala} - CMM
Votos na Eleição 2024: ${selected.votos.toLocaleString('pt-BR')}
Exercício Auditado: ${dadosEconomicos.ano}

${!dadosEconomicos.exerciaMandatoNaCMM ? `NOTA DE AUDITORIA:
- ${selected.nomeParlamentar} não exercia mandato na CMM durante o exercício de ${dadosEconomicos.ano}.
- Trata-se de vereador em 1º mandato eleito em 2024. Sem despesas públicas de gabinete na CMM no período.` : `DADOS ECONÔMICOS DA CEAP (Exercício ${dadosEconomicos.ano}):
- Total Liquidado: ${formatBRL(dadosEconomicos.ceapGastoTotalAno)} (${dadosEconomicos.ceapUtilizacaoPct}% do teto legal)
- Economia Devolvida: ${formatBRL(dadosEconomicos.auditoria.economiaAcumuladaCeap)}
- Consumo Mensal com Combustível: ${formatBRL(dadosEconomicos.auditoria.consumoCombustivelMensalMedio)} (~${dadosEconomicos.auditoria.estimativaLitrosGasolinaMes} litros/mês)
- Fornecedor Dominante: ${dadosEconomicos.auditoria.fornecedorDominante?.nome} (${dadosEconomicos.auditoria.fornecedorDominante?.percentualDoTotal}% da cota)
- Quadro de Pessoal: ${selected.gabinete.totalAssessoresAtivos} assessores | Folha mensal: ${formatBRL(dadosEconomicos.gastoFolhaAssessoresMes)}

APONTAMENTOS DE AUDITORIA:
${dadosEconomicos.auditoria.alertas.map(a => `- [${a.tipo.toUpperCase()}] ${a.titulo}: ${a.descricao}`).join('\n')}`}

Fonte: Observatório Cívico CMM Transparência / Portal da Transparência da CMM`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Auditoria Fiscal Automatizada</h2>
              <p className="text-xs text-slate-400">Inspeção algorítmica de prestação de contas dos gabinetes da CMM</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Councilor Selector */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
          <span className="text-xs font-semibold text-slate-700">Selecione o Parlamentar:</span>
          <select
            value={selectedCouncilorId}
            onChange={(e) => setSelectedCouncilorId(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {vereadores.map(v => (
              <option key={v.id} value={v.id}>
                {v.nomeParlamentar} ({v.partido}) - {v.dadosEconomicos.ceapUtilizacaoPct}% da CEAP
              </option>
            ))}
          </select>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Executive Summary Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900">
                Parecer Técnico do Gabinete: {selected.nomeParlamentar}
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700">
                Score: {dadosEconomicos.auditoria.nivelTransparenciaScore}/100
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {!dadosEconomicos.exerciaMandatoNaCMM
                ? `O vereador ${selected.nomeParlamentar} (${selected.partido}) não exercia mandato na CMM durante o exercício de ${dadosEconomicos.ano} (1º Mandato - Eleito em Out/2024). Não gerou despesas públicas de cota parlamentar neste período fiscal.`
                : `O gabinete do vereador ${selected.nomeParlamentar} (${selected.partido}) consumiu ${dadosEconomicos.ceapUtilizacaoPct}% do teto da CEAP apurado no exercício de ${dadosEconomicos.ano}, totalizando ${formatBRL(dadosEconomicos.ceapGastoTotalAno)} em despesas ressarcidas. Apresenta risco de concentração de fornecedor classificado como ${dadosEconomicos.auditoria.riscoConcentracao}.`
              }
            </p>
          </div>

          {/* Critical Risk Checks */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">Matriz de Critérios e Conformidade</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Check 1 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-slate-500 text-[11px]">Concentração em Fornecedor Único</span>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-mono tabular-nums">
                    {dadosEconomicos.auditoria.fornecedorDominante?.percentualDoTotal}% da cota
                  </strong>
                  <span className={`font-semibold ${
                    dadosEconomicos.auditoria.riscoConcentracao === 'Alto' ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {dadosEconomicos.auditoria.riscoConcentracao}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {dadosEconomicos.auditoria.fornecedorDominante?.nome}
                </p>
              </div>

              {/* Check 2 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-slate-500 text-[11px]">Consumo Médio de Combustível</span>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-mono tabular-nums">
                    {formatBRL(dadosEconomicos.auditoria.consumoCombustivelMensalMedio)}/mês
                  </strong>
                  <span className="text-slate-500 font-mono text-[11px]">
                    ~{dadosEconomicos.auditoria.estimativaLitrosGasolinaMes} Litros
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Equivalente a rodar ~{(dadosEconomicos.auditoria.estimativaLitrosGasolinaMes * 10).toLocaleString()} km mensais em Manaus
                </p>
              </div>

              {/* Check 3 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-slate-500 text-[11px]">Quadro de Assessores Comissionados</span>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-mono tabular-nums">
                    {selected.gabinete.totalAssessoresAtivos} de 25 cargos
                  </strong>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {dadosEconomicos.auditoria.taxaOcupacaoAssessores}% ocupação
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Folha mensal bruta de {formatBRL(dadosEconomicos.gastoFolhaAssessoresMes)}
                </p>
              </div>

              {/* Check 4 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-slate-500 text-[11px]">Retorno e Poupança aos Cofres</span>
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-700 font-mono tabular-nums">
                    {formatBRL(dadosEconomicos.auditoria.economiaAcumuladaCeap)}
                  </strong>
                  <span className="text-emerald-700 font-semibold">
                    Economizado
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Valores não retirados do orçamento da capital amazonense
                </p>
              </div>

            </div>
          </div>

          {/* Detailed Findings List */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-900 text-xs">Apontamentos Auditados</h3>
            {dadosEconomicos.auditoria.alertas.map((alerta, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-slate-900">{alerta.titulo}</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{alerta.descricao}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <button
            onClick={copyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Relatório'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectCouncilor(selected);
            }}
            className="px-4 py-2 bg-emerald-700 text-white rounded-md text-xs font-semibold hover:bg-emerald-800 transition-colors"
          >
            Abrir Dossiê Completo
          </button>
        </div>

      </div>
    </div>
  );
};
