"use strict";
// client/extension.js
const path = require('path');
const vscode = require('vscode');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');
function activate(context) {
    const serverModule = context.asAbsolutePath(path.join('server', 'server.js'));
    const serverOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc }
    };
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'phx' }],
    };
    const client = new LanguageClient('phxLanguageServer', 'Phoenix Language Server', serverOptions, clientOptions);
    context.subscriptions.push(client.start());
}
function deactivate() { }
module.exports = {
    activate,
    deactivate
};
//# sourceMappingURL=extension.js.map