# 🏛️ CMM Transparência — Observatório Econômico dos Gabinetes

Plataforma aberta de **auditoria cívica, transparência fiscal e análise econômica** dos **41 vereadores da Câmara Municipal de Manaus (CMM)**.

O projeto consolida e estrutura dados públicos sobre o uso da **Cota para o Exercício da Atividade Parlamentar (CEAP)**, quadro de assessores comissionados, emendas parlamentares impositivas, notas fiscais e rede de fornecedores contratados pelos gabinetes parlamentares.

---

## 📋 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Principais Funcionalidades](#-principais-funcionalidades)
3. [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Manual de Instalação e Execução (Para Terceiros)](#-manual-de-instalação-e-execução-para-terceiros)
6. [Scripts Disponíveis](#-scripts-disponíveis)
7. [Solução de Problemas Comuns (FAQ)](#-solução-de-problemas-comuns-faq)

---

## 🎯 Sobre o Projeto

O **Observatório CMM Manaus** nasceu com o objetivo de transformar dados contábeis e legislativos brutos em informações visuais acessíveis para cidadãos, jornalistas, pesquisadores e órgãos de controle social.

Por meio de algoritmos locais executados diretamente no navegador, a plataforma calcula indicadores de transparência, identifica padrões de concentração de gastos em fornecedores específicos, estima o consumo físico de recursos (como litros de combustível por gabinete) e permite comparar o desempenho fiscal de diferentes parlamentares ao longo dos exercícios de **2023, 2024 e 2025**.

---

## 🔍 Principais Funcionalidades

### 1. Painel Geral (Dashboard)
- Visão consolidada do orçamento da Câmara Municipal de Manaus no exercício selecionado.
- Indicadores de **gasto total da CEAP**, **teto disponível**, **economia devolvida aos cofres públicos**, **folha mensal de assessores** e **execução de emendas impositivas**.
- Distribuição percentual de despesas por categoria e ranking de gastos por bancada partidária.

### 2. Diretório de Vereadores e Dossiê Individual
- Listagem interativa dos **41 vereadores** com busca por nome, filtro por partido, situação de mandato (*Reeleito* ou *1º Mandato*) e ordenação por critérios fiscais.
- **Dossiê completo por gabinete** contendo:
  - Evolução mensal de gastos da CEAP vs. limite disponível;
  - Quadro nominal de assessores ativos (cargos `CC-1` a `CC-8` e Chefe de Gabinete) e remunerações;
  - Relação de notas fiscais emitidas com CNPJ, fornecedor, categoria e status de conformidade;
  - Emendas impositivas propostas e executadas por bairro/região e área temática (*Saúde, Educação, Infraestrutura, etc.*).

### 3. Grafo Interativo de Vínculos e Fornecedores
- Mapeamento visual em rede conectando **gabinetes parlamentares**, **empresas fornecedoras** (locadoras de veículos, postos de combustíveis, agências de comunicação, consultorias) e **quadro funcional**.
- Identificação imediata de **fornecedores compartilhados** por múltiplos vereadores e análise de concentração contratual.

### 4. Comparador Lado a Lado
- Ferramenta para comparar simultaneamente até **4 gabinetes parlamentares**.
- Confronto direto de indicadores como utilização percentual da CEAP, gasto com folha de assessores, número de comissionados, score de transparência e economia acumulada.

### 5. Auditoria Cívica Automatizada
- Cálculo de **Score de Transparência (0 a 100)** e classificação de **Risco de Concentração** (*Baixo, Médio ou Alto*).
- Alertas automáticos sobre fornecedores dominantes, consumo médio mensal de combustível e conformidade com parâmetros do **TCE-AM**.

### 6. Filtro Temporal Multi-Exercício (2023–2025)
- **2025 (19ª Legislatura — Ano Vigente):** Acompanhamento dos 41 gabinetes ativos com apuração proporcional da CEAP.
- **2024 (18ª Legislatura — Ano Eleitoral):** Dados consolidados de 12 meses, com segregação clara para parlamentares de 1º mandato eleitos para 2025 (evitando distorções nas médias históricas).
- **2023 (Histórico):** Série histórica do exercício anterior para análise evolutiva.

### 7. Exportação de Dados Abertos (CSV)
- Exportação local instantânea (via `Blob API`) dos dados gerais dos gabinetes e das notas fiscais detalhadas em formato `.csv`, pronta para análise em Excel, Python, R ou Power BI.

---

## ⚙️ Arquitetura e Tecnologias

O portal foi projetado sob uma **arquitetura 100% estática e autônoma (Client-Side)**:
- **Zero custo de servidor / Offline-ready:** Todos os dados estruturados e motores de cálculo de auditoria residem no cliente web, dispensando banco de dados externo ou APIs pagas para consulta pública.
- **Privacidade:** Nenhuma consulta, filtro ou exportação de relatório envia dados do usuário para servidores de terceiros.

### Stack Tecnológica
- **[React 19](https://react.dev/)** — Biblioteca de interface declarativa e componentizada
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática rigorosa para os modelos contábeis e parlamentares
- **[Vite 8](https://vite.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Estilização utilitária responsiva e moderna
- **[Lucide React](https://lucide.dev/)** — Biblioteca de ícones vetoriais
- **[Motion](https://motion.dev/)** — Transições e animações fluidas de interface

---

## 📂 Estrutura do Projeto

```text
Observat-rio-CMM-Manaus/
├── .github/workflows/       # Pipeline de deploy automático para GitHub Pages
├── public/                  # Arquivos estáticos públicos
├── src/
│   ├── components/          # Componentes visuais da aplicação
│   │   ├── AnalyticsCharts.tsx   # Gráficos e análises por categoria e partido
│   │   ├── ComparisonTool.tsx    # Comparador lado a lado de até 4 vereadores
│   │   ├── CouncilorAvatar.tsx   # Avatar e identificação visual do parlamentar
│   │   ├── CouncilorCard.tsx     # Card resumido do vereador no grid
│   │   ├── CouncilorGrid.tsx     # Listagem com filtros e busca de vereadores
│   │   ├── CouncilorModal.tsx    # Dossiê detalhado do gabinete (modal)
│   │   ├── ExportModal.tsx       # Exportador de relatórios em CSV
│   │   ├── FiscalAuditModal.tsx  # Painel de auditoria cívica e alertas de risco
│   │   ├── MethodologyView.tsx   # Explicação da metodologia e regras da CEAP
│   │   ├── Navbar.tsx            # Barra de navegação superior
│   │   ├── NetworkGraphView.tsx  # Grafo interativo de vínculos e fornecedores
│   │   ├── OverviewStats.tsx     # Dashboard principal de indicadores globais
│   │   ├── SyncStatusModal.tsx   # Status de sincronização das bases públicas
│   │   └── YearFilterBar.tsx     # Seletor de exercício fiscal (2025, 2024, 2023)
│   ├── data/
│   │   └── vereadores.ts    # Base de dados estruturada e funções de agregação
│   ├── types/
│   │   └── index.ts         # Interfaces TypeScript (Vereador, NotaFiscal, CEAP, etc.)
│   ├── App.tsx              # Componente raiz e gerenciamento de estado das abas
│   ├── index.css            # Estilos globais e configuração do Tailwind CSS
│   └── main.tsx             # Ponto de entrada da aplicação React
├── index.html               # Template HTML principal
├── package.json             # Dependências e scripts do projeto
├── tsconfig.json            # Configuração do compilador TypeScript
└── vite.config.ts           # Configuração do Vite
```

---

## 🚀 Manual de Instalação e Execução (Para Terceiros)

Qualquer pessoa pode baixar, inspecionar o código-fonte e rodar o projeto localmente em sua máquina (Windows, Linux ou macOS) seguindo o passo a passo abaixo.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu computador:
1. **[Git](https://git-scm.com/downloads)** (para clonar o repositório)
2. **[Node.js](https://nodejs.org/)** (versão **20 ou superior** — já inclui o `npm`) **OU** **[Bun](https://bun.sh/)** (gerenciador de pacotes alternativo)

> 💡 **Dica:** Para verificar se você já possui o Git e o Node.js instalados, abra o terminal (ou Prompt de Comando / PowerShell) e digite:
> ```bash
> git --version
> node --version
> npm --version
> ```

---

### Passo 1: Baixar (Clonar) o Projeto

Abra o seu terminal na pasta onde deseja salvar o projeto (por exemplo, sua pasta `Projetos`) e execute:

```bash
git clone https://github.com/MoraesR/Observat-rio-CMM-Manaus.git
```

Em seguida, entre na pasta do projeto recém-baixado:

```bash
cd Observat-rio-CMM-Manaus
```

*(Caso não tenha o Git instalado, você também pode clicar no botão verde **`<> Code`** no topo da página do GitHub, selecionar **`Download ZIP`**, extrair o arquivo no seu computador e abrir o terminal dentro da pasta extraída).*

---

### Passo 2: Instalar as Dependências

Escolha **uma** das opções abaixo de acordo com a ferramenta que você utiliza:

#### Opção A: Usando Node.js / NPM (Mais comum)
Execute o comando abaixo para instalar todos os pacotes necessários:

```bash
npm install --legacy-peer-deps
```
> **Nota:** A flag `--legacy-peer-deps` é recomendada ao usar o `npm` para evitar conflitos opcionais de versão do pacote `esbuild` com o Vite 8.

#### Opção B: Usando Bun
Se você possui o **Bun** instalado, basta executar:

```bash
bun install
```

---

### Passo 3: Rodar o Projeto em Modo de Desenvolvimento

Após concluir a instalação das dependências, inicie o servidor local:

#### Com NPM:
```bash
npm run dev
```

#### Com Bun:
```bash
bun dev
```

O terminal exibirá uma mensagem semelhante a esta:

```text
  VITE v8.x.x  ready in 200 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Agora basta abrir o seu navegador e acessar:
👉 **[http://localhost:3000/](http://localhost:3000/)**

*(Para encerrar o servidor a qualquer momento, pressione `Ctrl + C` no terminal).*

---

### Passo 4: Gerar Versão de Produção (Opcional)

Se você deseja compilar os arquivos otimizados para hospedar em qualquer servidor web estático (Nginx, Apache, Vercel, Netlify, GitHub Pages, etc.):

```bash
# 1. Compila o projeto (gera a pasta dist/)
npm run build

# 2. Testa localmente a versão compilada de produção
npm run preview
```

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, estão configurados os seguintes comandos:

| Comando (NPM) | Comando (Bun) | Descrição |
| :--- | :--- | :--- |
| `npm run dev` | `bun dev` | Inicia o servidor de desenvolvimento na porta `3000` com recarregamento automático (HMR). |
| `npm run build` | `bun run build` | Compila e minifica a aplicação para produção na pasta `dist/`. |
| `npm run preview` | `bun run preview` | Inicia um servidor local para testar os arquivos gerados no build de produção. |
| `npm run lint` | `bun run lint` | Verifica a tipagem do código TypeScript (`tsc --noEmit`) em busca de erros. |
| `npm run clean` | `bun run clean` | Remove a pasta `dist/` de compilações anteriores. |

---

## 🛠️ Solução de Problemas Comuns (FAQ)

### 1. Erro `ERESOLVE could not resolve` ao rodar `npm install`
- **Causa:** Versões mais recentes do `npm` aplicam resolução estrita de *peerDependencies* entre `vite` e `esbuild`.
- **Solução:** Rode o comando adicionando a flag `--legacy-peer-deps`:
  ```bash
  npm install --legacy-peer-deps
  ```

### 2. A porta `3000` já está em uso
- **Comportamento:** O Vite tentará automaticamente a próxima porta livre (como `http://localhost:3001/`). Verifique no terminal qual endereço foi exibido em `Local:`.
- **Alterar porta manualmente:** Você também pode iniciar em outra porta específica rodando:
  ```bash
  npx vite --port=8080
  ```

### 3. Como atualizar o projeto com as últimas alterações do GitHub?
- Caso você já tenha clonado o projeto anteriormente e queira sincronizar com a versão mais recente do repositório oficial, entre na pasta do projeto e execute:
  ```bash
  git pull origin main
  ```
