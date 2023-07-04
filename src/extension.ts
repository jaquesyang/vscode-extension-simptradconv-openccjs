import * as vscode from 'vscode';
const OpenCC = require('opencc-js');


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('simptradconv.conv2simp', (editor) => {
		return editor.edit(builder => {
			editor.selections.forEach(selection => {
				const range = new vscode.Range(selection.start, selection.end);
				const text = editor.document.getText(range) || '';

				const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
				builder.replace(selection, converter(text));
			});
		});
	}));


	context.subscriptions.push(vscode.commands.registerTextEditorCommand('simptradconv.conv2trad', (editor) => {
		return editor.edit(builder => {
			editor.selections.forEach(selection => {
				const range = new vscode.Range(selection.start, selection.end);
				const text = editor.document.getText(range) || '';

				const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
				builder.replace(selection, converter(text));
			});
		});
	}));
}

export function deactivate() { }
