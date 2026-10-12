import {
  Vereador,
  EstatisticasGlobaisCMM,
  CategoriaDespesa,
  NotaFiscal,
  AssessorGabinete,
  EmendaImpositiva,
  HistoricoMes,
  DespesaItem,
  FornecedorResumo,
  IndicadoresAuditoria,
  DadosEconomicosExercicio,
  ExercicioFiscal
} from '../types';

export const CEAP_LIMITE_MENSAL = 33086.88;
export const SUBSIDIO_VEREADOR_MENSAL = 24754.79;
export const TOTAL_MESES_EXERCICIO = 10; // 10 meses apurados do ano legislativo vigente (2025)

const MESES_2025 = [
  'Fev/2025', 'Mar/2025', 'Abr/2025', 'Mai/2025', 'Jun/2025',
  'Ago/2025', 'Set/2025', 'Out/2025', 'Nov/2025', 'Dez/2025'
];

const MESES_2024 = [
  'Jan/2024', 'Fev/2024', 'Mar/2024', 'Abr/2024', 'Mai/2024', 'Jun/2024',
  'Jul/2024', 'Ago/2024', 'Set/2024', 'Out/2024', 'Nov/2024', 'Dez/2024'
];

const MESES_2023 = [
  'Jan/2023', 'Fev/2023', 'Mar/2023', 'Abr/2023', 'Mai/2023', 'Jun/2023',
  'Jul/2023', 'Ago/2023', 'Set/2023', 'Out/2023', 'Nov/2023', 'Dez/2023'
];

interface RawVereadorSeed {
  id: string;
  nomeParlamentar: string;
  nomeCompleto: string;
  partido: string;
  numeroUrna: string;
  votos: number;
  situacao: 'Reeleito' | '1º Mandato';
  corPartido: string;
  fotoUrl?: string;
  cargoMesa?: string;
  comissoes: string[];
  sala: string;
  telefone: string;
  email: string;
  chefeGabinete: string;
  totalAssessores: number;
  perfilGasto: 'muito_economico' | 'moderado' | 'alto' | 'teto_maximo';
  focoDespesa: 'divulgacao' | 'locacao_veiculos' | 'combustivel' | 'consultoria' | 'equilibrado';
}

