# Integrating with `ember-changeset`

The [`ember-changeset`](https://github.com/poteto/ember-changeset) library provides validation capabilities, either directly or using [`ember-changeset-validations`](https://github.com/poteto/ember-changeset-validations/).
With the optional `@universal-ember/form-changeset` package you can easily integrate those into `@universal-ember/form`.

Changeset validation rules can be plain validator functions, or maps built with [`ember-changeset-validations`](https://github.com/poteto/ember-changeset-validations/)' provided validators. So if you haven't done so already, install `ember-changeset` according to its documentation. Then install `@universal-ember/form-changeset`:

```bash
pnpm add @universal-ember/form-changeset
# or
yarn add @universal-ember/form-changeset
# or
npm install @universal-ember/form-changeset
```

Next we need to define the validation map. Here we use plain validator functions — with `ember-changeset-validations` you would use its ready-made validators (`validatePresence`, `validateFormat`, …) instead; refer to their [documentation](https://github.com/poteto/ember-changeset-validations/#usage).

Finally we need to integrate the changeset and the validation map with the validation capabilities of the form:

- pass the `Changeset` instance to the form's `@data`
- the `@universal-ember/form-changeset` package provides a single `validateChangeset` helper, that provides the glue code to map the `ember-changeset` validation errors to the format `@universal-ember/form` expects. Apply it to the [`@validate` form-level callback](/3-validation/custom-validation.md#form-level-validation).
- as we need to apply all interim changes of the form data by the user to the `Changeset`, so that its validations can operate on the changed values, we need to [opt into mutable mode](/2-usage/data.md#im-mutable-data) by setting `@dataMode="mutable"`.

See the following example, where the form's validation is entirely delegated to the changeset's validations:

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';
import { validateChangeset } from '@universal-ember/form-changeset';
import { Changeset } from 'ember-changeset';
import { lookupValidator } from 'validated-changeset';

const validations = {
  name: (key, newValue) => (newValue ? true : `${key} can't be blank`),
  email: (key, newValue) =>
    /^[^@\s]+@[^@\s]+$/.test(newValue ?? '')
      ? true
      : `${key} must be a valid email address`,
};

export default class MyFormComponent extends Component {
  changeset = Changeset({}, lookupValidator(validations), validations);

  handleSubmit = ({ name, email }) => {
    alert(`Form submitted with: ${name} ${email}`);
  };

  <template>
    <HeadlessForm
      @data={{this.changeset}}
      @dataMode="mutable"
      @onSubmit={{this.handleSubmit}}
      @validate={{(validateChangeset)}}
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
