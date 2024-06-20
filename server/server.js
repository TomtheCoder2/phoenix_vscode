// server/server.js
const {
    createConnection,
    TextDocuments,
    DiagnosticSeverity,
    ProposedFeatures,
    InitializeParams
  } = require('vscode-languageserver');
  
  const connection = createConnection(ProposedFeatures.all);
  const documents = new TextDocuments();
  
  connection.onInitialize((params) => {
    return {
      capabilities: {
        textDocumentSync: documents.syncKind,
        // Add other server capabilities here
      }
    };
  });
  
  documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
  });
  
  function validateTextDocument(textDocument) {
    const text = textDocument.getText();
    const diagnostics = [];
  
    // Basic example of detecting an invalid statement
    const pattern = /invalid_statement/g;
    let match;
    while ((match = pattern.exec(text))) {
      const diagnostic = {
        severity: DiagnosticSeverity.Error,
        range: {
          start: textDocument.positionAt(match.index),
          end: textDocument.positionAt(match.index + match[0].length)
        },
        message: `${match[0]} is invalid`,
        source: 'ex'
      };
      diagnostics.push(diagnostic);
    }
  
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }
  
  documents.listen(connection);
  connection.listen();
  