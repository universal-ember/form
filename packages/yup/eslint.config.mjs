import { configs } from '@nullvoxpopuli/eslint-configs';

// accommodates: JS, TS, App, Addon, and V2 Addon
export default [
  ...configs.ember(import.meta.dirname),
  {
    // These helpers integrate with `yup` and forward its errors into the
    // `@universal-ember/form` `ErrorRecord` shape. Because `ErrorRecord` is a
    // generic `Partial<Record<K, ValidationError<DATA[K]>[]>>` type, typed lint
    // reports false positives around `errorRecord[key]` access — the types are
    // sound at compile time.
    files: ['src/helpers/validate-yup.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
];
