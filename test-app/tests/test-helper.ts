import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';

import sinon from 'sinon';
import Application from 'test-app/app';
import config from 'test-app/config';

export function start() {
  config.locationType = 'none';
  config.APP.rootElement = '#ember-testing';
  config.APP.autoboot = false;

  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();

  // previously provided by ember-sinon-qunit
  QUnit.testDone(() => sinon.restore());

  qunitStart();
}
