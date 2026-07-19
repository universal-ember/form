import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';

import Application from 'ember-strict-application-resolver';

export default class App extends Application {
  modules = {
    ...import.meta.glob('./router.ts', { eager: true }),
    ...import.meta.glob('./templates/**/*.gts', { eager: true }),
    ...import.meta.glob('./controllers/**/*.ts', { eager: true }),
    ...import.meta.glob('./models/**/*.ts', { eager: true }),
    ...import.meta.glob('./services/**/*.ts', { eager: true }),
  };
  inspector = setupInspector(this);
}
