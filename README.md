# minifyJS

VS Code extension to minify JavaScript files using [terser](https://terser.org/). Minify the active file with a command or enable automatic minification on save. Outputs a `.min.js` file alongside the source, with optional source map generation.

### Why we created this extension
Whilst there are a number of JavaScript minification extensions available on the VS Code extensions marketplace, most have not been updated in several years, or use outdated minification libraries that are no longer actively maintained.

### Why we chose terser as a minification library
terser is the de-facto standard JavaScript minifier in the modern JavaScript ecosystem, used under the hood by webpack, Rollup, Vite, and many other build tools. It is actively maintained, well documented, and supports modern ECMAScript syntax, producing reliably small output through compression (dead-code elimination, constant folding) and name mangling.

## Usage

- **Command palette** → `Minify Current JavaScript File` — minifies the currently open JavaScript file immediately.
- **On save** — configure `minifyOnSave` to minify automatically whenever a JavaScript file is saved.

Output is written to `<filename>.min.js` in the same directory. `.min.js` files are never re-processed.

## Settings

| Setting | Default | Description |
|---|---|---|
| `minifyjs.minifyOnSave` | `"No"` | `"No"` — disabled; `"Existing"` — only if a `.min.js` already exists; `"All"` — always |
| `minifyjs.generateSourceMap` | `false` | Write a `.min.js.map` file and a `sourceMappingURL` comment |
| `minifyjs.successNotificationStatusBar` | `false` | Show a status bar message on success |
| `minifyjs.successNotificationInformationMessage` | `false` | Show an info popup on success |

## Test suite

The `test/` directory contains a runner for verifying that minification preserves runtime behaviour.

```
test/
  js/
    test1-basic.js          # source JS files
    test2-es6.js
    test3-edgecases.js
  index.html                # behaviour comparison runner
```

Each source file computes a deterministic result and assigns it to `window.__result`. The runner executes the original and the minified version of each file in isolated iframes and compares the two results — a match means terser preserved the program's behaviour. The three files cover core language features, modern ES6+ syntax, and minifier-sensitive edge cases (regex, operator precedence, optional chaining, etc.).

To use it:
1. Open the three source JS files in VS Code and run **Minify Current JavaScript File** (or save with `minifyOnSave` enabled) to generate the `.min.js` output files.
2. Open `test/index.html` in a browser.
3. Each row shows the original/minified size, the saving, and a **pass** / **MISMATCH** result. Expand a row to inspect the result (or the diff on failure).

## Packaging

```bash
# Install node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash
sudo apt install nodejs -y

# Install dependencies
npm install

# Package as .vsix
npm run package
```

> **Note:** package via `npm run package`, not a bare `vsce package`. The
> npm script runs `vsce package --readme-path README.vsce.md`, which bundles
> the Marketplace-specific README (`README.vsce.md`) instead of this GitHub
> README. A plain `vsce package` would ship the wrong README in the VSIX (and
> in the VS Code "Details" tab). The script uses `npx`, so a global `vsce`
> install isn't required.

## Changelog
- 1.0.0 - Initial release

## Roadmap
🔲 Add options to customise terser compress/mangle behaviour  
🔲 Improve success message to include minification stats (eg. original file size, minified file size, saving)  
🔲 Bundle using webpack and modify codebase to support vscode.dev
