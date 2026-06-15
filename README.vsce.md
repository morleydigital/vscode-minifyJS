# minifyJS

Minify JavaScript files in VS Code using [terser](https://terser.org/) — the same minifier used under the hood by webpack, Rollup, and Vite.

Minify the active file with a command, or enable automatic minification on save. Output is written to a `.min.js` file alongside the source, with optional source map generation.

## Features

- **One-command minification** of the active JavaScript file.
- **Minify on save** — automatically, for all files or only those that already have a `.min.js`.
- **Compression & mangling** — dead-code elimination, constant folding, and identifier shortening via terser.
- **Source maps** — optionally emit a `.min.js.map` and a `sourceMappingURL` comment.
- Built on actively maintained, modern tooling (terser).

## Usage

- **Command palette** → `Minify Current JavaScript File` — minifies the currently open JavaScript file immediately.
- **On save** — set `minifyjs.minifyOnSave` to minify automatically whenever a JavaScript file is saved.

Output is written to `<filename>.min.js` in the same directory. `.min.js` files are never re-processed.

## Settings

| Setting | Default | Description |
|---|---|---|
| `minifyjs.minifyOnSave` | `"No"` | `"No"` — disabled; `"Existing"` — only if a `.min.js` already exists; `"All"` — always |
| `minifyjs.generateSourceMap` | `false` | Write a `.min.js.map` file and a `sourceMappingURL` comment |
| `minifyjs.successNotificationStatusBar` | `false` | Show a status bar message on success |
| `minifyjs.successNotificationInformationMessage` | `false` | Show an info popup on success |

## Source & issues

Source code, contributing guidelines, and issue tracker are on [GitHub](https://github.com/morleydigital/vscode-minifyJS/).