const SEED_VEREADORES: RawVereadorSeed[] = [
  {
    id: 'sargento-salazar',
    nomeParlamentar: 'Sargento Salazar',
    nomeCompleto: 'Mário Salazar da Silva',
    partido: 'PL',
    numeroUrna: '22190',
    votos: 22594,
    situacao: '1º Mandato',
    corPartido: '#1e3a8a',
    cargoMesa: 'Membro',
    comissoes: ['Segurança Pública Municipal', 'Defesa do Consumidor'],
    sala: 'Sala 204 - Bloco B',
    telefone: '(92) 3303-2804',
    email: 'sargento.salazar@cmm.am.gov.br',
    chefeGabinete: 'Subtenente Carlos Eduardo Rocha',
    totalAssessores: 21,
    perfilGasto: 'alto',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'ze-ricardo',
    nomeParlamentar: 'Zé Ricardo',
    nomeCompleto: 'José Ricardo Wendling',
    partido: 'PT',
    numeroUrna: '13123',
    votos: 17395,
    situacao: 'Reeleito',
    corPartido: '#dc2626',
    cargoMesa: 'Membro',
    comissoes: ['Economia, Finanças e Orçamento', 'Constituição e Justiça'],
    sala: 'Sala 102 - Bloco A',
    telefone: '(92) 3303-2801',
    email: 'ze.ricardo@cmm.am.gov.br',
    chefeGabinete: 'Maria do Perpétuo Socorro Mendes',
    totalAssessores: 16,
    perfilGasto: 'muito_economico',
    focoDespesa: 'equilibrado'
  },
  {
    id: 'thaysa-lippy',
    nomeParlamentar: 'Thaysa Lippy',
    nomeCompleto: 'Thaysa Lippy Silva Ferreira',
    partido: 'PRD',
    numeroUrna: '25111',
    votos: 13119,
    situacao: 'Reeleito',
    corPartido: '#ea580c',
    cargoMesa: '2ª Vice-Presidente',
    comissoes: ['Direitos da Mulher', 'Saúde Coletiva'],
    sala: 'Sala 301 - Bloco C',
    telefone: '(92) 3303-2831',
    email: 'thaysa.lippy@cmm.am.gov.br',
    chefeGabinete: 'Ana Beatriz Albuquerque Lima',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'marco-castilhos',
    nomeParlamentar: 'Marco Castilhos',
    nomeCompleto: 'Marco Aurélio Castilhos de Oliveira',
    partido: 'UNIÃO',
    numeroUrna: '44000',
    votos: 12428,
    situacao: '1º Mandato',
    corPartido: '#2563eb',
    comissoes: ['Desenvolvimento Econômico e Turismo', 'Educação'],
    sala: 'Sala 105 - Bloco A',
    telefone: '(92) 3303-2815',
    email: 'marco.castilhos@cmm.am.gov.br',
    chefeGabinete: 'Fabrício Guimarães Monteiro',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'kennedy-marques',
    nomeParlamentar: 'Kennedy Marques Protetor',
    nomeCompleto: 'Kennedy Marques de Albuquerque',
    partido: 'MDB',
    numeroUrna: '15000',
    votos: 12148,
    situacao: 'Reeleito',
    corPartido: '#16a34a',
    cargoMesa: '3º Secretário',
    comissoes: ['Proteção Animal e Meio Ambiente', 'Saúde'],
    sala: 'Sala 210 - Bloco B',
    telefone: '(92) 3303-2820',
    email: 'kennedy.marques@cmm.am.gov.br',
    chefeGabinete: 'Dra. Vanessa Carpanese Barbosa',
    totalAssessores: 20,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'eduardo-alfaia',
    nomeParlamentar: 'Eduardo Alfaia',
    nomeCompleto: 'Eduardo Alfaia de Freitas',
    partido: 'AVANTE',
    numeroUrna: '70123',
    votos: 12115,
    situacao: 'Reeleito',
    corPartido: '#0284c7',
    cargoMesa: 'Líder do Governo',
    comissoes: ['Constituição, Justiça e Redação', 'Administração'],
    sala: 'Sala 305 - Bloco C',
    telefone: '(92) 3303-2810',
    email: 'eduardo.alfaia@cmm.am.gov.br',
    chefeGabinete: 'Gilson Cavalcante Dantas',
    totalAssessores: 25,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'consultoria'
  },
  {
    id: 'everton-assis',
    nomeParlamentar: 'Everton Assis',
    nomeCompleto: 'Everton Wanderley de Assis',
    partido: 'UNIÃO',
    numeroUrna: '44123',
    votos: 11666,
    situacao: 'Reeleito',
    corPartido: '#2563eb',
    cargoMesa: '1º Vice-Presidente',
    comissoes: ['Transporte e Mobilidade Urbana', 'Obras e Serviços Públicos'],
    sala: 'Sala 201 - Bloco B',
    telefone: '(92) 3303-2802',
    email: 'everton.assis@cmm.am.gov.br',
    chefeGabinete: 'Renato Farias Nogueira',
    totalAssessores: 24,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'rodrigo-guedes',
    nomeParlamentar: 'Rodrigo Guedes',
    nomeCompleto: 'Rodrigo Guedes Pinheiro',
    partido: 'PP',
    numeroUrna: '11111',
    votos: 11638,
    situacao: 'Reeleito',
    corPartido: '#0891b2',
    cargoMesa: 'Membro da Oposição',
    comissoes: ['Defesa do Consumidor e Serviços Concedidos', 'Finanças'],
    sala: 'Sala 118 - Bloco A',
    telefone: '(92) 3303-2818',
    email: 'rodrigo.guedes@cmm.am.gov.br',
    chefeGabinete: 'Leandro Vasconcelos de Souza',
    totalAssessores: 18,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'david-reis',
    nomeParlamentar: 'David Reis',
    nomeCompleto: 'David Valente Reis',
    partido: 'AVANTE',
    numeroUrna: '70000',
    votos: 11285,
    situacao: 'Reeleito',
    corPartido: '#0284c7',
    cargoMesa: 'Ex-Presidente CMM',
    comissoes: ['Finanças e Gestão Pública', 'Constituição e Redação'],
    sala: 'Sala 310 - Bloco C',
    telefone: '(92) 3303-2805',
    email: 'david.reis@cmm.am.gov.br',
    chefeGabinete: 'Paulo Henrique da Silveira',
    totalAssessores: 25,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'consultoria'
  },
  {
    id: 'diego-afonso',
    nomeParlamentar: 'Diego Afonso',
    nomeCompleto: 'Diego Afonso Gomes de Carvalho',
    partido: 'UNIÃO',
    numeroUrna: '44555',
    votos: 11109,
    situacao: 'Reeleito',
    corPartido: '#2563eb',
    cargoMesa: 'Membro',
    comissoes: ['Habitação e Obras Públicas', 'Cultura'],
    sala: 'Sala 206 - Bloco B',
    telefone: '(92) 3303-2816',
    email: 'diego.afonso@cmm.am.gov.br',
    chefeGabinete: 'Carla Cristina da Silva',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'joelson-silva',
    nomeParlamentar: 'Joelson Silva',
    nomeCompleto: 'Joelson Sales Silva',
    partido: 'AVANTE',
    numeroUrna: '70777',
    votos: 10983,
    situacao: 'Reeleito',
    corPartido: '#0284c7',
    cargoMesa: 'Membro',
    comissoes: ['Educação e Juventude', 'Serviço Público'],
    sala: 'Sala 215 - Bloco B',
    telefone: '(92) 3303-2822',
    email: 'joelson.silva@cmm.am.gov.br',
    chefeGabinete: 'Pr. Antônio Marcos Ramos',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'aldenor-lima',
    nomeParlamentar: 'Aldenor Lima',
    nomeCompleto: 'Aldenor de Lima Gomes',
    partido: 'UNIÃO',
    numeroUrna: '44789',
    votos: 10749,
    situacao: '1º Mandato',
    corPartido: '#2563eb',
    comissoes: ['Infraestrutura Urbana', 'Agricultura e Abastecimento'],
    sala: 'Sala 107 - Bloco A',
    telefone: '(92) 3303-2824',
    email: 'aldenor.lima@cmm.am.gov.br',
    chefeGabinete: 'Juliano de Castro Martins',
    totalAssessores: 21,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'saimon-bessa',
    nomeParlamentar: 'Saimon Bessa',
    nomeCompleto: 'Saimon Bessa de Menezes',
    partido: 'UNIÃO',
    numeroUrna: '44100',
    votos: 10737,
    situacao: '1º Mandato',
    corPartido: '#2563eb',
    comissoes: ['Juventude, Esporte e Lazer', 'Comunicação'],
    sala: 'Sala 112 - Bloco A',
    telefone: '(92) 3303-2826',
    email: 'saimon.bessa@cmm.am.gov.br',
    chefeGabinete: 'Rodrigo Mendonça Pinto',
    totalAssessores: 20,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'capitao-carpe',
    nomeParlamentar: 'Capitão Carpê',
    nomeCompleto: 'Carpêgiane Andrade da Silva',
    partido: 'PL',
    numeroUrna: '22022',
    votos: 10661,
    situacao: 'Reeleito',
    corPartido: '#1e3a8a',
    cargoMesa: 'Membro',
    comissoes: ['Segurança Pública', 'Fiscalização Financeira'],
    sala: 'Sala 203 - Bloco B',
    telefone: '(92) 3303-2814',
    email: 'capitao.carpe@cmm.am.gov.br',
    chefeGabinete: 'Tenente Anderson Luiz Ferreira',
    totalAssessores: 21,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'joao-carlos',
    nomeParlamentar: 'João Carlos',
    nomeCompleto: 'João Carlos Ribeiro dos Santos',
    partido: 'REPUBLICANOS',
    numeroUrna: '10123',
    votos: 10457,
    situacao: 'Reeleito',
    corPartido: '#4338ca',
    comissoes: ['Assistência Social', 'Trabalho e Renda'],
    sala: 'Sala 209 - Bloco B',
    telefone: '(92) 3303-2819',
    email: 'joao.carlos@cmm.am.gov.br',
    chefeGabinete: 'Everton de Carvalho Bezerra',
    totalAssessores: 24,
    perfilGasto: 'alto',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'allan-campelo',
    nomeParlamentar: 'Allan Campêlo',
    nomeCompleto: 'Allan Campêlo da Silva',
    partido: 'PODE',
    numeroUrna: '20123',
    votos: 10301,
    situacao: 'Reeleito',
    corPartido: '#059669',
    cargoMesa: 'Membro',
    comissoes: ['Esporte e Lazer', 'Saúde'],
    sala: 'Sala 114 - Bloco A',
    telefone: '(92) 3303-2821',
    email: 'allan.campelo@cmm.am.gov.br',
    chefeGabinete: 'Marcio Rogério Souza Campos',
    totalAssessores: 22,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'dr-eduardo-assis',
    nomeParlamentar: 'Dr. Eduardo Assis',
    nomeCompleto: 'Eduardo Assis de Alencar',
    partido: 'AVANTE',
    numeroUrna: '70456',
    votos: 10287,
    situacao: 'Reeleito',
    corPartido: '#0284c7',
    comissoes: ['Saúde Pública', 'Idoso e Acessibilidade'],
    sala: 'Sala 302 - Bloco C',
    telefone: '(92) 3303-2823',
    email: 'dr.eduardo.assis@cmm.am.gov.br',
    chefeGabinete: 'Dra. Camila Nogueira Diniz',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'gilmar-nascimento',
    nomeParlamentar: 'Gilmar Nascimento',
    nomeCompleto: 'Gilmar de Oliveira Nascimento',
    partido: 'AVANTE',
    numeroUrna: '70222',
    votos: 10158,
    situacao: 'Reeleito',
    corPartido: '#0284c7',
    cargoMesa: 'Decano da Casa',
    comissoes: ['Constituição e Justiça', 'Orçamento e Contabilidade'],
    sala: 'Sala 308 - Bloco C',
    telefone: '(92) 3303-2808',
    email: 'gilmar.nascimento@cmm.am.gov.br',
    chefeGabinete: 'José Roberto da Costa Aguiar',
    totalAssessores: 25,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'consultoria'
  },
  {
    id: 'dione-carvalho',
    nomeParlamentar: 'Dione Carvalho',
    nomeCompleto: 'Dione de Carvalho Rodrigues',
    partido: 'AGIR',
    numeroUrna: '36123',
    votos: 9998,
    situacao: 'Reeleito',
    corPartido: '#d97706',
    comissoes: ['Crianças com Cardiopatia e Doenças Raras', 'Saúde'],
    sala: 'Sala 116 - Bloco A',
    telefone: '(92) 3303-2827',
    email: 'dione.carvalho@cmm.am.gov.br',
    chefeGabinete: 'Silvia Letícia Pantoja',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'elan-alencar',
    nomeParlamentar: 'Elan Alencar',
    nomeCompleto: 'Elan dos Santos Alencar',
    partido: 'DC',
    numeroUrna: '27123',
    votos: 9897,
    situacao: 'Reeleito',
    corPartido: '#475569',
    cargoMesa: 'Membro',
    comissoes: ['Esporte, Lazer e Mobilidade', 'Defesa Social'],
    sala: 'Sala 109 - Bloco A',
    telefone: '(92) 3303-2829',
    email: 'elan.alencar@cmm.am.gov.br',
    chefeGabinete: 'Wellington Marques Barros',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'ivo-neto',
    nomeParlamentar: 'Ivo Neto',
    nomeCompleto: 'Ivo Gomes Neto',
    partido: 'PMB',
    numeroUrna: '35123',
    votos: 9778,
    situacao: 'Reeleito',
    corPartido: '#b45309',
    comissoes: ['Juventude e Direitos Humanos', 'Educação'],
    sala: 'Sala 211 - Bloco B',
    telefone: '(92) 3303-2832',
    email: 'ivo.neto@cmm.am.gov.br',
    chefeGabinete: 'Tatiana Vasconcelos Brito',
    totalAssessores: 21,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'jaildo-oliveira',
    nomeParlamentar: 'Jaildo Oliveira',
    nomeCompleto: 'Jaildo dos Santos Oliveira',
    partido: 'PV',
    numeroUrna: '43123',
    votos: 9619,
    situacao: 'Reeleito',
    corPartido: '#15803d',
    comissoes: ['Transporte Coletivo', 'Meio Ambiente Sustentável'],
    sala: 'Sala 119 - Bloco A',
    telefone: '(92) 3303-2834',
    email: 'jaildo.oliveira@cmm.am.gov.br',
    chefeGabinete: 'Valmir de Souza Guedes',
    totalAssessores: 20,
    perfilGasto: 'moderado',
    focoDespesa: 'combustivel'
  },
  {
    id: 'rosivaldo-cordovil',
    nomeParlamentar: 'Rosivaldo Cordovil',
    nomeCompleto: 'Rosivaldo Cordovil de Oliveira',
    partido: 'PSDB',
    numeroUrna: '45123',
    votos: 9552,
    situacao: 'Reeleito',
    corPartido: '#2563eb',
    cargoMesa: 'Membro',
    comissoes: ['Finanças e Orçamento', 'Infraestrutura'],
    sala: 'Sala 212 - Bloco B',
    telefone: '(92) 3303-2835',
    email: 'rosivaldo.cordovil@cmm.am.gov.br',
    chefeGabinete: 'Francisco Chagas de Lima',
    totalAssessores: 22,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'eurico-tavares',
    nomeParlamentar: 'Eurico Tavares',
    nomeCompleto: 'Eurico Tavares de Souza',
    partido: 'PSD',
    numeroUrna: '55777',
    votos: 9356,
    situacao: '1º Mandato',
    corPartido: '#0d9488',
    comissoes: ['Indústria, Comércio e ZFM', 'Ciência e Tecnologia'],
    sala: 'Sala 104 - Bloco A',
    telefone: '(92) 3303-2837',
    email: 'eurico.tavares@cmm.am.gov.br',
    chefeGabinete: 'Luciana Albuquerque Prado',
    totalAssessores: 20,
    perfilGasto: 'moderado',
    focoDespesa: 'consultoria'
  },
  {
    id: 'professora-jacqueline',
    nomeParlamentar: 'Professora Jacqueline',
    nomeCompleto: 'Jacqueline Pinheiro Pinheiro',
    partido: 'UNIÃO',
    numeroUrna: '44333',
    votos: 9296,
    situacao: 'Reeleito',
    corPartido: '#2563eb',
    comissoes: ['Educação (Presidente)', 'Defesa dos Direitos da Mulher'],
    sala: 'Sala 207 - Bloco B',
    telefone: '(92) 3303-2811',
    email: 'professora.jacqueline@cmm.am.gov.br',
    chefeGabinete: 'Cláudia Valéria de Mendonça',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'yomara-lins',
    nomeParlamentar: 'Yomara Lins',
    nomeCompleto: 'Yomara Lins Rodrigues dos Santos',
    partido: 'PODE',
    numeroUrna: '20000',
    votos: 9176,
    situacao: 'Reeleito',
    corPartido: '#059669',
    cargoMesa: '1ª Secretária',
    comissoes: ['Mesa Diretora', 'Ética Parlamentar'],
    sala: 'Sala 304 - Bloco C',
    telefone: '(92) 3303-2803',
    email: 'yomara.lins@cmm.am.gov.br',
    chefeGabinete: 'Dra. Maristela Viana Gomes',
    totalAssessores: 24,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'rosinaldo-bual',
    nomeParlamentar: 'Rosinaldo Bual',
    nomeCompleto: 'Rosinaldo Silva de Oliveira',
    partido: 'AGIR',
    numeroUrna: '36000',
    votos: 8941,
    situacao: 'Reeleito',
    corPartido: '#d97706',
    comissoes: ['Serviços Públicos', 'Obras Comunitárias'],
    sala: 'Sala 115 - Bloco A',
    telefone: '(92) 3303-2838',
    email: 'rosinaldo.bual@cmm.am.gov.br',
    chefeGabinete: 'Marcio Barroso Fonseca',
    totalAssessores: 21,
    perfilGasto: 'alto',
    focoDespesa: 'combustivel'
  },
  {
    id: 'jander-lobato',
    nomeParlamentar: 'Jander Lobato',
    nomeCompleto: 'Jander de Oliveira Lobato',
    partido: 'PSD',
    numeroUrna: '55123',
    votos: 8936,
    situacao: 'Reeleito',
    corPartido: '#0d9488',
    comissoes: ['Água e Saneamento Básico', 'Habitação'],
    sala: 'Sala 214 - Bloco B',
    telefone: '(92) 3303-2839',
    email: 'jander.lobato@cmm.am.gov.br',
    chefeGabinete: 'Reginaldo Paiva de Souza',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'roberto-sabino',
    nomeParlamentar: 'Roberto Sabino',
    nomeCompleto: 'Roberto Sabino da Silva',
    partido: 'REPUBLICANOS',
    numeroUrna: '10777',
    votos: 8879,
    situacao: 'Reeleito',
    corPartido: '#4338ca',
    comissoes: ['Direitos Humanos e Família', 'Constituição e Justiça'],
    sala: 'Sala 208 - Bloco B',
    telefone: '(92) 3303-2841',
    email: 'roberto.sabino@cmm.am.gov.br',
    chefeGabinete: 'Daniela dos Santos Queiroz',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'joao-paulo-janjao',
    nomeParlamentar: 'João Paulo Janjão',
    nomeCompleto: 'João Paulo de Souza Janjão',
    partido: 'AGIR',
    numeroUrna: '36456',
    votos: 8627,
    situacao: '1º Mandato',
    corPartido: '#d97706',
    comissoes: ['Juventude e Esportes Radicais', 'Comércio Popular'],
    sala: 'Sala 117 - Bloco A',
    telefone: '(92) 3303-2843',
    email: 'joao.paulo.janjao@cmm.am.gov.br',
    chefeGabinete: 'Wesley Santana Monteiro',
    totalAssessores: 19,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'professor-samuel',
    nomeParlamentar: 'Professor Samuel',
    nomeCompleto: 'Samuel Monteiro da Silva',
    partido: 'PSD',
    numeroUrna: '55555',
    votos: 8498,
    situacao: 'Reeleito',
    corPartido: '#0d9488',
    comissoes: ['Educação e Magistério', 'Cultura'],
    sala: 'Sala 216 - Bloco B',
    telefone: '(92) 3303-2844',
    email: 'professor.samuel@cmm.am.gov.br',
    chefeGabinete: 'Hélio Batista de Miranda',
    totalAssessores: 22,
    perfilGasto: 'moderado',
    focoDespesa: 'consultoria'
  },
  {
    id: 'coronel-rosses',
    nomeParlamentar: 'Coronel Rosses',
    nomeCompleto: 'Rosses Menezes de Aguiar',
    partido: 'PL',
    numeroUrna: '22192',
    votos: 8324,
    situacao: '1º Mandato',
    corPartido: '#1e3a8a',
    comissoes: ['Segurança Integrada', 'Trânsito e Mobilidade'],
    sala: 'Sala 205 - Bloco B',
    telefone: '(92) 3303-2846',
    email: 'coronel.rosses@cmm.am.gov.br',
    chefeGabinete: 'Major R/1 André Felipe Lins',
    totalAssessores: 21,
    perfilGasto: 'alto',
    focoDespesa: 'combustivel'
  },
  {
    id: 'raiff-matos',
    nomeParlamentar: 'Raiff Matos',
    nomeCompleto: 'Raiff Matos da Silva',
    partido: 'PL',
    numeroUrna: '22333',
    votos: 8167,
    situacao: 'Reeleito',
    corPartido: '#1e3a8a',
    comissoes: ['Defesa da Família e Valores Cívicos', 'Infância'],
    sala: 'Sala 202 - Bloco B',
    telefone: '(92) 3303-2847',
    email: 'raiff.matos@cmm.am.gov.br',
    chefeGabinete: 'Eliabe Pinheiro de Vasconcelos',
    totalAssessores: 23,
    perfilGasto: 'alto',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'raulzinho',
    nomeParlamentar: 'Raulzinho',
    nomeCompleto: 'Raul Silva de Oliveira',
    partido: 'MDB',
    numeroUrna: '15123',
    votos: 8043,
    situacao: 'Reeleito',
    corPartido: '#16a34a',
    cargoMesa: '2º Secretário',
    comissoes: ['Transporte e Vias Públicas', 'Zeladoria Urbana'],
    sala: 'Sala 213 - Bloco B',
    telefone: '(92) 3303-2849',
    email: 'raulzinho@cmm.am.gov.br',
    chefeGabinete: 'Marcos Vinicius de Sá',
    totalAssessores: 24,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'rodinei-ramos',
    nomeParlamentar: 'Rodinei Ramos',
    nomeCompleto: 'Rodinei Pereira Ramos',
    partido: 'AVANTE',
    numeroUrna: '70888',
    votos: 7848,
    situacao: '1º Mandato',
    corPartido: '#0284c7',
    comissoes: ['Obras e Urbanismo', 'Defesa Civil'],
    sala: 'Sala 306 - Bloco C',
    telefone: '(92) 3303-2850',
    email: 'rodinei.ramos@cmm.am.gov.br',
    chefeGabinete: 'Cristiano de Almeida Frota',
    totalAssessores: 21,
    perfilGasto: 'alto',
    focoDespesa: 'combustivel'
  },
  {
    id: 'marcelo-serafim',
    nomeParlamentar: 'Marcelo Serafim',
    nomeCompleto: 'Marcelo Augusto dos Santos Serafim',
    partido: 'PSB',
    numeroUrna: '40123',
    votos: 7643,
    situacao: 'Reeleito',
    corPartido: '#e11d48',
    cargoMesa: 'Líder da Bancada',
    comissoes: ['Saúde (Vice-Presidente)', 'Orçamento e Finanças'],
    sala: 'Sala 106 - Bloco A',
    telefone: '(92) 3303-2809',
    email: 'marcelo.serafim@cmm.am.gov.br',
    chefeGabinete: 'Dr. Thiago Brandão de Lima',
    totalAssessores: 19,
    perfilGasto: 'muito_economico',
    focoDespesa: 'consultoria'
  },
  {
    id: 'mitoso',
    nomeParlamentar: 'Mitoso',
    nomeCompleto: 'Amorim de Oliveira Mitoso',
    partido: 'MDB',
    numeroUrna: '15555',
    votos: 7408,
    situacao: 'Reeleito',
    corPartido: '#16a34a',
    comissoes: ['Políticas Públicas para a Terceira Idade', 'Esporte'],
    sala: 'Sala 217 - Bloco B',
    telefone: '(92) 3303-2852',
    email: 'mitoso@cmm.am.gov.br',
    chefeGabinete: 'Luiz Claudio Ferreira Neto',
    totalAssessores: 22,
    perfilGasto: 'alto',
    focoDespesa: 'locacao_veiculos'
  },
  {
    id: 'rodrigo-sa',
    nomeParlamentar: 'Rodrigo Sá',
    nomeCompleto: 'Rodrigo de Sá Barbosa',
    partido: 'PP',
    numeroUrna: '11222',
    votos: 7370,
    situacao: '1º Mandato',
    corPartido: '#0891b2',
    comissoes: ['Trânsito e Mobilidade Urbana', 'Segurança'],
    sala: 'Sala 110 - Bloco A',
    telefone: '(92) 3303-2854',
    email: 'rodrigo.sa@cmm.am.gov.br',
    chefeGabinete: 'Dr. Bruno Leonardo Bezerra',
    totalAssessores: 20,
    perfilGasto: 'moderado',
    focoDespesa: 'consultoria'
  },
  {
    id: 'pai-amado',
    nomeParlamentar: 'Pai Amado',
    nomeCompleto: 'Benedito da Silva Amado',
    partido: 'AVANTE',
    numeroUrna: '70999',
    votos: 7042,
    situacao: '1º Mandato',
    corPartido: '#0284c7',
    comissoes: ['Ação Social Comunitária', 'Cultura Popular e Folclore'],
    sala: 'Sala 307 - Bloco C',
    telefone: '(92) 3303-2856',
    email: 'pai.amado@cmm.am.gov.br',
    chefeGabinete: 'Samara dos Santos Cavalcante',
    totalAssessores: 23,
    perfilGasto: 'teto_maximo',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'paulo-tyrone',
    nomeParlamentar: 'Paulo Tyrone',
    nomeCompleto: 'Paulo Tyrone da Cunha Freire',
    partido: 'PMB',
    numeroUrna: '35000',
    votos: 6883,
    situacao: '1º Mandato',
    corPartido: '#b45309',
    comissoes: ['Microempresas e Empreendedorismo', 'Meio Ambiente'],
    sala: 'Sala 111 - Bloco A',
    telefone: '(92) 3303-2858',
    email: 'paulo.tyrone@cmm.am.gov.br',
    chefeGabinete: 'Geraldo Magela Nogueira',
    totalAssessores: 18,
    perfilGasto: 'moderado',
    focoDespesa: 'divulgacao'
  },
  {
    id: 'sergio-bare',
    nomeParlamentar: 'Sérgio Baré',
    nomeCompleto: 'Sérgio Ramos Baré',
    partido: 'PRD',
    numeroUrna: '25000',
    votos: 6582,
    situacao: '1º Mandato',
    corPartido: '#ea580c',
    comissoes: ['Comunidades Tradicionais e Ribeirinhas', 'Saúde Fluvial'],
    sala: 'Sala 303 - Bloco C',
    telefone: '(92) 3303-2860',
    email: 'sergio.bare@cmm.am.gov.br',
    chefeGabinete: 'Moacir Macuxi da Fonseca',
    totalAssessores: 19,
    perfilGasto: 'moderado',
    focoDespesa: 'combustivel'
  }
];

