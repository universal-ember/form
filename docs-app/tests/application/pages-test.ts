import { findAll, settled, visit, waitUntil } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { colorScheme } from 'ember-primitives/color-scheme';
import { docsManager } from 'kolay';

import { a11yAudit } from 'ember-a11y-testing/test-support';

/**
 * per-page a11y rule overrides
 */
const a11yChecks: {
  [url: string]: {
    [checkName: string]: Record<string, unknown>;
  };
} = {};

/**
 * a11yAudit halts tests, this gets around that
 */
async function checkA11y(
  assert: Assert,
  path: string,
  theme: string,
  settings: object,
) {
  await settled();

  try {
    await a11yAudit({
      rules: {
        // TODO: find a syntax highlighting theme
        //       with better contrast
        'color-contrast': {
          enabled: false,
        },
        ...settings,
      },
    });
    assert.ok(
      true,
      `no a11y errors found for ${path} using the ${theme} theme`,
    );
  } catch (e) {
    let errorText = '';

    if (typeof e === 'object') {
      if (e && 'message' in e && typeof e.message === 'string') {
        errorText = e.message;
      }
    }

    const message =
      `${path}: no a11y errors found using the ${theme} theme` +
      `\n\n` +
      errorText;

    if (window.location.search.includes('debugA11yAudit')) {
      console.error(errorText);
    }

    assert.ok(false, message);
  }
}

module('Application | Pages', function (hooks) {
  setupApplicationTest(hooks);

  test('Pages all render and fit a11y criteria', async function (assert) {
    // every page is visited and audited three times
    // (default / dark / light theme)
    assert.timeout(600_000);

    await visit('/');

    const pages: { path: string }[] = [];

    const docsService = docsManager(this);
    const groups = docsService.manifest.groups;

    for (const group of groups) {
      for (const page of group.list) {
        pages.push(page);
      }
    }

    assert.ok(pages.length > 10, `There are at least a few pages`);

    for (const page of pages) {
      const path = page.path.replace('.gjs.md', '').replace('.md', '');
      const settings: object = a11yChecks[page.path] ?? {};

      await visit(path);
      await waitUntil(() => findAll('nav a').length !== 0);

      for (const theme of ['default', 'dark', 'light'] as const) {
        if (theme === 'dark') colorScheme.update('dark');
        if (theme === 'light') colorScheme.update('light');
        await checkA11y(assert, path, theme, settings);
      }

      assert
        .dom('[data-page-error]')
        .doesNotExist(`${page.path}: does not contain [data-page-error]`);
    }
  });
});
