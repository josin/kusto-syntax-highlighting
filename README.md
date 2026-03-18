# Kusto Language Support

Support for the Azure Log Analytics (Kusto) language syntax in Visual Studio Code.

## Highlighting

Adds highlighting support for Azure Log Analytics (Kusto) (`.csl` and `.kusto`). This syntax is based on [TextmateBundleInstaller](https://github.com/madskristensen/TextmateBundleInstaller) - [Kusto syntax](https://github.com/madskristensen/TextmateBundleInstaller/blob/master/src/Bundles/kusto/Syntaxes/kusto.plist).

![Azure Log Analytics (Kusto) language syntax](/images/screenshot1.png?raw=true)

## Run Kusto Queries

You can execute Kusto queries directly from VS Code against an Azure Data Explorer (Kusto) cluster. Results are displayed in the **Kusto Results** output panel.

### Setup

1. Open **Settings** (`Ctrl+,` / `Cmd+,`) and configure:

   | Setting | Description | Example |
   |---------|-------------|---------|
   | `kusto.clusterUrl` | Your Kusto cluster URL | `https://mycluster.kusto.windows.net` |
   | `kusto.database` | Default database to query | `MyDatabase` |
   | `kusto.loginMode` | Authentication method (see below) | `AzureLogin` |

2. Choose an **authentication method**:
   - **`AzureLogin`** *(default)* – Uses your existing `az login` credentials. Run `az login` in a terminal before querying.
   - **`InteractiveLogin`** – Opens a browser window for interactive sign-in.
   - **`ManagedIdentity`** – Uses a system-assigned managed identity (suitable for Azure-hosted environments).

### Running a Query

- **Run entire file:** Open a `.kusto` or `.csl` file and press `Ctrl+Alt+E` (`Cmd+Alt+E` on macOS), or click the **▶** button in the editor toolbar.
- **Run selected text:** Select part of a query and use the same shortcut.
- **Command Palette:** Open the Command Palette (`Ctrl+Shift+P`) and run `Kusto: Run Query`.

Query results appear in the **Kusto Results** output channel at the bottom of the editor.

## Bugs

If you happen to see bugs or have suggestions for improvements visit the [issue section](https://github.com/josin/kusto-syntax-highlighting/issues) of the [repository](https://github.com/josin/kusto-syntax-highlighting).
