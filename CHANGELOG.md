## 2.0.0

### Breaking changes
- Grammar file migrated from XML (`kusto.tmLanguage`) to JSON (`kusto.tmLanguage.json`) — the active grammar is now the JSON file; themes that targeted old scope names retain compatibility through the unchanged `keyword.control.kusto` and `keyword.functions.kusto` scopes.
- Minimum VS Code engine version bumped from `^1.21.0` to `^1.74.0` (December 2022). Version 1.74 is chosen as the baseline because it ships the stable JSON-grammar pipeline, the modern extension marketplace validation tooling, and is well within the supported range for all current VS Code distributions.

### New features
- Added `.kql` file extension support (used widely by Microsoft Sentinel, Microsoft Defender, Microsoft Fabric).
- Added `KQL` / `kql` language aliases.
- Added snippets for 30+ common KQL patterns (basic query, `let`, `join`, `summarize`, `make-series`, `scan`, `partition`, `externaldata`, `datatable`, and more).

### Grammar improvements
- **Bug fix**: `project-away` was never highlighted due to a broken regex (`project|-away`); now correctly matched.
- **Block comments** (`/* … */`) are now highlighted.
- **Verbatim strings** (`@"…"`) and **obfuscated strings** (`h"…"` / `h'…'`) are now highlighted as distinct string types.
- Escape sequences inside double- and single-quoted strings are highlighted.
- **Type-cast literals** (`datetime(…)`, `int(…)`, `bool(…)`, `timespan(…)`, `dynamic(…)`, etc.) highlighted as `support.type`.
- **Management commands** (`.create`, `.drop`, `.alter`, `.show`, etc.) highlighted as `entity.name.tag`.
- `true`, `false`, `null` promoted to `constant.language` scope.
- **New tabular operators**: `as`, `consume`, `distinct`, `evaluate`, `externaldata`, `facet`, `find`, `fork`, `getschema`, `invoke`, `lookup`, `make-series`, `mv-apply`, `mv-expand`, `parse`, `parse-kv`, `parse-where`, `partition`, `project-away`, `project-keep`, `project-rename`, `project-reorder`, `reduce`, `render`, `sample`, `sample-distinct`, `scan`, `search`, `serialize`, `top-hitters`, `top-nested`.
- **New aggregate functions** (`keyword.aggregate.kusto` scope): `any`, `anyif`, `arg_max`, `arg_min`, `avg`, `avgif`, `buildschema`, `countif`, `dcount`, `dcountif`, `dcount_hll`, `hll`, `hll_if`, `hll_merge`, `make_bag`, `make_bag_if`, `make_list`, `make_list_if`, `make_list_with_nulls`, `make_set`, `make_set_if`, `max`, `maxif`, `min`, `minif`, `percentile`, `percentiles`, `percentiles_array`, `percentile_tdigest`, `stdev`, `stdevif`, `stdevp`, `sum`, `sumif`, `take_any`, `take_anyif`, `tdigest`, `tdigest_merge`, `merge_tdigest`, `variance`, `varianceif`, `variancep`.
- **New scalar functions**: full type conversion set, math, string, datetime, array/bag, geospatial, IP, hash, window (`prev`, `next`, `row_cumsum`, `row_number`, `row_rank_dense`, `row_rank_min`, `row_window_session`), and time-series (`series_*`) functions.
- **Filter/comparison operators** (`keyword.operator.kusto` scope): `between`, `contains`, `contains_cs`, `endswith`, `endswith_cs`, `has`, `has_all`, `has_any`, `has_cs`, `in`, `matches`, `startswith`, `startswith_cs`.
- **General keywords** (`keyword.other.kusto` scope): `let`, `by`, `on`, `kind`, `with`, `asc`, `desc`, `and`, `or`, `not`, `of`, `to`, `from`, `step`.
- Deprecated aliases `makeset` and `makelist` retained for backward compatibility alongside `make_set` / `make_list`.

## 1.0.1

- Adding logo for the extension

## 1.0.0

- Initial release
