import { configs, disableTypedLints } from '@nullvoxpopuli/eslint-configs';

// accommodates: JS, TS, App, Addon, and V2 Addon
export default [
  ...configs.ember(import.meta.dirname),
  // Test files exercise the public API of `@universal-ember/form` (a workspace
  // package). When the workspace package hasn't been built yet, its type
  // declarations aren't available and every typed lint rule reports false
  // positives. Turn them off for tests.
  disableTypedLints.forTests,
];
