import { registerDestructor } from '@ember/destroyable';
import EmbroiderRouter from '@embroider/router';

import { properLinks } from 'ember-primitives/proper-links';
import { addRoutes } from 'kolay';

import config from '#config';

@properLinks({
  ignore: ['/tests'],
})
export default class Router extends EmbroiderRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  constructor(...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    super(...(args as any[]));

    const scroll = () => window.scrollTo(0, 0);

    this.on('routeDidChange', scroll);
    registerDestructor(this, () => {
      this.off('routeDidChange', scroll);
    });
  }
}

Router.map(function () {
  addRoutes(this);
});
