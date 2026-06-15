# Changelog

All notable changes to the **minifyJS** extension are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

### Added
- Initial release.
- Minify the active JavaScript file via the **Minify Current JavaScript File** command.
- Automatic minification on save (`minifyjs.minifyOnSave`: `No` / `Existing` / `All`).
- Optional source map generation (`minifyjs.generateSourceMap`).
- Optional success notifications in the status bar and as information messages.
- **Show terser Version** command (`minifyjs.showVersions`) reporting the bundled terser version.
