import React, { useState } from 'react';
import { Vereador, CategoriaDespesa } from '../types';
import { CouncilorAvatar } from './CouncilorAvatar';
import {
  X,
  Building2,
  Mail,
  Phone,
  User,
  Receipt,
  Users,
  Landmark,
  ShieldCheck,
  AlertTriangle,
  Fuel,
  Car,
  Megaphone,
  Briefcase,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  ExternalLink,
  Search,
  Camera,
  Clock,
  Calendar
} from 'lucide-react';

interface CouncilorModalProps {
  vereador: Vereador;
  onClose: () => void;
  onToggleCompare: (vereador: Vereador) => void;
  isCompared: boolean;
}

type ModalTab = 'ceap' | 'fornecedores' | 'assessores' | 'emendas' | 'auditoria';

export const CouncilorModal: React.FC<CouncilorModalProps> = ({
  vereador,
  onClose,
  onToggleCompare,
  isCompared,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('ceap');
  const [nfSearch, setNfSearch] = useState('');
  const [assessorSearch, setAssessorSearch] = useState('');
  const [showPhotoInspector, setShowPhotoInspector] = useState(false);

  // Fiscal year in modal: default to active year of vereador
  const initialYear = (vereador.dadosEconomicos.ano?.toString() === '2024'
    ? '2024'
    : vereador.dadosEconomicos.ano?.toString() === '2023'
    ? '2023'
    : '2025') as '2025' | '2024' | '2023';

  const [modalYear, setModalYear] = useState<'2025' | '2024' | '2023'>(initialYear);

  const dadosEconomicos = vereador.historicoExercicios?.[modalYear] || vereador.dadosEconomicos;
  const { gabinete } = vereador;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Filtered invoices
  const filteredNFs = dadosEconomicos.notasFiscais.filter(nf =>
    nf.descricao.toLowerCase().includes(nfSearch.toLowerCase()) ||
    nf.fornecedor.toLowerCase().includes(nfSearch.toLowerCase()) ||
    nf.numeroNF.toLowerCase().includes(nfSearch.toLowerCase()) ||
    nf.categoria.toLowerCase().includes(nfSearch.toLowerCase())
  );

  // Filtered staff
  const filteredAssessores = dadosEconomicos.assessores.filter(a =>
    a.nome.toLowerCase().includes(assessorSearch.toLowerCase()) ||
    a.cargo.toLowerCase().includes(assessorSearch.toLowerCase()) ||
    a.nivelCargo.toLowerCase().includes(assessorSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPhotoInspector(true)}
              title="Clique para visualizar a foto pública de cadastro oficial"
              className="group relative focus:outline-none rounded-xl"
            >
              <CouncilorAvatar
                fotoUrl={vereador.fotoUrl}
                nomeParlamentar={vereador.nomeParlamentar}
                partido={vereador.partido}
                corPartido={vereador.corPartido}
                numeroUrna={vereador.numeroUrna}
                size="xl"
                className="group-hover:opacity-90 transition-opacity ring-2 ring-transparent group-hover:ring-emerald-400"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity text-white text-[11px] font-semibold">
                Ampliar
              </span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-white">{vereador.partido}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{vereador.votos.toLocaleString('pt-BR')} votos válidos</span>
                <span aria-hidden="true">·</span>
                <span>{vereador.situacao}</span>
                {vereador.cargoMesa && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{vereador.cargoMesa}</span>
                  </>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {vereador.nomeParlamentar}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{vereador.nomeCompleto}</span>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setShowPhotoInspector(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 underline underline-offset-2"
                >
                  <Camera className="w-3 h-3" />
                  Foto Pública de Cadastro Eleitoral / CMM
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={() => onToggleCompare(vereador)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isCompared
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isCompared ? 'No Comparador' : '+ Comparar'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cabinet Contact & Official Details Sub-Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Localização: <strong>{gabinete.numeroSala}</strong> ({gabinete.andar})</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono tabular-nums">{gabinete.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{gabinete.emailOficial}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Chefe de Gabinete: <strong>{gabinete.chefeGabinete}</strong></span>
          </div>
        </div>

        {/* Fiscal Year Selector Sub-Bar inside Modal */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Exercício Fiscal em Análise:</span>
            </span>
            <div className="inline-flex p-0.5 bg-white rounded-lg border border-slate-200 gap-1 text-[11px]">
              <button
                onClick={() => setModalYear('2025')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  modalYear === '2025'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                2025 (Ano Vigente)
              </button>
              <button
                onClick={() => setModalYear('2024')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  modalYear === '2024'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                2024 (Ano Anterior)
              </button>
              <button
                onClick={() => setModalYear('2023')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  modalYear === '2023'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                2023 (Histórico)
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono">
            {modalYear === '2025' ? (
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                19ª Legislatura · Em Andamento
              </span>
            ) : vereador.situacao === 'Reeleito' ? (
              <span className="text-slate-700 font-medium bg-slate-200/80 px-2 py-0.5 rounded">
                18ª Legislatura · Mandato Anterior
              </span>
            ) : (
              <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Sem despesas na CMM em {modalYear} (1º Mandato)
              </span>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs (Interactive Segmented Control) */}
        <div className="border-b border-slate-200 px-6 bg-white shrink-0 overflow-x-auto">
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('ceap')}
              className={`py-3.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'ceap'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Cota Parlamentar (CEAP)</span>
            </button>

            <button
              onClick={() => setActiveTab('fornecedores')}
              className={`py-3.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'fornecedores'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Notas Fiscais & Fornecedores</span>
            </button>

            <button
              onClick={() => setActiveTab('assessores')}
              className={`py-3.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'assessores'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Quadro de Assessores ({gabinete.totalAssessoresAtivos})</span>
            </button>

            <button
              onClick={() => setActiveTab('emendas')}
              className={`py-3.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'emendas'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Emendas Impositivas</span>
            </button>

            <button
              onClick={() => setActiveTab('auditoria')}
              className={`py-3.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'auditoria'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Auditoria & Indicadores</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {!dadosEconomicos.exerciaMandatoNaCMM ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-xs uppercase tracking-wider">
                  Auditoria Fiscal do Exercício {modalYear}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Sem Exercício Parlamentar na CMM neste Ano
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  {dadosEconomicos.motivoSemDados || `${vereador.nomeParlamentar} foi eleito no pleito de 2024 para a 19ª Legislatura (posse em janeiro/2025). Durante o ano fiscal de ${modalYear}, não gerou despesas de CEAP nem geriu gabinete na Câmara Municipal de Manaus.`}
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setModalYear('2025')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Alternar para Ano Vigente (2025)</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: CEAP EXPENSES */}
          {activeTab === 'ceap' && (
            <div className="space-y-6">
              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total CEAP Apurado</span>
                  <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900">
                    {formatBRL(dadosEconomicos.ceapGastoTotalAno)}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 font-mono tabular-nums">
                    {dadosEconomicos.ceapUtilizacaoPct}% do teto legal (10 meses)
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Economia Devolvida à Cidade</span>
                  <div className="mt-1 text-xl font-bold font-mono tabular-nums text-emerald-700">
                    {formatBRL(dadosEconomicos.auditoria.economiaAcumuladaCeap)}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Saldo da cota que não foi retirado do erário
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Folha Mensal de Gabinete</span>
                  <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900">
                    {formatBRL(dadosEconomicos.gastoFolhaAssessoresMes)}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Remuneração dos {gabinete.totalAssessoresAtivos} assessores nomeados
                  </div>
                </div>
              </div>

              {/* Category Breakdown Table */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Detalhamento de Despesas por Rubrica da CEAP
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-2 font-medium">Categoria da Despesa</th>
                        <th className="pb-2 font-medium text-right">Valor Acumulado</th>
                        <th className="pb-2 font-medium text-right">Participação</th>
                        <th className="pb-2 font-medium text-right">Média Mensal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dadosEconomicos.despesasPorCategoria.map((cat) => (
                        <tr key={cat.categoria} className="hover:bg-slate-50">
                          <td className="py-2.5 font-medium text-slate-800">{cat.categoria}</td>
                          <td className="py-2.5 text-right font-mono tabular-nums font-semibold text-slate-900">
                            {formatBRL(cat.valor)}
                          </td>
                          <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">
                            {cat.percentual}%
                          </td>
                          <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">
                            {formatBRL(cat.valor / 10)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly History Progression */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Evolução Mensal dos Gastos vs Teto Legal (R$ 33.086,88)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Valores liquidados mês a mês pelo gabinete na Câmara Municipal de Manaus
                </p>

                <div className="space-y-2.5">
                  {dadosEconomicos.historicoMensal.map((h) => {
                    const pctMes = Math.round((h.valorGasto / h.limiteDisponivel) * 100);
                    return (
                      <div key={h.mes} className="flex items-center gap-3 text-xs">
                        <span className="w-16 font-medium text-slate-600 shrink-0 font-mono">{h.mes}</span>
                        <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pctMes > 95 ? 'bg-rose-500' : 'bg-emerald-600'
                            }`}
                            style={{ width: `${Math.min(100, pctMes)}%` }}
                          />
                        </div>
                        <span className="w-24 text-right font-mono tabular-nums font-semibold text-slate-900 shrink-0">
                          {formatBRL(h.valorGasto)}
                        </span>
                        <span className="w-12 text-right font-mono tabular-nums text-[11px] text-slate-500 shrink-0">
                          {pctMes}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVOICES & SUPPLIERS */}
          {activeTab === 'fornecedores' && (
            <div className="space-y-6">
              {/* Primary Suppliers Strip */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Principais Fornecedores Contratados pelo Gabinete
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dadosEconomicos.principaisFornecedores.map((forn) => (
                    <div key={forn.cnpj} className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span className="truncate">{forn.nomeFantasia}</span>
                        <span className="font-mono tabular-nums text-emerald-700">{formatBRL(forn.totalRecebido)}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] font-mono">{forn.cnpj} · {forn.cidade}</p>
                      <p className="text-slate-600 text-[11px] line-clamp-2">{forn.servico}</p>
                      <div className="pt-1 text-[11px] text-slate-400 font-mono tabular-nums">
                        {forn.quantidadeNotas} notas emitidas no período
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoices Search & Table */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Relação de Notas Fiscais Declaradas</h3>
                    <p className="text-xs text-slate-500">Documentação comprobatória apresentada ao Portal da Transparência</p>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filtrar notas fiscais..."
                      value={nfSearch}
                      onChange={(e) => setNfSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-2 font-medium">Número NF</th>
                        <th className="pb-2 font-medium">Data</th>
                        <th className="pb-2 font-medium">Fornecedor / Razão Social</th>
                        <th className="pb-2 font-medium">Categoria</th>
                        <th className="pb-2 font-medium">Descrição do Serviço</th>
                        <th className="pb-2 font-medium text-right">Valor</th>
                        <th className="pb-2 font-medium text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredNFs.map((nf) => (
                        <tr key={nf.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-mono font-semibold text-slate-800">{nf.numeroNF}</td>
                          <td className="py-2.5 font-mono tabular-nums text-slate-500">{nf.dataEmissao}</td>
                          <td className="py-2.5 font-medium text-slate-900 max-w-[180px] truncate" title={nf.fornecedor}>
                            {nf.fornecedor}
                          </td>
                          <td className="py-2.5 text-slate-600 whitespace-nowrap">{nf.categoria}</td>
                          <td className="py-2.5 text-slate-600 max-w-[220px] truncate" title={nf.descricao}>
                            {nf.descricao}
                          </td>
                          <td className="py-2.5 text-right font-mono tabular-nums font-bold text-slate-900 whitespace-nowrap">
                            {formatBRL(nf.valor)}
                          </td>
                          <td className="py-2.5 text-center">
                            <span className={`text-[11px] font-semibold ${
                              nf.statusConformidade === 'Regular'
                                ? 'text-emerald-700'
                                : nf.statusConformidade === 'Auditada'
                                ? 'text-blue-700'
                                : 'text-amber-700'
                            }`}>
                              {nf.statusConformidade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CABINET STAFF */}
          {activeTab === 'assessores' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Estrutura de Cargos em Comissão do Gabinete
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Nomeações conforme Resolução da Câmara Municipal de Manaus
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Assessores Ativos:</span>
                    <strong className="ml-1 font-mono tabular-nums text-slate-900">
                      {gabinete.totalAssessoresAtivos} de 25
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Folha Bruta:</span>
                    <strong className="ml-1 font-mono tabular-nums text-slate-900">
                      {formatBRL(dadosEconomicos.gastoFolhaAssessoresMes)}/mês
                    </strong>
                  </div>
                </div>
              </div>

              {/* Staff search & list */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold text-slate-700">Relação Nominal dos Servidores</span>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar assessor ou cargo..."
                      value={assessorSearch}
                      onChange={(e) => setAssessorSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-2 font-medium">Nome do Servidor</th>
                        <th className="pb-2 font-medium">Cargo Comissionado</th>
                        <th className="pb-2 font-medium text-center">Nível</th>
                        <th className="pb-2 font-medium text-right">Remuneração Bruta</th>
                        <th className="pb-2 font-medium text-right">Remuneração Líquida</th>
                        <th className="pb-2 font-medium text-center">Data Nomeação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAssessores.map((assessor) => (
                        <tr key={assessor.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-medium text-slate-900">{assessor.nome}</td>
                          <td className="py-2.5 text-slate-600">{assessor.cargo}</td>
                          <td className="py-2.5 text-center font-mono text-[11px] text-slate-500">
                            {assessor.nivelCargo}
                          </td>
                          <td className="py-2.5 text-right font-mono tabular-nums font-semibold text-slate-900">
                            {formatBRL(assessor.remuneracaoBruta)}
                          </td>
                          <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">
                            {formatBRL(assessor.remuneracaoLiquida)}
                          </td>
                          <td className="py-2.5 text-center font-mono tabular-nums text-slate-500">
                            {assessor.dataNomeacao}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMENDAS IMPOSITIVAS */}
          {activeTab === 'emendas' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Emendas Parlamentares Impositivas Individuais
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Recursos do Orçamento de Manaus indicados diretamente pelo vereador
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
                  <div>
                    <span className="text-slate-500 font-sans">Total Indicado:</span>
                    <strong className="ml-1 text-slate-900">{formatBRL(dadosEconomicos.emendasTotalAno)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans">Executado:</span>
                    <strong className="ml-1 text-emerald-700">{formatBRL(dadosEconomicos.emendasExecutadasAno)}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dadosEconomicos.emendas.map((emenda) => (
                  <div key={emenda.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-800">{emenda.numeroEmenda}</span>
                      <span className="font-semibold text-emerald-700">{emenda.status}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <span>Área: <strong className="text-slate-700">{emenda.areaTematica}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Bairro/Região: <strong className="text-slate-700">{emenda.bairroOuRegiao}</strong></span>
                    </div>

                    <p className="font-medium text-slate-900">{emenda.destinatario}</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{emenda.finalidade}</p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono tabular-nums">
                      <span className="text-slate-500">Valor Alocado:</span>
                      <strong className="text-slate-900">{formatBRL(emenda.valorProposto)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT & ANOMALY DETECTION */}
          {activeTab === 'auditoria' && (
            <div className="space-y-6">
              
              {/* Audit Scores & Fuel Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Índice de Transparência Fiscal</span>
                  <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-slate-900">
                    {dadosEconomicos.auditoria.nivelTransparenciaScore}/100
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Baseado no nível de detalhamento e conformidade das notas fiscais
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Consumo Mensal de Combustível</span>
                  <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-slate-900">
                    {formatBRL(dadosEconomicos.auditoria.consumoCombustivelMensalMedio)}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 font-mono tabular-nums">
                    ~{dadosEconomicos.auditoria.estimativaLitrosGasolinaMes} litros de gasolina / mês
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Risco de Concentração em Fornecedor</span>
                  <div className={`mt-1 text-2xl font-bold ${
                    dadosEconomicos.auditoria.riscoConcentracao === 'Alto'
                      ? 'text-rose-600'
                      : dadosEconomicos.auditoria.riscoConcentracao === 'Médio'
                      ? 'text-amber-600'
                      : 'text-emerald-700'
                  }`}>
                    {dadosEconomicos.auditoria.riscoConcentracao}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    {dadosEconomicos.auditoria.fornecedorDominante?.percentualDoTotal}% com {dadosEconomicos.auditoria.fornecedorDominante?.nome}
                  </div>
                </div>
              </div>

              {/* Citizen Audit Alerts */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Apontamentos e Alertas de Conformidade Cívica
                </h3>
                <p className="text-xs text-slate-500">
                  Parâmetros de controle social aplicados com base nas diretrizes do TCE-AM e boas práticas de gestão pública
                </p>

                <div className="space-y-2.5 mt-3">
                  {dadosEconomicos.auditoria.alertas.map((alerta, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 ${
                        alerta.tipo === 'alerta'
                          ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                          : alerta.tipo === 'atencao'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                          : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                        alerta.tipo === 'alerta' ? 'text-rose-600' : alerta.tipo === 'atencao' ? 'text-amber-600' : 'text-emerald-600'
                      }`} />
                      <div>
                        <strong className="block font-semibold">{alerta.titulo}</strong>
                        <p className="mt-0.5 leading-relaxed opacity-90">{alerta.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
          </>
        )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Fonte oficial: Portal da Transparência da Câmara Municipal de Manaus (CMM)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>

        {/* Photo Inspector Fullscreen Dialog */}
        {showPhotoInspector && (
          <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Foto Pública de Cadastro</span>
                </div>
                <button
                  onClick={() => setShowPhotoInspector(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
                  <CouncilorAvatar
                    fotoUrl={vereador.fotoUrl}
                    nomeParlamentar={vereador.nomeParlamentar}
                    partido={vereador.partido}
                    corPartido={vereador.corPartido}
                    numeroUrna={vereador.numeroUrna}
                    size="xl"
                    className="w-full h-full"
                    showBadge={false}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{vereador.nomeParlamentar}</h3>
                  <p className="text-xs text-slate-500">{vereador.nomeCompleto}</p>
                </div>

                <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Partido / Urna:</span>
                    <strong className="font-mono text-slate-800">{vereador.partido} · {vereador.numeroUrna}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Votos Válidos:</span>
                    <strong className="font-mono text-slate-800">{vereador.votos.toLocaleString('pt-BR')} votos</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Origem do Cadastro:</span>
                    <span className="font-medium text-emerald-700">TSE DivulgaCand / CMM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full pt-1">
                  <a
                    href="https://divulgacandcontas.tse.jus.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <span>Consultar no TSE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setShowPhotoInspector(false)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
