import React, { useState } from 'react';
import { Vereador } from '../types';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  vereadores: Vereador[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ vereadores, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportVereadoresCSV = () => {
    const headers = [
      'Ano Exercício',
      'Exercia Mandato no Ano',
      'Nome Parlamentar',
      'Nome Completo',
      'Partido',
      'Número de Urna',
      'Votos Válidos',
      'Situação Mandato',
      'Sala CMM',
      'Telefone',
      'Chefe de Gabinete',
      'Total Assessores',
      'Gasto CEAP Acumulado (R$)',
      'Percentual CEAP (%)',
      'Economia Gerada (R$)',
      'Folha Mensal Assessores (R$)',
      'Emendas Totais (R$)'
    ];

    const rows = vereadores.map(v => [
      v.dadosEconomicos.ano,
      v.dadosEconomicos.exerciaMandatoNaCMM ? '"Sim"' : '"Não (1º Mandato)"',
      `"${v.nomeParlamentar}"`,
      `"${v.nomeCompleto}"`,
      `"${v.partido}"`,
      `"${v.numeroUrna}"`,
      v.votos,
      `"${v.situacao}"`,
      `"${v.gabinete.numeroSala}"`,
      `"${v.gabinete.telefone}"`,
      `"${v.gabinete.chefeGabinete}"`,
      v.gabinete.totalAssessoresAtivos,
      v.dadosEconomicos.ceapGastoTotalAno.toFixed(2),
      v.dadosEconomicos.ceapUtilizacaoPct,
      v.dadosEconomicos.auditoria.economiaAcumuladaCeap.toFixed(2),
      v.dadosEconomicos.gastoFolhaAssessoresMes.toFixed(2),
      v.dadosEconomicos.emendasTotalAno.toFixed(2)
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    downloadFile('cmm_manaus_vereadores_dados_economicos.csv', csvContent, 'text/csv;charset=utf-8;');
  };

  const exportNotasFiscaisCSV = () => {
    const headers = [
      'Ano Exercício',
      'Vereador',
      'Partido',
      'Número NF',
      'Data Emissão',
      'Fornecedor / Razão Social',
      'CNPJ',
      'Categoria Despesa',
      'Descrição do Objeto',
      'Valor Liquidado (R$)',
      'Status de Conformidade'
    ];

    const rows: string[][] = [];
    vereadores.forEach(v => {
      v.dadosEconomicos.notasFiscais.forEach(nf => {
        rows.push([
          String(nf.anoExercicio || v.dadosEconomicos.ano),
          `"${v.nomeParlamentar}"`,
          `"${v.partido}"`,
          `"${nf.numeroNF}"`,
          `"${nf.dataEmissao}"`,
          `"${nf.fornecedor}"`,
          `"${nf.cnpj}"`,
          `"${nf.categoria}"`,
          `"${nf.descricao}"`,
          nf.valor.toFixed(2),
          `"${nf.statusConformidade}"`
        ]);
      });
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    downloadFile('cmm_manaus_notas_fiscais_ceap.csv', csvContent, 'text/csv;charset=utf-8;');
  };

  const exportAssessoresCSV = () => {
    const headers = [
      'Gabinete do Vereador',
      'Partido',
      'Nome do Assessor',
      'Cargo Comissionado',
      'Nível de Cargo',
      'Remuneração Bruta (R$)',
      'Remuneração Líquida Estimada (R$)',
      'Data de Nomeação'
    ];

    const rows: string[][] = [];
    vereadores.forEach(v => {
      v.dadosEconomicos.assessores.forEach(a => {
        rows.push([
          `"${v.nomeParlamentar}"`,
          `"${v.partido}"`,
          `"${a.nome}"`,
          `"${a.cargo}"`,
          `"${a.nivelCargo}"`,
          a.remuneracaoBruta.toFixed(2),
          a.remuneracaoLiquida.toFixed(2),
          `"${a.dataNomeacao}"`
        ]);
      });
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    downloadFile('cmm_manaus_quadro_assessores_gabinetes.csv', csvContent, 'text/csv;charset=utf-8;');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Exportação de Dados Públicos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Faça download dos dados estruturados em formato CSV (compatível com Excel, Google Sheets, PowerBI e Python) para fins de pesquisa acadêmica, jornalismo de dados e auditoria cívica.
          </p>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Arquivo <strong>{downloadSuccess}</strong> baixado com sucesso!</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            
            {/* Option 1 */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Tabela de 41 Vereadores</strong>
                  <span className="text-[11px] text-slate-500">
                    Dados econômicos consolidados, CEAP, economia gerada e folha mensal
                  </span>
                </div>
              </div>
              <button
                onClick={exportVereadoresCSV}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md whitespace-nowrap"
              >
                Baixar CSV
              </button>
            </div>

            {/* Option 2 */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Notas Fiscais Declaradas</strong>
                  <span className="text-[11px] text-slate-500">
                    Todas as NFs, fornecedores, CNPJs, descrições e rubricas
                  </span>
                </div>
              </div>
              <button
                onClick={exportNotasFiscaisCSV}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md whitespace-nowrap"
              >
                Baixar CSV
              </button>
            </div>

            {/* Option 3 */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Quadro de Assessores (CMM)</strong>
                  <span className="text-[11px] text-slate-500">
                    Lista nominal de servidores comissionados, níveis de cargo e salários
                  </span>
                </div>
              </div>
              <button
                onClick={exportAssessoresCSV}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md whitespace-nowrap"
              >
                Baixar CSV
              </button>
            </div>

          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Formato: CSV delimitado por ponto e vírgula com codificação UTF-8 com BOM.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-100 text-xs font-semibold"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
