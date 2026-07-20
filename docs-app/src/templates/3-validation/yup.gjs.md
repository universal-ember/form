# Integrating with `yup`

[`yup`](https://github.com/jquense/yup) is a popular framework-agnostic validation library. The additional `@universal-ember/form-yup` package makes it easy to integrate `yup` based schema-validation with `@universal-ember/form`. Especially its powerful TypeScript support combined with the [TypeScript / Glint support](/4-typescript/index.md) of `@universal-ember/form` makes this a compelling solution for TypeScript users, but not only those.

First install both packages:

```bash
pnpm add yup @universal-ember/form-yup
# or
yarn add yup @universal-ember/form-yup
# or
npm install yup @universal-ember/form-yup
```

Then you need to define the `yup` schema you want to validate your form data with. Refer to their [documentation](https://github.com/jquense/yup).

Finally we need to integrate the schema with the validation capabilities of the form. The `@universal-ember/form-yup` package provides a single `validateYup` helper, that provides the glue code to map `yup` validation errors to the format `@universal-ember/form` expects. Apply it to the [`@validate` form-level callback](/3-validation/custom-validation.md#form-level-validation), passing the `yup` schema as an argument.

See the following example, where the form's validation is entirely delegated to the `yup` schema:

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';
import { validateYup } from '@universal-ember/form-yup';
import { object, string } from 'yup';

export default class MyFormComponent extends Component {
  schema = object({
    name: string().required(),
    email: string().required().email(),
  });

  handleSubmit = ({ name, email }) => {
    alert(`Form submitted with: ${name} ${email}`);
  };

  <template>
    <HeadlessForm
      @onSubmit={{this.handleSubmit}}
      @validate={{validateYup this.schema}}
      as |form|
    >
      <form.Field @name="name" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Name</field.Label>
          <field.Input class="border rounded px-2" />
          <field.Errors />
        </div>
      </form.Field>

      <form.Field @name="email" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <field.Input class="border rounded px-2" />
          <field.Errors />
        </div>
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

</div>
