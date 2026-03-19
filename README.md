# Kusto Language Support

Support for the Kusto Query Language (KQL) syntax in Visual Studio Code. KQL is used in Azure Monitor, Azure Data Explorer, Microsoft Sentinel, and Microsoft Fabric. Includes syntax highlighting and the ability to run queries directly against an Azure Data Explorer cluster.

## Features

- **Syntax highlighting** for `.kusto`, `.kql`, and `.csl` files
- **Run queries** against an Azure Data Explorer (Kusto) cluster without leaving VS Code
- Supports **Azure CLI**, **interactive browser**, and **managed identity** authentication

## Highlighting

Adds highlighting support for Kusto Query Language (KQL) (`.csl` and `.kusto`). This syntax is based on [TextmateBundleInstaller](https://github.com/madskristensen/TextmateBundleInstaller) - [Kusto syntax](https://github.com/madskristensen/TextmateBundleInstaller/blob/master/src/Bundles/kusto/Syntaxes/kusto.plist).

![Kusto Query Language (KQL) syntax](/images/screenshot1.png?raw=true)

## Run Kusto Queries

You can execute Kusto queries directly from VS Code against an Azure Data Explorer (Kusto) cluster. Results are displayed in the **Kusto Results** output panel.

### Prerequisites

- **VS Code** 1.75.0 or later
- An **Azure Data Explorer** cluster you have access to
- For `AzureLogin` mode (default): the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed and signed in

### Step 1 — Install the Extension

Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=josin.kusto-syntax-highlighting), or search for **"Kusto"** in the VS Code Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).

### Step 2 — Configure the Extension

Open **Settings** (`Ctrl+,` / `Cmd+,`) and search for `kusto`, or add the following to your User or Workspace settings JSON (`settings.json`):

```jsonc
{
    // Required: the full URL of your Azure Data Explorer cluster
    "kusto.clusterUrl": "https://mycluster.kusto.windows.net",

    // Required: the database to run queries against
    "kusto.database": "MyDatabase",

    // Optional: authentication method (default: AzureLogin)
    // Options: "AzureLogin" | "InteractiveLogin" | "ManagedIdentity"
    "kusto.loginMode": "AzureLogin"
}
```

> **Tip:** Use **workspace** settings (`.vscode/settings.json`) to keep cluster details local to a specific project, keeping your global User settings clean.

#### Finding your cluster URL

Your cluster URL follows the pattern `https://<cluster-name>.<region>.kusto.windows.net`.  
You can find it in the **Azure Portal** → your Azure Data Explorer cluster → **Overview** → **URI**.

### Step 3 — Authenticate

Choose the authentication method that fits your environment:

| Login Mode | When to Use | Setup Steps |
|---|---|---|
| `AzureLogin` *(default)* | Local development with Azure CLI | Run `az login` in a terminal once |
| `InteractiveLogin` | No Azure CLI; browser available | No setup — a browser window opens automatically |
| `ManagedIdentity` | Azure-hosted VMs / containers | Ensure a system-assigned managed identity is enabled on the host |

**For `AzureLogin`** (recommended for local development):

```bash
# Sign in to Azure once — the extension reuses these credentials
az login

# If you have multiple subscriptions, set the one that contains your cluster
az account set --subscription "<subscription-name-or-id>"
```

### Step 4 — Write and Run a Query

1. Create or open a file with the `.kusto` or `.csl` extension.
2. Write your Kusto query, for example:

   ```kusto
   StormEvents
   | where StartTime >= ago(7d)
   | summarize Count = count() by EventType
   | order by Count desc
   | take 10
   ```

3. Run the query using any of these methods:

   | Method | Action |
   |--------|--------|
   | **Keyboard shortcut** | `Ctrl+Alt+E` (`Cmd+Alt+E` on macOS) |
   | **Editor toolbar** | Click the **▶** button in the top-right of the editor |
   | **Right-click menu** | Right-click in the editor → **Kusto: Run Query** |
   | **Command Palette** | `Ctrl+Shift+P` → type `Kusto: Run Query` |

4. Results appear in the **Kusto Results** output channel at the bottom of the editor:

   ```
   [2024-05-01T12:00:00.000Z] Running query on https://mycluster.kusto.windows.net / MyDatabase
   ────────────────────────────────────────────────────────────────────────────────
   EventType        | Count
   -----------------+------
   Thunderstorm Wind | 4321
   Hail              | 2100
   Flash Flood       | 1850
   ...

   10 row(s) returned.
   ────────────────────────────────────────────────────────────────────────────────
   Query completed successfully.
   ```

> **Tip:** To run only part of a query, **select the lines** you want to execute before triggering the command. The extension will run the selection instead of the whole file.

### Configuration Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `kusto.clusterUrl` | `string` | `""` | Full URL of the Azure Data Explorer cluster, e.g. `https://mycluster.kusto.windows.net` |
| `kusto.database` | `string` | `""` | Name of the database to run queries against |
| `kusto.loginMode` | `string` | `"AzureLogin"` | Authentication method: `AzureLogin`, `InteractiveLogin`, or `ManagedIdentity` |

### Troubleshooting

**"Kusto cluster URL is not configured"**  
Set `kusto.clusterUrl` in Settings and make sure it is not empty.

**"Kusto database is not configured"**  
Set `kusto.database` in Settings and make sure it is not empty.

**Authentication errors with `AzureLogin`**  
Run `az login` in a terminal. If you have multiple tenants, use `az login --tenant <tenant-id>`.

**"Forbidden" / 403 errors**  
Your account does not have the required permissions on the cluster or database. Ask your cluster administrator to grant you at minimum the **Viewer** role on the target database.

**The output panel opens but shows no results**  
The query returned an empty result set. Try adding a `| take 10` to confirm the table has data.

## Bugs

If you happen to see bugs or have suggestions for improvements visit the [issue section](https://github.com/josin/kusto-syntax-highlighting/issues) of the [repository](https://github.com/josin/kusto-syntax-highlighting).
