import React from 'react';
import { BookOpen, ShieldCheck, Scale, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export const MethodologyView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <span>Base Jurídica & Transparência</span>
          <span aria-hidden="true">·</span>
          <span>Câmara Municipal de Manaus</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Como Funcionam os Recursos dos Gabinetes em Manaus
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Guia instrutivo para o cidadão manauara entender as regras da CEAP ("Cotão"), limites de verbas de gabinete, nomeação de assessores e a prestação de contas dos 41 vereadores eleitos.
        </p>
      </div>

      {/* Main explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CEAP */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
            <Scale className="w-5 h-5" />
            <h2>1. A Cota Parlamentar (CEAP)</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A Cota para o Exercício da Atividade Parlamentar (CEAP) destina-se a ressarcir despesas estritamente vinculadas ao mandato. Em Manaus, o limite fixado é de <strong>R$ 33.086,88 mensais por vereador</strong>.
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>O valor não é incorporado ao salário do vereador.</li>
            <li>O reembolso exige nota fiscal, comprovação de pagamento e relatório de atividade.</li>
            <li>Saldos mensais não utilizados não geram acúmulo definitivo para o ano seguinte.</li>
            <li>Despesas com promoção pessoal ou fins eleitorais são expressamente vedadas pelo TCE-AM.</li>
          </ul>
        </div>

        {/* Subsídios e Folha de Assessores */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-base">
            <FileText className="w-5 h-5" />
            <h2>2. Subsídio e Quadro de Assessores</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A estrutura de gabinete é composta pelo subsídio constitucional do vereador e pelos cargos de provimento em comissão (livre nomeação e exoneração):
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li><strong>Subsídio Parlamentar:</strong> R$ 24.754,79 brutos/mês.</li>
            <li><strong>Quadro de Pessoal:</strong> Cada gabinete pode nomear até <strong>25 assessores comissionados</strong> (níveis CC-1 a CC-8 e Chefe de Gabinete).</li>
            <li>A folha média mensal de comissionados varia entre R$ 60.000,00 e R$ 90.000,00 por gabinete.</li>
          </ul>
        </div>

        {/* Emendas Impositivas */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
            <BookOpen className="w-5 h-5" />
            <h2>3. Emendas Parlamentares Impositivas</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Por determinação legal, parte do orçamento da Prefeitura de Manaus deve ser executado obrigatoriamente conforme as indicações de cada vereador:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Cada vereador indica aproximadamente R$ 2,1 milhões ao ano.</li>
            <li>No mínimo 50% dos recursos devem ser alocados na área de Saúde Municipal (SEMSA).</li>
            <li>O restante pode ser destinado a pavimentação (SEMINF), educação, esporte e entidades sociais sem fins lucrativos.</li>
          </ul>
        </div>

        {/* Controle e Fiscalização */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
            <h2>4. Controle Social e Órgãos Fiscalizadores</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A transparência ativa é um dever republicano garantido pela Constituição Federal e pela Lei de Acesso à Informação (Lei nº 12.527/2011):
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li><strong>TCE-AM:</strong> Tribunal de Contas do Estado do Amazonas audita prestações anuais.</li>
            <li><strong>MP-AM:</strong> Ministério Público apura denúncias de improbidade ou empresas fantasmas.</li>
            <li><strong>Controle Cidadão:</strong> Qualquer cidadão tem o direito de fiscalizar cada nota fiscal emitida na CMM.</li>
          </ul>
        </div>

      </div>

      {/* Official Link Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
        <div>
          <strong className="block text-slate-900 font-semibold">
            Portal da Transparência da Câmara Municipal de Manaus
          </strong>
          <span className="text-[11px] text-slate-500">
            Acesso público aos atos oficiais da Mesa Diretora, contratos de licitação e diários oficiais da CMM.
          </span>
        </div>
        <a
          href="https://transparencia.cmm.am.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Acessar Portal CMM</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
