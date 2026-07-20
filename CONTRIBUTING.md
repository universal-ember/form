# How To Contribute

## Installation

- `git clone git@github.com:universal-ember/form.git`
- `cd form`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Developing

To develop in this monorepo you can simply run:

- `pnpm start`

from the root directory.

This will:

- Build all of the `packages/*` and watch them for changes
- Serve the docs app and the test app (vite dev servers, ports printed on boot)

If you only need one of the apps:

- `pnpm start:docs-app`
- `pnpm start:test-app`

## Running tests

- `pnpm test`

Scenario testing (other Ember versions) uses [@embroider/try](https://github.com/embroider-build/embroider):

- `cd test-app`
- `pnpm dlx @embroider/try apply ember-lts-5.12`
- `pnpm install --no-lockfile` (from the repo root)
- `pnpm turbo test --force`

See `test-app/.try.mjs` for the available scenarios.
