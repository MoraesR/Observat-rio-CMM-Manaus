# CMM Transparência - Observatório Econômico dos Gabinetes (100% Estático)

Plataforma de auditoria cívica, visualização e análise de dados econômicos dos **41 vereadores da Câmara Municipal de Manaus (CMM)**.

---

##  Arquitetura Estática 

O portal foi projetado para operar de forma **completamente autônoma, estática e sem custos recorrentes**:
Toda a auditoria fiscal, detecção de anomalias, índices de risco e conformidade do TCE-AM rodam via algoritmos locais em JavaScript no navegador. 
- **Offline-ready**: Todos os dados contábeis, notas fiscais, emendas parlamentares, quadro de pessoal comissionado e grafo de fornecedores estão embutidos no cliente web.
- **Relatórios & Exportações locais**: A geração de CSVs e relatórios de auditoria roda inteiramente no navegador via Blob API sem tráfego de rede para terceiros.


---
### Pré-requisitos
- **Bun** instalado 

### Comandos de Execução
Abrir o terminal na pasta do projeto 

```powershell
# 1. Instalar dependências
bun install

# 2. Iniciar servidor de desenvolvimento (Porta 3000)
bun dev

# 3. Compilar para produção (gera pasta dist/)
bun run build

# 4. Pré-visualizar build local de produção
bun run preview
```


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
