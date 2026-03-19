# Kusto (KQL) Language Support for VS Code

[![Version](https://img.shields.io/visual-studio-marketplace/v/josin.kusto-syntax-highlighting)](https://marketplace.visualstudio.com/items?itemName=josin.kusto-syntax-highlighting)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/josin.kusto-syntax-highlighting)](https://marketplace.visualstudio.com/items?itemName=josin.kusto-syntax-highlighting)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

Syntax highlighting for the **Kusto Query Language (KQL)** used in:

- [Azure Data Explorer](https://azure.microsoft.com/en-us/products/data-explorer)
- [Azure Monitor / Log Analytics](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview)
- [Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/)
- [Azure Resource Graph](https://learn.microsoft.com/en-us/azure/governance/resource-graph/)

## Features

- **Syntax highlighting** for `.csl`, `.kusto`, and `.kql` files
- **Tabular operators**: `where`, `summarize`, `project`, `project-away`, `join`, `union`, `extend`, `render`, `parse`, `mv-apply`, `evaluate`, and more
- **Scalar functions**: string, math, datetime, geo, IP, array, dynamic bag functions (500+)
- **Aggregation functions**: `count`, `dcount`, `sum`, `avg`, `percentile`, `make_list`, `make_set`, and more
- **Data types**: `bool`, `datetime`, `dynamic`, `guid`, `int`, `long`, `real`, `string`, `timespan`
- **Comment toggling** (`//` line comments, `/* */` block comments)
- **Bracket matching** and **auto-closing pairs** for `{}`, `[]`, `()`
- **Code folding** via `// #region` / `// #endregion` markers
- **Smart indentation** inside `{}` blocks

## Example

```kusto
// Query the last hour of errors from AppTraces
let timeRange = 1h;
AppTraces
| where TimeGenerated > ago(timeRange)
| where SeverityLevel >= 3
| summarize ErrorCount = count(), LastSeen = max(TimeGenerated) by Message
| order by ErrorCount desc
| take 20
```

![Azure Log Analytics (Kusto) language syntax](images/screenshot1.png)

## File Associations

The extension activates automatically for files with these extensions:

| Extension | Description |
|-----------|-------------|
| `.kql` | KQL query files |
| `.kusto` | Kusto query files |
| `.csl` | Kusto control sequence files |

To manually set the language for an open file, use the **Select Language Mode** command (`Ctrl+K M`) and choose **Kusto**.

## Bugs & Contributions

Found a bug or have a feature request? Open an issue in the [GitHub repository](https://github.com/josin/kusto-syntax-highlighting/issues).

Pull requests are welcome!
