import { buildMacros } from '@embroider/macros/babel';

import { setConfig } from '@warp-drive/build-config';

const macros = buildMacros({
  configure(config) {
    config.setOwnConfig(import.meta.dirname, {
      supportsEmberData: true,
    });

    setConfig(config, {
      compatWith: '5.3',
    });

    if (process.env.EMBER_ENV === 'test') {
      config.enableRuntimeMode();
    }
  },
});

export default {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowDeclareFields: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        transforms: [...macros.templateMacros],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: import.meta.resolve('decorator-transforms/runtime-esm'),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: import.meta.dirname,
        useESModules: true,
        regenerator: false,
      },
    ],
    ...macros.babelMacros,
  ],

  generatorOpts: {
    compact: false,
  },
};