// Helper to generate deterministic realistic financial data across years
function buildFinancialProfile(
  seed: RawVereadorSeed,
  index: number,
  exercicio: '2025' | '2024' | '2023' = '2025'
): DadosEconomicosExercicio {
  const anoNum = Number(exercicio);
  const isAnoVigente = exercicio === '2025';

  // Se o vereador é de 1º mandato e estamos auditando um ano anterior (2024 ou 2023),
  // ele não tinha gabinete nem gerou despesas na CMM antes de tomar posse.
  if (!isAnoVigente && seed.situacao === '1º Mandato') {
    return {
      ano: anoNum,
      rotuloExercicio: exercicio === '2024'
        ? 'Exercício 2024 (Ano Anterior - 18ª Leg. / Eleitoral)'
        : 'Exercício 2023 (Ano Anterior - 18ª Leg.)',
      isAnoVigente: false,
      exerciaMandatoNaCMM: false,
      motivoSemDados: exercicio === '2024'
        ? 'Vereador eleito no pleito de outubro de 2024 (posse em 01/01/2025). Não exercia mandato na CMM durante o exercício fiscal de 2024, não gerando cotas de CEAP nem despesas de gabinete.'
        : 'Vereador em 1º mandato na 19ª Legislatura (2025–2028). Sem despesas parlamentares na CMM no exercício de 2023.',
      subsidioMensal: 0,
      ceapLimiteMensal: 0,
      ceapGastoTotalAno: 0,
      ceapUtilizacaoPct: 0,
      gastoFolhaAssessoresMes: 0,
      gastoTotalGabineteAno: 0,
      emendasTotalAno: 0,
      emendasExecutadasAno: 0,
      despesasPorCategoria: [],
      historicoMensal: [],
      principaisFornecedores: [],
      notasFiscais: [],
      assessores: [],
      emendas: [],
      auditoria: {
        nivelTransparenciaScore: 100,
        riscoConcentracao: 'Baixo',
        consumoCombustivelMensalMedio: 0,
        estimativaLitrosGasolinaMes: 0,
        economiaAcumuladaCeap: 0,
        taxaOcupacaoAssessores: 0,
        alertas: [
          {
            tipo: 'info',
            titulo: `Sem Despesas Públicas na CMM em ${exercicio}`,
            descricao: `Parlamentar de 1º mandato, eleito no pleito de 2024. Não geriu gabinete na CMM no ano fiscal de ${exercicio}, evitando qualquer distorção em auditorias fiscais.`
          }
        ]
      }
    };
  }

  const limiteMensal = CEAP_LIMITE_MENSAL;
  const mesesList = exercicio === '2025' ? MESES_2025 : exercicio === '2024' ? MESES_2024 : MESES_2023;
  const mesesApurados = mesesList.length;
  const limiteTotal = limiteMensal * mesesApurados;

  let percentualUsoBase = 0.88;
  if (seed.perfilGasto === 'muito_economico') percentualUsoBase = 0.38 + (index % 5) * 0.05; // 38% a 58%
  else if (seed.perfilGasto === 'moderado') percentualUsoBase = 0.72 + (index % 6) * 0.03; // 72% a 87%
  else if (seed.perfilGasto === 'alto') percentualUsoBase = 0.91 + (index % 4) * 0.02; // 91% a 97%
  else if (seed.perfilGasto === 'teto_maximo') percentualUsoBase = 0.985 + (index % 3) * 0.005; // ~99.5%

  // Ajuste temporal para reeleitos: ano eleitoral (2024) com leve acréscimo
  const fatorAno = exercicio === '2024' ? 1.02 : exercicio === '2023' ? 0.97 : 1.0;
  const ceapGastoTotalAno = Math.min(limiteTotal, Math.round(limiteTotal * percentualUsoBase * fatorAno * 100) / 100);
  const ceapUtilizacaoPct = Math.round((ceapGastoTotalAno / limiteTotal) * 1000) / 10;

  // Breakdown of monthly history
  const historicoMensal: HistoricoMes[] = mesesList.map((mes, mIdx) => {
    // slight variation per month
    const varianceFactor = 1 + ((Math.sin(mIdx + index) * 0.12));
    const gastoMes = Math.min(
      limiteMensal,
      Math.round((ceapGastoTotalAno / mesesApurados) * varianceFactor * 100) / 100
    );
    return {
      mes,
      ano: anoNum,
      valorGasto: gastoMes,
      limiteDisponivel: limiteMensal
    };
  });

  // Category distribution
  let pctDivulgacao = 0.35;
  let pctLocacao = 0.30;
  let pctCombustivel = 0.18;
  let pctConsultoria = 0.10;
  let pctSoftware = 0.04;
  let pctMaterial = 0.03;

  if (seed.focoDespesa === 'divulgacao') {
    pctDivulgacao = 0.52;
    pctLocacao = 0.22;
    pctCombustivel = 0.14;
    pctConsultoria = 0.07;
    pctSoftware = 0.03;
    pctMaterial = 0.02;
  } else if (seed.focoDespesa === 'locacao_veiculos') {
    pctDivulgacao = 0.22;
    pctLocacao = 0.48;
    pctCombustivel = 0.16;
    pctConsultoria = 0.08;
    pctSoftware = 0.04;
    pctMaterial = 0.02;
  } else if (seed.focoDespesa === 'combustivel') {
    pctDivulgacao = 0.24;
    pctLocacao = 0.25;
    pctCombustivel = 0.36;
    pctConsultoria = 0.08;
    pctSoftware = 0.04;
    pctMaterial = 0.03;
  } else if (seed.focoDespesa === 'consultoria') {
    pctDivulgacao = 0.25;
    pctLocacao = 0.20;
    pctCombustivel = 0.15;
    pctConsultoria = 0.32;
    pctSoftware = 0.05;
    pctMaterial = 0.03;
  }

  const despesasPorCategoria: DespesaItem[] = [
    {
      categoria: 'Divulgação Parlamentar',
      valor: Math.round(ceapGastoTotalAno * pctDivulgacao * 100) / 100,
      percentual: Math.round(pctDivulgacao * 100)
    },
    {
      categoria: 'Locação de Veículos',
      valor: Math.round(ceapGastoTotalAno * pctLocacao * 100) / 100,
      percentual: Math.round(pctLocacao * 100)
    },
    {
      categoria: 'Combustíveis e Lubrificantes',
      valor: Math.round(ceapGastoTotalAno * pctCombustivel * 100) / 100,
      percentual: Math.round(pctCombustivel * 100)
    },
    {
      categoria: 'Consultorias e Pareceres',
      valor: Math.round(ceapGastoTotalAno * pctConsultoria * 100) / 100,
      percentual: Math.round(pctConsultoria * 100)
    },
    {
      categoria: 'Locação de Equipamentos/Software',
      valor: Math.round(ceapGastoTotalAno * pctSoftware * 100) / 100,
      percentual: Math.round(pctSoftware * 100)
    },
    {
      categoria: 'Material de Expediente',
      valor: Math.round(ceapGastoTotalAno * pctMaterial * 100) / 100,
      percentual: Math.round(pctMaterial * 100)
    }
  ];

  // Supplier catalog pools for realistic network relationships in Manaus
  const LOCADORAS_POOL = [
    {
      cnpj: '04.912.831/0001-44',
      razaoSocial: 'AMAZÔNIA LOCADORA DE VEÍCULOS LTDA',
      nomeFantasia: 'Amazônia Frotas',
      servico: 'Locação de veículos utilitários e caminhonetes 4x4',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '14.882.109/0001-33',
      razaoSocial: 'RIO NEGRO TRANSPORTES E LOCAÇÃO DE FROTAS LTDA',
      nomeFantasia: 'Rio Negro Locadora',
      servico: 'Locação de veículos sedans e utilitários para apoio parlamentar',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '22.451.980/0001-65',
      razaoSocial: 'NORTE RENT A CAR E TRANSPORTE TERRESTRE EIRELI',
      nomeFantasia: 'Norte Rent a Car Manaus',
      servico: 'Locação de veículos leves e picapes cabine dupla',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '08.192.341/0001-77',
      razaoSocial: 'VANGUARDA FROTAS E LOGÍSTICA URBANA LTDA',
      nomeFantasia: 'Vanguarda Frotas',
      servico: 'Locação e terceirização de frotas automotivas executivas',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '17.653.210/0001-88',
      razaoSocial: 'CAR AMAZONAS LOCAÇÕES E SERVIÇOS LTDA',
      nomeFantasia: 'Car Amazonas Locadora',
      servico: 'Locação de vans e veículos com tração para visitas aos bairros',
      cidade: 'Manaus - AM'
    }
  ];

  const POSTOS_POOL = [
    {
      cnpj: '02.441.988/0003-12',
      razaoSocial: 'AUTO POSTO PONTA NEGRA & TARUMÃ COMÉRCIO DE COMBUSTÍVEIS S/A',
      nomeFantasia: 'Posto Equador Ponta Negra',
      servico: 'Combustível gasolina comum e diesel S10 para transporte parlamentar',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '05.812.449/0001-20',
      razaoSocial: 'AUTO POSTO ATEM DJALMA BATISTA DERIVADOS DE PETRÓLEO LTDA',
      nomeFantasia: 'Posto Atem Djalma Batista',
      servico: 'Abastecimento de veículos de apoio comunitário e fiscalização',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '03.119.822/0002-55',
      razaoSocial: 'POSTO CIDADE NOVA COMBUSTÍVEIS E SERVIÇOS LTDA',
      nomeFantasia: 'Posto Petrobras Cidade Nova',
      servico: 'Fornecimento contínuo de gasolina comum com controle por voucher',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '01.992.345/0001-99',
      razaoSocial: 'AUTO POSTO BOULEVARD ÁLVARO MAIA LTDA',
      nomeFantasia: 'Posto Ipiranga Boulevard',
      servico: 'Abastecimento de frota parlamentar e trocas de lubrificantes',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '09.334.811/0001-41',
      razaoSocial: 'AUTO POSTO ALEIXO & COROADO COMÉRCIO VAREJISTA DE PETRÓLEO LTDA',
      nomeFantasia: 'Posto Shell Constantino Nery',
      servico: 'Gasolina aditivada e diesel para veículos oficiais nos deslocamentos',
      cidade: 'Manaus - AM'
    }
  ];

  const COMUNICACAO_POOL = [
    {
      cnpj: '32.819.120/0001-92',
      razaoSocial: 'RIBEIRO & ALBUQUERQUE COMUNICAÇÃO ESTRATÉGICA E PUBLICIDADE LTDA',
      nomeFantasia: 'Studio Manaus Digital',
      servico: 'Gestão de redes sociais, captação audiovisual e prestação de contas',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '28.401.772/0001-14',
      razaoSocial: 'BARROSO & CASTRO MÍDIA E ASSESSORIA DE IMPRENSA LTDA',
      nomeFantasia: 'Norte Mídia Estratégica',
      servico: 'Assessoria de imprensa, edição de vídeos legislativos e newsletters',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '30.119.450/0001-66',
      razaoSocial: 'AMAZONAS VÍDEO & PRODUÇÕES AUDIOVISUAIS EIRELI',
      nomeFantasia: 'Amazonas Vídeo & Imprensa',
      servico: 'Cobertura em foto/vídeo de sessões plenárias e audiências públicas',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '35.612.309/0001-02',
      razaoSocial: 'IMPACTO ESTRATÉGIA DIGITAL E MARKETING POLÍTICO LTDA',
      nomeFantasia: 'Impacto Estratégia Digital',
      servico: 'Produção de conteúdo transmídia, cards explicativos e relatórios',
      cidade: 'Manaus - AM'
    }
  ];

  const CONSULTORIA_POOL = [
    {
      cnpj: '18.334.719/0001-05',
      razaoSocial: 'AMAZON CONSULTORIA E ASSESSORIA JURÍDICO-ADMINISTRATIVA EIRELI',
      nomeFantasia: 'Norte Jurídico Consultoria',
      servico: 'Elaboração de projetos de lei, minutas de emendas e pareceres técnicos',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '21.094.331/0001-90',
      razaoSocial: 'GUEDES & ASSOCIADOS DIREITO PÚBLICO E CONSULTORIA LEGISLATIVA',
      nomeFantasia: 'Guedes & Associados Pareceres',
      servico: 'Análise de constitucionalidade e impacto orçamentário municipal',
      cidade: 'Manaus - AM'
    },
    {
      cnpj: '27.540.892/0001-44',
      razaoSocial: 'LINS & PINHEIRO ADVOCACIA PÚBLICA E GESTÃO FISCAL LTDA',
      nomeFantasia: 'Lins & Pinheiro Advocacia',
      servico: 'Assessoria contábil e auditoria de conformidade das contas públicas',
      cidade: 'Manaus - AM'
    }
  ];

  // Assign suppliers deterministically to create realistic network overlap
  const locadoraSelected = LOCADORAS_POOL[index % LOCADORAS_POOL.length];
  const postoSelected = POSTOS_POOL[(index + (index % 2 === 0 ? 0 : 2)) % POSTOS_POOL.length];
  const comunicacaoSelected = COMUNICACAO_POOL[(index + (index % 3)) % COMUNICACAO_POOL.length];
  const consultoriaSelected = CONSULTORIA_POOL[index % CONSULTORIA_POOL.length];

  const principaisFornecedores: FornecedorResumo[] = [
    {
      ...locadoraSelected,
      totalRecebido: Math.round(despesasPorCategoria[1].valor * 0.92 * 100) / 100,
      quantidadeNotas: 10
    },
    {
      ...comunicacaoSelected,
      totalRecebido: Math.round(despesasPorCategoria[0].valor * 0.78 * 100) / 100,
      quantidadeNotas: 10
    },
    {
      ...postoSelected,
      totalRecebido: Math.round(despesasPorCategoria[2].valor * 0.85 * 100) / 100,
      quantidadeNotas: 28
    },
    {
      ...consultoriaSelected,
      totalRecebido: Math.round(despesasPorCategoria[3].valor * 0.90 * 100) / 100,
      quantidadeNotas: 8
    }
  ];

  // Invoices list (sample for this fiscal year)
  const notasFiscais: NotaFiscal[] = [
    {
      id: `nf-${seed.id}-01`,
      numeroNF: `NF-${anoNum}/${1020 + index * 12}`,
      dataEmissao: `15/12/${anoNum}`,
      anoExercicio: anoNum,
      fornecedor: principaisFornecedores[0].razaoSocial,
      cnpj: principaisFornecedores[0].cnpj,
      categoria: 'Locação de Veículos',
      descricao: 'Locação mensal de 2 veículos tipo Pick-up cabine dupla para fiscalização nos bairros de Manaus',
      valor: Math.round((despesasPorCategoria[1].valor / 10) * 100) / 100,
      statusConformidade: 'Regular'
    },
    {
      id: `nf-${seed.id}-02`,
      numeroNF: `NF-${anoNum}/${2080 + index * 9}`,
      dataEmissao: `05/12/${anoNum}`,
      anoExercicio: anoNum,
      fornecedor: principaisFornecedores[1].razaoSocial,
      cnpj: principaisFornecedores[1].cnpj,
      categoria: 'Divulgação Parlamentar',
      descricao: 'Produção de boletim informativo digital e edição de vídeos de prestação de contas na CMM',
      valor: Math.round((despesasPorCategoria[0].valor / 10) * 100) / 100,
      statusConformidade: 'Regular'
    },
    {
      id: `nf-${seed.id}-03`,
      numeroNF: `NF-${anoNum}/${3400 + index * 15}`,
      dataEmissao: `28/11/${anoNum}`,
      anoExercicio: anoNum,
      fornecedor: principaisFornecedores[2].razaoSocial,
      cnpj: principaisFornecedores[2].cnpj,
      categoria: 'Combustíveis e Lubrificantes',
      descricao: 'Abastecimento de veículos oficiais de apoio comunitário e visitas fiscalizatórias (Gasolina Comum)',
      valor: Math.round((despesasPorCategoria[2].valor / 10) * 100) / 100,
      statusConformidade: despesasPorCategoria[2].valor / 10 > 7500 ? 'Atenção' : 'Regular'
    },
    {
      id: `nf-${seed.id}-04`,
      numeroNF: `NF-${anoNum}/${4120 + index * 7}`,
      dataEmissao: `12/11/${anoNum}`,
      anoExercicio: anoNum,
      fornecedor: principaisFornecedores[3].razaoSocial,
      cnpj: principaisFornecedores[3].cnpj,
      categoria: 'Consultorias e Pareceres',
      descricao: 'Consultoria técnica para análise de impacto orçamentário da LDO e LOA de Manaus',
      valor: Math.round((despesasPorCategoria[3].valor / 8) * 100) / 100,
      statusConformidade: 'Auditada'
    },
    {
      id: `nf-${seed.id}-05`,
      numeroNF: `NF-${anoNum}/${5501 + index * 4}`,
      dataEmissao: `20/10/${anoNum}`,
      anoExercicio: anoNum,
      fornecedor: 'GRÁFICA E EDITORA RIO NEGRO LTDA',
      cnpj: '07.210.450/0001-18',
      categoria: 'Material de Expediente',
      descricao: 'Impressão de cartilhas explicativas sobre direitos do consumidor e projetos aprovados',
      valor: Math.round((despesasPorCategoria[5].valor / 5) * 100) / 100,
      statusConformidade: 'Regular'
    }
  ];

  // Gabinete Staff (Folha de Pagamento)
  const cargos: { cargo: string; nivel: AssessorGabinete['nivelCargo']; base: number }[] = [
    { cargo: 'Chefe de Gabinete Parlamentar', nivel: 'Chefe de Gabinete', base: 12500 },
    { cargo: 'Assessor Especial de Articulação', nivel: 'CC-1', base: 8200 },
    { cargo: 'Assessor Jurídico Parlamentar', nivel: 'CC-2', base: 6800 },
    { cargo: 'Assessor de Comunicação e Imprensa', nivel: 'CC-3', base: 5400 },
    { cargo: 'Assessor Técnico de Orçamento', nivel: 'CC-4', base: 4200 },
    { cargo: 'Secretário Parlamentar I', nivel: 'CC-5', base: 3400 },
    { cargo: 'Secretário Parlamentar II', nivel: 'CC-6', base: 2800 },
    { cargo: 'Assistente de Atendimento Comunitário', nivel: 'CC-7', base: 2200 },
    { cargo: 'Auxiliar de Gabinete', nivel: 'CC-8', base: 1800 }
  ];

  const assessores: AssessorGabinete[] = [];
  const nomesFicticios = [
    seed.chefeGabinete,
    'Thiago Ramos Barcellos', 'Camila Vasconcelos Prado', 'Raimundo Nonato de Araújo',
    'Luciana Beatriz da Cunha', 'Gabriel Fernandes de Souza', 'Maria Clara dos Santos',
    'Valter Gomes Nogueira', 'Francisca de Oliveira Lima', 'Paulo Sérgio Meireles',
    'Juliana Antunes Ribeiro', 'Edilson Cavalcante Pinho', 'Aline Martins de Carvalho',
    'Rodrigo Albuquerque Sales', 'Patrícia Queiroz Silveira', 'Lucas Eduardo Matos',
    'Suelen Pereira Barbosa', 'Diego Tavares Guimarães', 'Renata Cristina Xavier',
    'Fábio Henrique Mendonça', 'Cláudia Regina Dantas', 'Marcelo Vinicius Couto',
    'Tatiane Farias do Nascimento', 'Bruno Leonardo Vieira', 'Vanessa Kelly Castelo'
  ];

  let gastoFolhaAssessoresMes = 0;
  for (let a = 0; a < seed.totalAssessores; a++) {
    const cargoObj = a === 0 ? cargos[0] : cargos[1 + (a % (cargos.length - 1))];
    const remBruta = cargoObj.base + ((a % 3) * 250);
    const remLiquida = Math.round(remBruta * 0.81 * 100) / 100;
    gastoFolhaAssessoresMes += remBruta;

    assessores.push({
      id: `assessor-${seed.id}-${a + 1}`,
      nome: nomesFicticios[a % nomesFicticios.length],
      cargo: cargoObj.cargo,
      nivelCargo: cargoObj.nivel,
      remuneracaoBruta: remBruta,
      remuneracaoLiquida: remLiquida,
      dataNomeacao: a < 10 ? '01/01/2025' : '15/02/2025',
      situacao: 'Ativo'
    });
  }

  // Emendas Impositivas (R$ 1.800.000 a R$ 2.400.000)
  const bairrosManaus = [
    'Jorge Teixeira', 'Compensa', 'Cidade Nova', 'Adrianópolis', 'Alvorada',
    'Flores', 'Coroado', 'Educandos', 'São José Operário', 'Tancredo Neves',
    'Tarumã', 'Colônia Terra Nova', 'Ponta Negra', 'Centro', 'Novo Aleixo'
  ];
  const areasTematicas: EmendaImpositiva['areaTematica'][] = [
    'Saúde', 'Infraestrutura', 'Educação', 'Assistência Social', 'Esporte e Lazer', 'Cultura'
  ];

  const emendas: EmendaImpositiva[] = [
    {
      id: `emenda-${seed.id}-01`,
      numeroEmenda: `EMI-2025/${100 + index * 4}`,
      ano: 2025,
      destinatario: `Secretaria Municipal de Saúde (SEMSA) - Reforma de UBS`,
      bairroOuRegiao: bairrosManaus[index % bairrosManaus.length],
      areaTematica: 'Saúde',
      valorProposto: 750000,
      valorExecutado: 680000,
      status: 'Em Execução',
      finalidade: 'Aquisição de equipamentos odontológicos e reforma da recepção e sala de vacinas da UBS comunitária.'
    },
    {
      id: `emenda-${seed.id}-02`,
      numeroEmenda: `EMI-${anoNum}/${101 + index * 4}`,
      ano: anoNum,
      destinatario: `Secretaria Municipal de Infraestrutura (SEMINF) - Pavimentação`,
      bairroOuRegiao: bairrosManaus[(index + 3) % bairrosManaus.length],
      areaTematica: 'Infraestrutura',
      valorProposto: 600000,
      valorExecutado: 600000,
      status: 'Concluída',
      finalidade: 'Recapeamento asfáltico, drenagem profunda e instalação de meio-fio em 8 ruas vicinais.'
    },
    {
      id: `emenda-${seed.id}-03`,
      numeroEmenda: `EMI-${anoNum}/${102 + index * 4}`,
      ano: anoNum,
      destinatario: `Fundo Municipal de Fomento ao Desporto e Lazer`,
      bairroOuRegiao: bairrosManaus[(index + 7) % bairrosManaus.length],
      areaTematica: 'Esporte e Lazer',
      valorProposto: 450000,
      valorExecutado: 320000,
      status: 'Em Execução',
      finalidade: 'Revitalização de campo de futebol comunitário com iluminação em LED e vestiários.'
    },
    {
      id: `emenda-${seed.id}-04`,
      numeroEmenda: `EMI-${anoNum}/${103 + index * 4}`,
      ano: anoNum,
      destinatario: `Associação Beneficente e Cultural Amazonas Viva`,
      bairroOuRegiao: bairrosManaus[(index + 11) % bairrosManaus.length],
      areaTematica: 'Assistência Social',
      valorProposto: 300000,
      valorExecutado: 0,
      status: 'Empenhada',
      finalidade: 'Oficinas de capacitação profissional e inclusão digital para jovens da periferia de Manaus.'
    }
  ];

  const emendasTotalAno = emendas.reduce((acc, curr) => acc + curr.valorProposto, 0);
  const emendasExecutadasAno = emendas.reduce((acc, curr) => acc + curr.valorExecutado, 0);

  // Indicators and citizen audit
  const gastoMedioCombustivelMes = despesasPorCategoria[2].valor / mesesApurados;
  const precoLitroGasolina = 6.49; // Manaus benchmark
  const litrosMes = Math.round(gastoMedioCombustivelMes / precoLitroGasolina);
  const economiaCeap = Math.max(0, limiteTotal - ceapGastoTotalAno);

  const maiorFornecedor = principaisFornecedores.reduce((max, curr) => curr.totalRecebido > max.totalRecebido ? curr : max, principaisFornecedores[0]);
  const concentracaoPct = Math.round((maiorFornecedor.totalRecebido / ceapGastoTotalAno) * 100);

  const riscoConcentracao = concentracaoPct > 55 ? 'Alto' : concentracaoPct > 40 ? 'Médio' : 'Baixo';

  const alertas: IndicadoresAuditoria['alertas'] = [];

  if (ceapUtilizacaoPct > 98) {
    alertas.push({
      tipo: 'alerta',
      titulo: 'Consumo no Teto Máximo da CEAP',
      descricao: `Gabinete consome ${ceapUtilizacaoPct}% do teto legal (R$ ${ceapGastoTotalAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}). Baixa devolução ao erário.`
    });
  } else if (ceapUtilizacaoPct < 60) {
    alertas.push({
      tipo: 'info',
      titulo: 'Alta Economia da Cota Parlamentar',
      descricao: `Gabinete economizou R$ ${economiaCeap.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (utilizou apenas ${ceapUtilizacaoPct}% da cota disponível).`
    });
  }

  if (concentracaoPct > 50) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Concentração em Fornecedor Único',
      descricao: `${concentracaoPct}% do total da cota foi destinado à empresa ${maiorFornecedor.nomeFantasia}. Recomendada auditoria de notas.`
    });
  }

  if (gastoMedioCombustivelMes > 7500) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Consumo Elevado de Combustível',
      descricao: `Média de R$ ${gastoMedioCombustivelMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês (~${litrosMes.toLocaleString()} litros). Equivalente a percorrer ~${(litrosMes * 10).toLocaleString()} km/mês na capital.`
    });
  }

  if (seed.totalAssessores >= 24) {
    alertas.push({
      tipo: 'info',
      titulo: 'Gabinete com Quadro Máximo de Assessores',
      descricao: `Possui ${seed.totalAssessores} de 25 cargos em comissão preenchidos. Folha mensal de R$ ${gastoFolhaAssessoresMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`
    });
  }

  const gastoTotalGabineteAno = (SUBSIDIO_VEREADOR_MENSAL * 12) + (gastoFolhaAssessoresMes * 12) + ceapGastoTotalAno;

  return {
    ano: anoNum,
    rotuloExercicio: exercicio === '2025'
      ? 'Exercício 2025 (Ano Vigente - 19ª Legislatura)'
      : exercicio === '2024'
      ? 'Exercício 2024 (Ano Anterior - 18ª Leg. / Eleitoral)'
      : 'Exercício 2023 (Ano Anterior - 18ª Leg.)',
    isAnoVigente,
    exerciaMandatoNaCMM: true,
    subsidioMensal: SUBSIDIO_VEREADOR_MENSAL,
    ceapLimiteMensal: limiteMensal,
    ceapGastoTotalAno,
    ceapUtilizacaoPct,
    gastoFolhaAssessoresMes,
    gastoTotalGabineteAno,
    emendasTotalAno,
    emendasExecutadasAno,
    despesasPorCategoria,
    historicoMensal,
    principaisFornecedores,
    notasFiscais,
    assessores,
    emendas,
    auditoria: {
      nivelTransparenciaScore: 85 + (index % 15),
      riscoConcentracao,
      fornecedorDominante: {
        nome: maiorFornecedor.nomeFantasia,
        percentualDoTotal: concentracaoPct
      },
      consumoCombustivelMensalMedio: gastoMedioCombustivelMes,
      estimativaLitrosGasolinaMes: litrosMes,
      economiaAcumuladaCeap: economiaCeap,
      taxaOcupacaoAssessores: Math.round((seed.totalAssessores / 25) * 100),
      alertas
    }
  };
}

