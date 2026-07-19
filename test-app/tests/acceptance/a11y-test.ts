import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { dependencySatisfies, macroCondition } from '@embroider/macros';

import { setupApplicationTest } from 'test-app/tests/helpers';

import { a11yAudit } from 'ember-a11y-testing/test-support';

// The app's route templates are components (gts), which ember-source
// supports starting with 6.3 — on older scenario versions these
// route-visiting tests cannot render.
if (macroCondition(dependencySatisfies('ember-source', '>=6.3.0'))) {
  module('Acceptance | a11y', function (hooks) {
    setupApplicationTest(hooks);

    test('form passes a11y audit', async function (assert) {
      await visit('/');

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });

    test('form passes a11y audit after validation', async function (assert) {
      await visit('/');
      await click('[data-test-submit]');

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });
}
