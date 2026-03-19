import * as vscode from 'vscode';
import { Client, KustoConnectionStringBuilder } from 'azure-kusto-data';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext): void {
    outputChannel = vscode.window.createOutputChannel('Kusto Results');

    const runQueryCommand = vscode.commands.registerCommand('kusto.runQuery', runQuery);

    context.subscriptions.push(runQueryCommand, outputChannel);
}

async function runQuery(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active Kusto editor found.');
        return;
    }

    const config = vscode.workspace.getConfiguration('kusto');
    const clusterUrl = config.get<string>('clusterUrl', '').trim();
    const database = config.get<string>('database', '').trim();
    const loginMode = config.get<string>('loginMode', 'AzureLogin');

    if (!clusterUrl) {
        const action = await vscode.window.showErrorMessage(
            'Kusto cluster URL is not configured. Please set "kusto.clusterUrl" in settings.',
            'Open Settings'
        );
        if (action === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'kusto.clusterUrl');
        }
        return;
    }

    if (!database) {
        const action = await vscode.window.showErrorMessage(
            'Kusto database is not configured. Please set "kusto.database" in settings.',
            'Open Settings'
        );
        if (action === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'kusto.database');
        }
        return;
    }

    const selection = editor.selection;
    const query = selection.isEmpty
        ? editor.document.getText()
        : editor.document.getText(selection);

    if (!query.trim()) {
        vscode.window.showWarningMessage('No Kusto query found to run.');
        return;
    }

    outputChannel.show(true);
    outputChannel.appendLine('');
    outputChannel.appendLine(`[${new Date().toISOString()}] Running query on ${clusterUrl} / ${database}`);
    outputChannel.appendLine('─'.repeat(80));

    try {
        const kcsb = buildConnectionString(clusterUrl, loginMode);
        const client = new Client(kcsb);

        const results = await client.execute(database, query);

        if (!results.primaryResults || results.primaryResults.length === 0) {
            outputChannel.appendLine('(no results)');
        } else {
            const table = results.primaryResults[0];
            if (table._rows.length === 0) {
                outputChannel.appendLine('(no results)');
            } else {
                const columns = table.columns.map((c, i) => c.name ?? `Column_${i}`);
                const rows = Array.from(table.rows()).map((row) => Array.from(row.values()));
                renderTable(columns, rows);
            }
        }

        outputChannel.appendLine('─'.repeat(80));
        outputChannel.appendLine(`Query completed successfully.`);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        outputChannel.appendLine(`ERROR: ${message}`);
        outputChannel.appendLine('─'.repeat(80));
        vscode.window.showErrorMessage(`Kusto query failed: ${message}`);
    }
}

function buildConnectionString(
    clusterUrl: string,
    loginMode: string
): KustoConnectionStringBuilder {
    switch (loginMode) {
        case 'InteractiveLogin':
            return KustoConnectionStringBuilder.withUserPrompt(clusterUrl);
        case 'ManagedIdentity':
            return KustoConnectionStringBuilder.withSystemManagedIdentity(clusterUrl);
        case 'AzureLogin':
        default:
            return KustoConnectionStringBuilder.withAzLoginIdentity(clusterUrl);
    }
}

function renderTable(columns: string[], rows: unknown[][]): void {
    const colWidths = columns.map((c) => c.length);
    for (const row of rows) {
        row.forEach((cell, i) => {
            const len = String(cell ?? '').length;
            if (len > colWidths[i]) {
                colWidths[i] = len;
            }
        });
    }

    const pad = (s: string, w: number) => s.padEnd(w);
    const header = columns.map((c, i) => pad(c, colWidths[i])).join(' | ');
    const separator = colWidths.map((w) => '-'.repeat(w)).join('-+-');

    outputChannel.appendLine(header);
    outputChannel.appendLine(separator);

    for (const row of rows) {
        const line = row.map((cell, i) => pad(String(cell ?? ''), colWidths[i])).join(' | ');
        outputChannel.appendLine(line);
    }

    outputChannel.appendLine('');
    outputChannel.appendLine(`${rows.length} row(s) returned.`);
}

export function deactivate(): void {
    // nothing to clean up
}
