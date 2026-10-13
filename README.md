# CMM Transparência - Observatório Econômico dos Gabinetes (100% Estático)

Plataforma de auditoria cívica, visualização e análise de dados econômicos dos **41 vereadores da Câmara Municipal de Manaus (CMM)**.

---

## ⚡ Arquitetura 100% Estática (Custo Zero e Sem Dependências Externas)

O portal foi projetado para operar de forma **completamente autônoma, estática e sem custos recorrentes**:
- **Zero API de IA / LLM (Custo Zero)**: Toda a auditoria fiscal, detecção de anomalias, índices de risco e conformidade do TCE-AM rodam via algoritmos locais em JavaScript no navegador. Não há chamadas para OpenAI, Gemini ou LLMs pagos.
- **Zero backend**: Não requer servidor Node/Express, banco de dados ou APIs pagas para funcionar.
- **Offline-ready**: Todos os dados contábeis, notas fiscais, emendas parlamentares, quadro de pessoal comissionado e grafo de fornecedores estão embutidos no cliente web.
- **Relatórios & Exportações locais**: A geração de CSVs e relatórios de auditoria roda inteiramente no navegador via Blob API sem tráfego de rede para terceiros.
- **Compatibilidade total**: Utiliza caminhos de assets relativos (`base: './'`), permitindo hospedar em qualquer subdiretório do GitHub Pages (`https://<usuario>.github.io/<repositorio>/`) ou em domínio personalizado.

---

## 🚀 Como Fazer o Deploy no GitHub Pages

Você tem **duas formas simples** de publicar no GitHub Pages:

### Opção 1: Automático via GitHub Actions (Recomendado)
Já deixamos configurado o arquivo `.github/workflows/deploy.yml`.

1. Suba o código para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "Deploy CMM Transparência"
   git push origin main
   ```
2. No seu repositório no GitHub, vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. Pronto! O workflow compilará e publicará a aplicação automaticamente a cada `git push`.

---

### Opção 2: Deploy Manual via Linha de Comando (`gh-pages`)
Se preferir publicar diretamente pela sua máquina:

1. Instale e gere a compilação:
   ```bash
   npm run deploy
   ```
   *(Este comando executa automaticamente `npm run build` e envia a pasta `dist` para o branch `gh-pages`)*
2. Em **Settings** > **Pages** no GitHub, confirme se o branch está definido como `gh-pages` / `/ (root)`.

---

## 🔍 Funcionalidades Disponíveis

1. **Grafo de Vínculos e Fornecedores**:
   - Mapeamento em rede interativo conectando os gabinetes aos prestadores de serviço (locadoras de veículos, postos de combustível, empresas de comunicação e consultorias).
   - Identificação detalhada de qual vereador cada funcionário/assessor de gabinete está vinculado, com cargo e remuneração.
   - Filtros por categoria, fornecedores compartilhados por múltiplos gabinetes e busca instantânea.

2. **Filtro Temporal de Auditoria Fiscal**:
   - **Ano Vigente (2025 - 19ª Legislatura)**: 41 gabinetes ativos com apuração da CEAP proporcional.
   - **Ano Anterior (2024 - 18ª Legislatura / Ano Eleitoral)**: 12 meses consolidados, com segregação explícita para vereadores de 1º mandato (sem despesas no período para evitar distorções de auditoria).
   - **Histórico (2023)**: Dados históricos do exercício anterior.

3. **Auditoria Cívica e Exportação**:
   - Dossiê detalhado por gabinete com análise de concentração de fornecedores e média de consumo de combustível.
   - Exportação completa em formato `.csv` (dados gerais e notas fiscais individuais).
   - Comparador lado a lado de até 4 gabinetes.
