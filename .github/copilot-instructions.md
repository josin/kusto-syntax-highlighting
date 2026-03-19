# Copilot Instructions for kusto-syntax-highlighting

## Project Overview

This is a Visual Studio Code extension that provides syntax highlighting and query execution support for the [Kusto Query Language (KQL)](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/), used in Azure Data Explorer, Azure Monitor, Microsoft Sentinel, and Microsoft Fabric.

## Repository Structure

- `src/` — TypeScript source code for the VS Code extension (`extension.ts`)
- `syntaxes/` — TextMate grammar file (`kusto.tmLanguage`) that defines KQL syntax highlighting
- `language-configuration.json` — VS Code language configuration (brackets, comments, etc.)
- `package.json` — Extension manifest; defines contributions (commands, keybindings, config)
- `tsconfig.json` — TypeScript compiler configuration
- `.github/workflows/` — GitHub Actions workflows (build validation, publish, release)

## Build & Development

- **Install dependencies:** `npm ci`
- **Compile TypeScript:** `npm run compile`
- **Watch mode:** `npm run watch`
- **Package extension:** `npx @vscode/vsce package`

All pull requests must pass the validation build (`.github/workflows/build.yml`) before merging. The build compiles TypeScript and packages the extension.

## Coding Conventions

- Use **TypeScript** with strict mode enabled (`"strict": true` in `tsconfig.json`).
- Target **ES2020** with CommonJS modules.
- The VS Code extension entry point is `src/extension.ts`.
- Follow the existing code style in `src/extension.ts` — use async/await, handle errors with `vscode.window.showErrorMessage`, and prefer VS Code API patterns.
- Do **not** add new runtime dependencies without a strong justification; prefer VS Code built-in APIs.
- Keep `package.json` contributions (commands, keybindings, configuration) consistent with what is implemented in `src/extension.ts`.

## Grammar / Syntax Highlighting

- The TextMate grammar lives in `syntaxes/kusto.tmLanguage` (XML/plist format).
- When adding or modifying KQL syntax rules, test them against the example files in `examples/`.
- Scope names should follow TextMate conventions (e.g., `keyword.control.kusto`, `string.quoted.double.kusto`).

## Pull Request Guidelines

- Each PR should have a clear, focused change (one feature, bug fix, or improvement).
- Ensure `npm run compile` succeeds with no TypeScript errors before opening or updating a PR.
- Update `CHANGELOG.md` for user-visible changes.
- Do not commit build artifacts (e.g., `out/`, `*.vsix`) — these are excluded by `.gitignore` and `.vscodeignore`.
