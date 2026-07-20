import Route from '@ember/routing/route';

import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { setupTabster } from 'ember-primitives/tabster';
import { setupKolay } from 'kolay/setup';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

import { Callout } from '@universal-ember/docs-support';

import { APIDocs, ComponentSignature } from './api-docs.gts';

export default class Application extends Route {
  async model() {
    const highlighter = await createHighlighterCore({
      themes: [
        import('shiki/themes/github-dark.mjs'),
        import('shiki/themes/github-light.mjs'),
      ],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/diff.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/glimmer-js.mjs'),
        import('shiki/langs/glimmer-ts.mjs'),
        import('shiki/langs/handlebars.mjs'),
        import('shiki/langs/jsonc.mjs'),
        import('shiki/langs/markdown.mjs'),
      ],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });

    const [manifest] = await Promise.all([
      setupTabster(this),
      setupKolay(this, {
        topLevelScope: {
          Callout,
          APIDocs,
          ComponentSignature,
        },
        modules: {
          // this repo's libraries
          '@universal-ember/form': () => import('@universal-ember/form'),
          '@universal-ember/form-yup': () =>
            import('@universal-ember/form-yup'),
          '@universal-ember/form-changeset': () =>
            import('@universal-ember/form-changeset'),

          // demo dependencies
          yup: () => import('yup'),
          'ember-changeset': () => import('ember-changeset'),
          'validated-changeset': () => import('validated-changeset'),

          // community libraries
          'ember-resources': () => import('ember-resources'),
          'tracked-built-ins': () => import('tracked-built-ins'),
          'ember-primitives': () => import('ember-primitives'),
          kolay: () => import('kolay'),
        },
        rehypePlugins: [
          [
            rehypeShikiFromHighlighter,
            highlighter,
            {
              defaultColor: false,
              themes: {
                light: 'github-light',
                dark: 'github-dark',
              },
            },
          ],
        ],
      }),
    ]);

    return { manifest };
  }
}
