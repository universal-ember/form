// Scenario testing via @embroider/try.
//
// `pnpm dlx @embroider/try list` emits the CI matrix,
// `pnpm dlx @embroider/try apply <name>` mutates this package for a scenario.
//
// Ember versions before the vite-first blueprint (< 6) need the classic
// compat build, which swaps in its own vite/babel configs and build files.
const compatFiles = {
  'ember-cli-build.cjs': `const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');
  let app = new EmberApp(defaults);
  return compatBuild(app, buildOnce);
};`,
  'config/optional-features.json': JSON.stringify({
    'application-template-wrapper': false,
    'default-async-observers': true,
    'jquery-integration': false,
    'template-only-glimmer-components': true,
    'no-implicit-route-model': true,
  }),
  'vite.config.mjs': `import { defineConfig } from 'vite';
import { extensions, ember, classicEmberSupport } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'inline',
      extensions,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        tests: 'tests/index.html',
      },
    },
  },
});`,
  'babel.config.js': `import { buildMacros } from '@embroider/macros/babel';
import {
  babelCompatSupport,
  templateCompatSupport,
} from '@embroider/compat/babel';

const macros = buildMacros({
  configure(config) {
    config.setOwnConfig(import.meta.dirname, {
      supportsEmberData: true,
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
        transforms: [...templateCompatSupport()],
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
    ...babelCompatSupport(),
  ],

  generatorOpts: {
    compact: false,
  },
};`,
};

// The classic compat pipeline predates (rolldown-)vite 8, so compat
// scenarios also pin the vite 7 toolchain that @embroider/vite supports.
const compatDeps = {
  '@embroider/compat': '^4.1.5',
  '@embroider/vite': '^1.1.5',
  '@ember/optional-features': '^2.2.0',
  '@rollup/plugin-babel': '^6.0.4',
  'ember-auto-import': '^2.10.0',
  'ember-cli': '^6.4.0',
  vite: '^7.1.9',
};

export default {
  scenarios: [
    {
      name: 'ember-lts-5.8',
      npm: {
        devDependencies: {
          'ember-source': '~5.8.0',
          ...compatDeps,
        },
      },
      env: {
        ENABLE_COMPAT_BUILD: true,
      },
      files: compatFiles,
    },
    {
      name: 'ember-lts-5.12',
      npm: {
        devDependencies: {
          'ember-source': '~5.12.0',
          ...compatDeps,
        },
      },
      env: {
        ENABLE_COMPAT_BUILD: true,
      },
      files: compatFiles,
    },
    {
      name: 'ember-lts-6.4',
      npm: {
        devDependencies: {
          'ember-source': '~6.4.0',
        },
      },
    },
    {
      name: 'ember-latest',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@latest',
        },
      },
    },
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@beta',
        },
      },
    },
    {
      name: 'ember-alpha',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@alpha',
        },
      },
    },
  ],
};
