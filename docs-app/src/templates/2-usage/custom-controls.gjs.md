# Custom controls

Instead of using the [built-in control components](/2-usage/controls.md) you can also integrate any existing components in your codebase. The components provided by `@universal-ember/form` give you the benefit that everything is wired up for you automatically. When using custom components, you will need to wire up data flow and accessibility.

In the following example we assume a `<CustomInput>` component, that supports `@value` and `@onChange` arguments to pass data into and out of the component. To integrate it into our form, the `Field` component yields:

- `id`: an auto-generated ID that you can set as the `id` of the control, so that the control is correctly associated to its `<label>`, which uses the same ID as its `for` attribute already.
- `value`: the current value of the given field. Pass it to the control.
- `setValue`: an action that receives a (new) value to set it on the internal form data object. This will make the new value available for [form submission](/2-usage/data.md) and [validation](/3-validation/index.md).

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { HeadlessForm } from '@universal-ember/form';

const CustomInput = <template>
  <input
    value={{@value}}
    class="border-2 border-purple-500 rounded px-2"
    {{on "input" (pick "target.value" @onChange)}}
    ...attributes
  />
</template>;

function pick(path, action) {
  return (event) => {
    let value = path.split('.').reduce((obj, key) => obj?.[key], event);

    action(value);
  };
}

export default class MyFormComponent extends Component {
  data = { email: 'jane.doe@example.com' };

  handleSubmit = ({ email }) => {
    alert(`Form submitted with: ${email}`);
  };

  <template>
    <HeadlessForm @data={{this.data}} @onSubmit={{this.handleSubmit}} as |form|>
      <form.Field @name="email" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <CustomInput
            @value={{field.value}}
            @onChange={{field.setValue}}
            id={{field.id}}
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

</div>
