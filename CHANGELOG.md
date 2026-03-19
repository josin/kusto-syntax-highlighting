# Changelog

All notable changes to the **Kusto Syntax Highlighting** extension are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- String patterns now use `begin`/`end` pairs (support multi-character and escaped strings)
- `autoClosingPairs` in language configuration converted to object format with `notIn: ["string", "comment"]` guards for quote pairs
- `engines.vscode` updated from `^1.21.0` to `^1.74.0`
- `categories` updated from `"Languages"` (deprecated) to `"Programming Languages"`
- `keywords` in manifest expanded with `kql`, `azure data explorer`, `azure monitor`, `log analytics`
- README rewritten with feature list, example query, file-extension table, and Marketplace badges
- `.vscodeignore` tightened to exclude screenshot images, `.git/`, and `CHANGELOG.md` from the installed package

### Fixed
- Regex bug where `project|-away` was parsed as two separate alternatives instead of the single keyword `project-away`
- Duplicate `sort` entry removed from tabular operators list
- Duplicate `any` entry removed from scalar functions list

## [1.0.1] - 2018-09-17

### Added
- Logo / icon image for the Marketplace listing

## [1.0.0] - 2018-09-16

### Added
- Initial release with basic syntax highlighting for `.csl` and `.kusto` files

