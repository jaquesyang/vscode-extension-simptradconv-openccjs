import * as vscode from 'vscode';
const opencc = require('opencc-js');


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('simptradconv.conv2simp', (editor) => {
			return convert(editor, 'tw', 'cn');
		}));


	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('simptradconv.conv2trad', (editor) => {
			return convert(editor, 'cn', 'tw');
		}));
}

function convert(editor: vscode.TextEditor, from: string, to: string) {
	return editor.edit(builder => {
		editor.selections.forEach(selection => {
			const range = new vscode.Range(selection.start, selection.end);
			const text = editor.document.getText(range) || '';

			const converter = opencc.Converter({ from: from, to: to });
			builder.replace(selection, converter(text));
		});
	});
}

export function deactivate() { }
