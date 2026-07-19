import type { HelperLike } from '@glint/template';
import type HeadlessFormRegistry from '@universal-ember/form/template-registry';
import type HeadlessFormYupRegistry from '@universal-ember/form-yup/template-registry';

// Types for compiled templates
// declare module 'test-app/templates/*' {
//   import { TemplateFactory } from 'ember-cli-htmlbars';

//   const tmpl: TemplateFactory;
//   export default tmpl;
// }

declare module '@glint/template/registry' {
  export default interface Registry
    extends HeadlessFormRegistry,
      HeadlessFormYupRegistry {
    'page-title': HelperLike<{
      Args: { Positional: [title: string] };
      Return: void;
    }>;
  }
}