// Generate the 41 complete councilor entities with multi-year profiles
export const VEREADORES: Vereador[] = SEED_VEREADORES.map((seed, idx) => {
  const profile2025 = buildFinancialProfile(seed, idx, '2025');
  const profile2024 = buildFinancialProfile(seed, idx, '2024');
  const profile2023 = buildFinancialProfile(seed, idx, '2023');
  return {
    id: seed.id,
    nomeParlamentar: seed.nomeParlamentar,
    nomeCompleto: seed.nomeCompleto,
    partido: seed.partido,
    numeroUrna: seed.numeroUrna,
    votos: seed.votos,
    situacao: seed.situacao,
    fotoUrl: seed.fotoUrl || (
      seed.id === 'ze-ricardo'
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Deputado_Z%C3%A9_Ricardo.jpg/320px-Deputado_Z%C3%A9_Ricardo.jpg'
        : seed.id === 'marcelo-serafim'
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Marcelo_Serafim_2019.jpg/320px-Marcelo_Serafim_2019.jpg'
        : `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2024/02550/${40001923480 + idx}`
    ),
    corPartido: seed.corPartido,
    cargoMesa: seed.cargoMesa,
    comissoes: seed.comissoes,
    gabinete: {
      numeroSala: seed.sala,
      andar: seed.sala.includes('Bloco A') ? '1º Andar' : seed.sala.includes('Bloco B') ? '2º Andar' : '3º Andar',
      telefone: seed.telefone,
      emailOficial: seed.email,
      chefeGabinete: seed.chefeGabinete,
      totalAssessoresAtivos: seed.totalAssessores,
      limiteAssessores: 25
    },
    dadosEconomicos: profile2025,
    historicoExercicios: {
      '2025': profile2025,
      '2024': profile2024,
      '2023': profile2023
    }
  };
});

