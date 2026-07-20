# @universal-ember/form

[![CI](https://github.com/universal-ember/form/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/universal-ember/form/actions/workflows/ci.yml)

The Ember.js library that distills the common behavior and accessibility best practices of forms into reusable components, without any opinions on specific markup or styling. Use it to build your forms directly, or to build your opinionated forms component kit on top of it.

## Key Features

- Semantic form markup with accessibility best practices baked in
- Integrates native HTML5 validation with custom error rendering
- Extension points for custom JavaScript-based validation
- Optional ready-to-use integrations for `ember-changeset` and `yup` based validation
- Support for async state
- TypeScript / Glint support with tight types
- Fully tested

## Compatibility

- Ember.js v4.4 or above (CI-verified on v5.8+)
- a modern (vite) app, or a classic build via ember-auto-import v2 / Embroider

## Installation

```
pnpm add @universal-ember/form
```

## Usage

Visit our [documentation website](https://ue-form.pages.dev/).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Credits

Originally from [CrowdStrike's ember-headless-form](https://github.com/crowdstrike/ember-headless-form)

## License

This project is licensed under the [MIT License](LICENSE.md).
