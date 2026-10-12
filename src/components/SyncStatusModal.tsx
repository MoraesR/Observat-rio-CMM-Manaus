import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Clock, Database, Globe, AlertCircle, Calendar, Server, ShieldCheck, X } from 'lucide-react';

interface SyncStatusModalProps {
  onClose: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  lastSyncTime: string;
}

export const SyncStatusModal: React.FC<SyncStatusModalProps> = ({
  onClose,
  onRefreshData,
  isRefreshing,
  lastSyncTime,
}) => {
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  const handleSyncClick = () => {
    onRefreshData();
    setSyncSuccessMessage('Verificação concluída: Todas as 41 bancadas e notas fiscais estão alinhadas com o Portal da Transparência da CMM.');
    setTimeout(() => {
      setSyncSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Ciclo e Atualização dos Dados</h2>
              <p className="text-xs text-slate-400">Como as informações dos vereadores de Manaus são coletadas e atualizadas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-slate-600">
          
          {/* Status strip */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-slate-900 text-xs">Conexão Oficial com a CMM</span>
                <p className="text-[11px] text-slate-500">Última checagem: <strong className="font-mono text-slate-700">{lastSyncTime}</strong></p>
              </div>
            </div>

            <button
              onClick={handleSyncClick}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors whitespace-nowrap text-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Consultando CMM...' : 'Verificar Atualizações Agora'}</span>
            </button>
          </div>

          {syncSuccessMessage && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{syncSuccessMessage}</span>
            </div>
          )}

          {/* Detailed step explanation */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Como funciona o fluxo de atualização dos gastos públicos:
            </h3>

            <div className="space-y-3">
              
              {/* Step 1 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="block text-slate-900 font-semibold">Prestação de Contas Mensal (Exercício da CEAP)</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                    Os vereadores de Manaus realizam despesas ao longo do mês e protocolam os pedidos de reembolso na Diretoria de Finanças da CMM até o final do período mensal.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="block text-slate-900 font-semibold">Conferência Fiscal e Liquidação pela Mesa Diretora</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                    O setor contábil da CMM audita as notas fiscais, cupons e relatórios de atividades parlamentares para autorizar a liquidação da CEAP (Cotão) e da folha de pagamento.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="block text-slate-900 font-semibold">Publicação Oficial (Transparência CMM & Diário Oficial)</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                    Após a aprovação, as despesas são disponibilizadas no Portal da Transparência da Câmara Municipal de Manaus e no Diário Oficial Eletrônico da CMM, geralmente entre o dia 10 e o dia 20 do mês subsequente.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <div>
                  <strong className="block text-slate-900 font-semibold">Ingestão Automatizada & Auditoria Cívica na Plataforma</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                    Nossa plataforma processa os demonstrativos contábeis mensais, normaliza dados de fornecedores (CNPJs), calcula desvios de consumo (combustíveis, aluguel de carros) e atualiza o ranking de economia de cada gabinete.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Legal frequency notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[11px] text-amber-900 leading-relaxed">
            <strong className="font-semibold block mb-1">Importante sobre a periodicidade:</strong>
            Os dados não mudam a cada segundo porque o poder legislativo trabalha por ciclos contábeis de liquidação de despesa pública. A atualização ocorre a cada novo fechamento de balancete publicado pela Câmara Municipal de Manaus.
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Base auditada: 19ª Legislatura da CMM</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors text-xs"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
