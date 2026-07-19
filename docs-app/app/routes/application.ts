import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { setupHLJS } from '@crowdstrike/ember-oss-docs/utils/highlighting';
import { type ThemeManager, THEMES } from '@crowdstrike/ember-toucan-styles';

export default class Application extends Route {
  @service declare themeManager: ThemeManager;

  beforeModel() {
    this.themeManager.setup(THEMES.LIGHT);
  }

  afterModel() {
    const owner = getOwner(this);

    assert('Expected the application route to have an owner', owner);

    void setupHLJS(owner);
  }
}
