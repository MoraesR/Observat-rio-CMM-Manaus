export type SituacaoMandato = 'Reeleito' | '1º Mandato';

export type ExercicioFiscal = '2025' | '2024' | '2023' | 'todos';

export type CategoriaDespesa =
  | 'Divulgação Parlamentar'
  | 'Locação de Veículos'
  | 'Combustíveis e Lubrificantes'
  | 'Consultorias e Pareceres'
  | 'Locação de Equipamentos/Software'
  | 'Passagens e Hospedagem'
  | 'Material de Expediente';

export interface DespesaItem {
  categoria: CategoriaDespesa;
  valor: number;
  percentual: number;
}

export interface HistoricoMes {
  mes: string;
  ano: number;
  valorGasto: number;
  limiteDisponivel: number;
}

export interface FornecedorResumo {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  servico: string;
  totalRecebido: number;
  quantidadeNotas: number;
  cidade: string;
}

export interface NotaFiscal {
  id: string;
  numeroNF: string;
  dataEmissao: string;
  anoExercicio: number;
  fornecedor: string;
  cnpj: string;
  categoria: CategoriaDespesa;
  descricao: string;
  valor: number;
  linkDocumento?: string;
  statusConformidade: 'Regular' | 'Atenção' | 'Auditada';
}

export interface AssessorGabinete {
  id: string;
  nome: string;
  cargo: string;
  nivelCargo: 'CC-1' | 'CC-2' | 'CC-3' | 'CC-4' | 'CC-5' | 'CC-6' | 'CC-7' | 'CC-8' | 'Chefe de Gabinete';
  remuneracaoBruta: number;
  remuneracaoLiquida: number;
  dataNomeacao: string;
  situacao: 'Ativo' | 'Exonerado';
}

export interface EmendaImpositiva {
  id: string;
  numeroEmenda: string;
  ano: number;
  destinatario: string;
  bairroOuRegiao: string;
  areaTematica: 'Saúde' | 'Educação' | 'Infraestrutura' | 'Assistência Social' | 'Esporte e Lazer' | 'Cultura';
  valorProposto: number;
  valorExecutado: number;
  status: 'Concluída' | 'Em Execução' | 'Empenhada' | 'Aprovada';
  finalidade: string;
}

export interface IndicadoresAuditoria {
  nivelTransparenciaScore: number; // 0 - 100
  riscoConcentracao: 'Baixo' | 'Médio' | 'Alto';
  fornecedorDominante?: {
    nome: string;
    percentualDoTotal: number;
  };
  consumoCombustivelMensalMedio: number;
  estimativaLitrosGasolinaMes: number;
  economiaAcumuladaCeap: number;
  taxaOcupacaoAssessores: number; // % do limite maximo de 25
  alertas: {
    tipo: 'info' | 'alerta' | 'atencao';
    titulo: string;
    descricao: string;
  }[];
}

export interface GabineteInfo {
  numeroSala: string;
  andar: string;
  telefone: string;
  emailOficial: string;
  chefeGabinete: string;
  totalAssessoresAtivos: number;
  limiteAssessores: number;
}

export interface DadosEconomicosExercicio {
  ano: number;
  rotuloExercicio: string;
  isAnoVigente: boolean;
  exerciaMandatoNaCMM: boolean;
  motivoSemDados?: string;
  subsidioMensal: number;
  ceapLimiteMensal: number;
  ceapGastoTotalAno: number;
  ceapUtilizacaoPct: number;
  gastoFolhaAssessoresMes: number;
  gastoTotalGabineteAno: number;
  emendasTotalAno: number;
  emendasExecutadasAno: number;
  despesasPorCategoria: DespesaItem[];
  historicoMensal: HistoricoMes[];
  principaisFornecedores: FornecedorResumo[];
  notasFiscais: NotaFiscal[];
  assessores: AssessorGabinete[];
  emendas: EmendaImpositiva[];
  auditoria: IndicadoresAuditoria;
}

export interface Vereador {
  id: string;
  nomeParlamentar: string;
  nomeCompleto: string;
  partido: string;
  numeroUrna: string;
  votos: number;
  situacao: SituacaoMandato;
  fotoUrl: string;
  corPartido: string;
  cargoMesa?: string;
  comissoes: string[];
  gabinete: GabineteInfo;
  dadosEconomicos: DadosEconomicosExercicio;
  historicoExercicios: Record<'2025' | '2024' | '2023', DadosEconomicosExercicio>;
}

export interface EstatisticasGlobaisCMM {
  exercicio?: '2025' | '2024' | '2023';
  totalVereadores: number;
  totalVereadoresComMandato?: number;
  totalGastoCeapAno: number;
  tetoDisponivelCeapAno: number;
  economiaDevolvidaTotal: number;
  percentualMedioUtilizacaoCeap: number;
  totalFolhaAssessoresMes: number;
  totalEmendasCadastradas: number;
  totalEmendasExecutadas: number;
  totalNotasFiscaisAuditadas: number;
  totalAssessoresNomeados: number;
  distribuicaoPorCategoria: {
    categoria: CategoriaDespesa;
    total: number;
    percentual: number;
  }[];
  partidosMaioresGastos: {
    partido: string;
    bancadaTamanho: number;
    totalGasto: number;
    mediaPorVereador: number;
  }[];
}
