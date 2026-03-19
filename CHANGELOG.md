# Changelog

All notable changes to the **Kusto Syntax Highlighting** extension are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.3] - 2026-03-19

### Changes
- Initial plan


## [2.0.2] - 2026-03-19

### Changes
- Apply transparent background to new 1024x1024 logo from @josin
- adding new transparent logo
- fix: build and package before push/tag; rebase before tagging; use atomic push
- Replace kusto_logo.png with transparent background version
- feat: merge Release and Publish into a single workflow_dispatch pipeline
- Initial plan
- Initial plan


## [2.0.1] - 2026-03-19

Internal maintenance release — no user-facing changes.

## [2.0.0] - 2026-03-19

### Added
- `.kql` file extension support (in addition to existing `.csl` and `.kusto`)
- `KQL` language alias for the language selector
- `galleryBanner` for a branded VS Code Marketplace listing
- `wordPattern` in language configuration for correct word selection of Kusto identifiers
- `indentationRules` in language configuration for automatic indentation inside `{}` blocks
- `folding.markers` for `// #region` / `// #endregion` code folding
- Comprehensive modern Kusto scalar functions (500+), including string, math, datetime, geo, IP, array, and dynamic bag functions
- All current tabular operators: `render`, `parse`, `parse-where`, `fork`, `facet`, `search`, `evaluate`, `invoke`, `externaldata`, `find`, `distinct`, `sample`, `mv-apply`, `lookup`, `serialize`, `top-hitters`, `top-nested`, `getschema`, `reduce`, and more
- Aggregation functions group: `dcount`, `make_bag`, `make_set`, `percentile`, `tdigest`, `hll`, and many more
- `data-types` grammar scope for Kusto type literals (`bool`, `datetime`, `dynamic`, `guid`, `int`, `long`, `real`, `string`, `timespan`, `decimal`)
- `constants` grammar scope for `true`, `false`, `null`, `nan`, `inf`
- `keywords.operator` scope for logical operators: `and`, `or`, `not`, `in`, `has`, `contains`, `between`, `startswith`, `endswith`, `matches regex`, etc.
- `$schema` reference in grammar file for validation tooling
- Block comment grammar rule (`/* */`) so block comments are correctly tokenized

### Changed
- Grammar converted from legacy Apple Plist XML (`.tmLanguage`) to JSON (`.tmLanguage.json`) — the modern VS Code standard
- All TextMate scope names updated to standard conventions:
  - `keyword.functions.kusto` → `support.function.kusto` and `support.function.aggregate.kusto`
  - `keyword.control.kusto` retained for tabular operators (correct standard)
  - `string.constant.double` → `string.quoted.double.kusto`
  - `string.constant.single` → `string.quoted.single.kusto`
  - `comment` → `comment.line.double-slash.kusto`
  - `string.variable` → `variable.other.kusto`
  - `constant.numeric` → `constant.numeric.kusto`
- String patterns now use `begin`/`end` pairs with negative-lookbehind end patterns so escaped quotes (`\"`, `\'`) no longer terminate strings early
- `autoClosingPairs` in language configuration converted to object format with `notIn: ["string", "comment"]` guards for quote pairs
- `engines.vscode` updated from `^1.21.0` to `^1.75.0`
- `categories` updated from `"Languages"` (deprecated) to `"Programming Languages"`
- `keywords` in manifest expanded with `kql`, `azure data explorer`, `azure monitor`, `log analytics`
- README rewritten with feature list, example query, run-query setup guide, and Marketplace badges
- `.vscodeignore` tightened to exclude build artifacts from the installed package

### Fixed
- Regex bug where `project|-away` was parsed as two separate alternatives instead of the single keyword `project-away`
- String `end` patterns now use `(?<!\\)"` / `(?<!\\)'` to prevent escaped quotes from terminating strings early
- Variable substitution regex restricted to single line to prevent unbounded multi-line matches
- Hex literal regex now requires at least one digit after `0x` (changed `*` to `+`)
- Duplicate `sort` entry removed from tabular operators list
- `not` removed from `scalar-misc-functions` (it belongs only in `keywords` as `keyword.operator.kusto`)
- `count` removed from `tabular-operators` (it belongs in `aggregation-functions`)
- All keyword, operator, and function patterns are now case-insensitive (`(?i)` flag) so mixed-case KQL (`WHERE`, `Summarize`, `DATETIME(…)`, etc.) is highlighted correctly

## [1.1.0] - 2024-05-01

### Added
- **Run Kusto Query** command (`kusto.runQuery`) to execute queries against an Azure Data Explorer cluster
- Results are displayed in the **Kusto Results** output channel
- New keyboard shortcut: `Ctrl+Alt+E` / `Cmd+Alt+E` when editing Kusto files
- Run button (▶) added to the editor toolbar for `.kusto` / `.csl` files
- New settings: `kusto.clusterUrl`, `kusto.database`, `kusto.loginMode`
- Supports Azure CLI (`AzureLogin`), interactive browser (`InteractiveLogin`), and managed identity (`ManagedIdentity`) authentication

## [1.0.1] - 2018-09-17

### Added
- Logo / icon image for the Marketplace listing

## [1.0.0] - 2018-09-16

### Added
- Initial release with basic syntax highlighting for `.csl` and `.kusto` files
