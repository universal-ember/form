# Adding custom JavaScript-based validation

When you reach the limits of [native validation](/3-validation/native.md) or have needs for more customization, you can use custom JavaScript-based validation. The basic mode of operation is that whenever validation needs to happen (see [Validation timing](/3-validation/timing.md)) a callback function you provide is called, which is supposed to just return (`undefined`) when there are no validation errors, or otherwise return the list of [`ValidationError` objects](/3-validation/index.md#validation-errors).

## Form level validation

You can pass a _form level_ validation callback to the form via the `@validate` argument. Form level means that it will be called for the whole form data object, and when invalid needs to return an [`ErrorRecord`](/3-validation/index.md#validation-errors) mapping the invalid field names to their respective array of `ValidationError`s. This is especially useful if you already have a way to validate your data object which the form represents, as with some kind of schema-based validation. (e.g. [yup](/3-validation/yup.md) or [ember-changeset](/3-validation/ember-changeset.md))

This demo shows how to apply a validator function to the whole form. It receives the form data, and returns a validation error if the two email fields do not match:

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  validateEmail = ({ email, email_confirmation }) => {
    if (email !== email_confirmation) {
      return {
        email_confirmation: [
          {
            type: 'emailConfirmationMatch',
            value: email_confirmation,
            message: `Entered email addresses do not match: ${email} does not equal ${email_confirmation}`,
          },
        ],
      };
    }
  };

  handleSubmit = ({ email }) => {
    alert(`Form submitted with: ${email}`);
  };

  <template>
    <HeadlessForm
      @onSubmit={{this.handleSubmit}}
      @validate={{this.validateEmail}}
      as |form|
    >
      <form.Field @name="email" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <field.Input
            @type="email"
            required
            placeholder="Enter your email address"
            class="border rounded px-2"
          />
          <field.Errors />
        </div>
      </form.Field>

      <form.Field @name="email_confirmation" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email (enter again)</field.Label>
          <field.Input
            @type="email"
            required
            placeholder="Please enter your email again to confirm"
            class="border rounded px-2"
          />
          <field.Errors />
        </div>
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

</div>

## Field level validation

The `Field` component also supports a `@validate` argument, which is only called for that specific field. It will receive as arguments the current value, the name of the field and the current form data object. In the invalid case it needs to return an array of [`ValidationError`](/3-validation/index.md#validation-errors).

Here we apply a validation function directly to a field, checking only the validity of that single field:

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  validateEmailHost = (email) => {
    if (email && !email.endsWith('@example.com')) {
      return [
        {
          type: 'emailHostInvalid',
          value: email,
          message: 'Email address must belong to example.com!',
        },
      ];
    }
  };

  handleSubmit = ({ email }) => {
    alert(`Form submitted with: ${email}`);
  };

  <template>
    <HeadlessForm @onSubmit={{this.handleSubmit}} as |form|>
      <form.Field @name="email" @validate={{this.validateEmailHost}} as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <field.Input
            @type="email"
            required
            placeholder="Enter your email address"
            class="border rounded px-2"
          />
          <field.Errors />
        </div>
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

</div>

## Validation error merging

We now have learned about three sources of validation errors: [native validation](/3-validation/native.md) as well as [form-level](#form-level-validation) and [field-level](#field-level-validation) custom validation. And these sources are not mutually-exclusive, but can actually be combined together. `@universal-ember/form` will merge validation errors coming from all these sources, making them available when [rendering validation errors](/3-validation/index.md#rendering-validation-errors).

This allows you for example to cover the basic validation requirements like `required` fields or specific input types using native validation, while adding more complex validations using custom validation that cannot be expressed with the native capabilities.

Form-level, field-level and native validation all combined:

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  validateEmail = ({ email, email_confirmation }) => {
    if (email !== email_confirmation) {
      return {
        email_confirmation: [
          {
            type: 'emailConfirmationMatch',
            value: email_confirmation,
            message: `Entered email addresses do not match: ${email} does not equal ${email_confirmation}`,
          },
        ],
      };
    }
  };

  validateEmailHost = (email) => {
    if (email && !email.endsWith('@example.com')) {
      return [
        {
          type: 'emailHostInvalid',
          value: email,
          message: 'Email address must belong to example.com!',
        },
      ];
    }
  };

  handleSubmit = ({ email }) => {
    alert(`Form submitted with: ${email}`);
  };

  <template>
    <HeadlessForm
      @onSubmit={{this.handleSubmit}}
      @validate={{this.validateEmail}}
      as |form|
    >
      <form.Field @name="email" @validate={{this.validateEmailHost}} as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <field.Input
            @type="email"
            required
            placeholder="Enter your email address"
            class="border rounded px-2"
          />
          <field.Errors />
        </div>
      </form.Field>

      <form.Field @name="email_confirmation" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email (enter again)</field.Label>
          <field.Input
            @type="email"
            required
            placeholder="Please enter your email again to confirm"
            class="border rounded px-2"
          />
          <field.Errors />
        </div>
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

</div>

## Asynchronous validation

In the examples above we only dealt with synchronous validation, which usually will cover most needs. But `@universal-ember/form` also supports async validation functions. So when the function returns the `ValidationError` array or the `ErrorRecord` wrapped in a `Promise`, it will correctly await that before proceeding. This allows you to add validations that need to be async in nature. For example to check the validity of a username not being taken already during signing up, you can have an async validation function that sends a `fetch` request to some API endpoint.
