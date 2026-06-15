// extension.js
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const terser = require('terser');

function activate(context) {
	function isJsDoc(document) {
		return document && document.languageId === 'javascript';
	}

	async function minifyJS(document, showStatus = true) {
		if (!isJsDoc(document)) return;

		const inputPath = document.fileName;

		// Avoid re-minifying .min.js files
		if (inputPath.toLowerCase().endsWith('.min.js')) {
			if (showStatus) vscode.window.setStatusBarMessage('File already appears to be minified.', 5000);
			return;
		}

		const js = document.getText();
		if (!js.trim().length) {
			if (showStatus) vscode.window.setStatusBarMessage('File is empty, nothing to minify.', 5000);
			return;
		}

		const config = vscode.workspace.getConfiguration('minifyjs');
		const generateSourceMap = config.get('generateSourceMap', false);
		const successNotificationStatusBar = config.get('successNotificationStatusBar', false);
		const successNotificationInformationMessage = config.get('successNotificationInformationMessage', false);

		const outName = inputPath.replace(/\.js$/i, '.min.js');
		const sourceMapName = `${outName}.map`;
		const fileName = path.basename(inputPath);

		try {

			const terserOptions = {
				sourceMap: generateSourceMap ? { filename: path.basename(outName), url: path.basename(sourceMapName) } : false,
				compress: true,
				mangle: true,
			};

			const result = await terser.minify({ [fileName]: js }, terserOptions);

			if (!result.code) throw new Error('Terser produced no output');

			// result.code and (optionally) result.map
			fs.writeFileSync(outName, result.code);

			if (generateSourceMap && result.map) {
				const mapString = typeof result.map === 'string' ? result.map : result.map.toString();
				fs.writeFileSync(sourceMapName, mapString);
			}

			if (successNotificationStatusBar) {
				vscode.window.setStatusBarMessage(`${fileName} was minified successfully.`, 5000);
			}
			if (successNotificationInformationMessage) {
				vscode.window.showInformationMessage(`✅ ${fileName} was minified successfully.`);
			}
		} catch (err) {
			vscode.window.showErrorMessage('Minification failed: ' + (err && err.message ? err.message : String(err)));
		}
	}

	// Version info command
	const versionDisposable = vscode.commands.registerCommand('minifyjs.showVersions', () => {
		const terserVersion = require('terser/package.json').version;
		vscode.window.showInformationMessage(`minifyJS — terser v${terserVersion}`);
	});
	context.subscriptions.push(versionDisposable);

	// Manual command
	const disposable = vscode.commands.registerCommand('minifyjs.minify', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document) {
			await minifyJS(editor.document, true);
		}
	});
	context.subscriptions.push(disposable);

	// Auto minify on save
	const saveListener = vscode.workspace.onDidSaveTextDocument((doc) => {
		if (!isJsDoc(doc)) return;

		const config = vscode.workspace.getConfiguration('minifyjs');
		const mode = config.get('minifyOnSave', 'No'); // "No" | "Existing" | "All"
		if (mode === 'No') return;

		// Don’t immediately re-minify minified files
		if (doc.fileName.toLowerCase().endsWith('.min.js')) return;

		const inputPath = doc.fileName;
		const outPath = inputPath.replace(/\.js$/i, '.min.js');

		if (mode === 'Existing') {
			if (fs.existsSync(outPath)) minifyJS(doc, true);
		} else if (mode === 'All') {
			minifyJS(doc, true);
		}
	});
	context.subscriptions.push(saveListener);
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