// Helper to retrieve the 41 councilors with their active profile adjusted to the selected fiscal year
export function getVereadoresNoExercicio(exercicio: '2025' | '2024' | '2023' = '2025'): Vereador[] {
  return VEREADORES.map(v => ({
    ...v,
    dadosEconomicos: v.historicoExercicios[exercicio] || v.historicoExercicios['2025']
  }));
}

// Compute Global Statistics for CMM segregated by fiscal year
export function getEstatisticasGlobais(exercicio: '2025' | '2024' | '2023' = '2025'): EstatisticasGlobaisCMM {
  const vereadoresDoExercicio = getVereadoresNoExercicio(exercicio);
  const vereadoresComMandato = vereadoresDoExercicio.filter(v => v.dadosEconomicos.exerciaMandatoNaCMM);
  
  const totalVereadores = VEREADORES.length;
  const totalVereadoresComMandato = vereadoresComMandato.length;
  const mesesApurados = exercicio === '2025' ? TOTAL_MESES_EXERCICIO : 12;
  const tetoDisponivelCeapAno = totalVereadoresComMandato * CEAP_LIMITE_MENSAL * mesesApurados;
  
  const totalGastoCeapAno = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.ceapGastoTotalAno, 0);
  const economiaDevolvidaTotal = Math.max(0, tetoDisponivelCeapAno - totalGastoCeapAno);
  const percentualMedioUtilizacaoCeap = tetoDisponivelCeapAno > 0
    ? Math.round((totalGastoCeapAno / tetoDisponivelCeapAno) * 1000) / 10
    : 0;
  
  const totalFolhaAssessoresMes = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.gastoFolhaAssessoresMes, 0);
  const totalAssessoresNomeados = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.assessores.length, 0);
  
  const totalEmendasCadastradas = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.emendasTotalAno, 0);
  const totalEmendasExecutadas = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.emendasExecutadasAno, 0);
  
  const totalNotasFiscaisAuditadas = vereadoresComMandato.reduce((sum, v) => sum + v.dadosEconomicos.notasFiscais.length, 0);

  // Aggregated categories
  const catTotals: Record<CategoriaDespesa, number> = {
    'Divulgação Parlamentar': 0,
    'Locação de Veículos': 0,
    'Combustíveis e Lubrificantes': 0,
    'Consultorias e Pareceres': 0,
    'Locação de Equipamentos/Software': 0,
    'Passagens e Hospedagem': 0,
    'Material de Expediente': 0
  };

  vereadoresComMandato.forEach(v => {
    v.dadosEconomicos.despesasPorCategoria.forEach(d => {
      catTotals[d.categoria] = (catTotals[d.categoria] || 0) + d.valor;
    });
  });

  const distribuicaoPorCategoria = (Object.keys(catTotals) as CategoriaDespesa[])
    .filter(cat => catTotals[cat] > 0)
    .map(categoria => ({
      categoria,
      total: catTotals[categoria],
      percentual: totalGastoCeapAno > 0 ? Math.round((catTotals[categoria] / totalGastoCeapAno) * 1000) / 10 : 0
    }))
    .sort((a, b) => b.total - a.total);

  // Group by Party
  const partyMap: Record<string, { bancada: number; totalGasto: number }> = {};
  vereadoresComMandato.forEach(v => {
    if (!partyMap[v.partido]) {
      partyMap[v.partido] = { bancada: 0, totalGasto: 0 };
    }
    partyMap[v.partido].bancada += 1;
    partyMap[v.partido].totalGasto += v.dadosEconomicos.ceapGastoTotalAno;
  });

  const partidosMaioresGastos = Object.entries(partyMap)
    .map(([partido, data]) => ({
      partido,
      bancadaTamanho: data.bancada,
      totalGasto: data.totalGasto,
      mediaPorVereador: Math.round(data.totalGasto / data.bancada)
    }))
    .sort((a, b) => b.totalGasto - a.totalGasto);

  return {
    exercicio,
    totalVereadores,
    totalVereadoresComMandato,
    totalGastoCeapAno,
    tetoDisponivelCeapAno,
    economiaDevolvidaTotal,
    percentualMedioUtilizacaoCeap,
    totalFolhaAssessoresMes,
    totalEmendasCadastradas,
    totalEmendasExecutadas,
    totalNotasFiscaisAuditadas,
    totalAssessoresNomeados,
    distribuicaoPorCategoria,
    partidosMaioresGastos
  };
}
