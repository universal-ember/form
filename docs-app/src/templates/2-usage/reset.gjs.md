# Resetting form state

As explained in the chapter for [Updating data](/2-usage/data.md#updating-data), form state consists of the original immutable data passed to `@data` and "dirty" changed state. To keep the form component in place but get rid of the dirty state, you need to explicitly call a `reset` action on the form. There are different ways to do that:

- use "the platform" and make the user click on a `<button type="reset">`
- use the yielded `reset` action

For the latter case, this is easy to do when the place where you want to call `reset` is within the block of `<HeadlessForm as |form|>`. For example you can pass it to the `on` modifier, as in `{{on "click" form.reset}}`.

However there is another interesting use case where you might want to reset form state from "outside" the component, for example in a parent component's action. The problem here is that you do not have access to the yielded `reset` action there.
But you can follow the following pattern to solve that:

- create a function/method that receives the `reset` action (it's just a function) and assign it to the context where you will later be able to access it
- invoke that function as a helper (in modern Ember, helpers are really just functions) within the form template block where you have access to the scope of the yielded `form` API
- call this registered reset function whenever you need to

Note that besides resetting dirty data, the form will also reset any [validation](/3-validation/index.md) state and errors it might have had before!

The following kitchen-sink like example shows all three ways to reset form state:

- by clicking the native reset button
- by clicking the link, using the yielded `reset` action
- by calling `reset` using the register pattern described above when selecting a different user

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  users = [
    {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    {
      firstName: 'John',
      lastName: 'Smith',
    },
  ];

  @tracked
  selectedIndex = 0;

  resetForm;

  assignReset = (reset) => {
    this.resetForm = reset;
  };

  get currentUser() {
    return this.users[this.selectedIndex];
  }

  selectUser = (index) => {
    this.selectedIndex = index;
    this.resetForm?.();
  };

  handleSubmit = ({ firstName, lastName }) => {
    alert(`Form submitted with: ${firstName} ${lastName}`);
  };

  <template>
    <div class="flex gap-8">
      <div class="flex-initial">
        Select user:
        <ul>
          {{#each this.users as |user index|}}
            <li><a
                class="cursor-pointer"
                {{on "click" (fn this.selectUser index)}}
              >{{user.firstName}}
                {{user.lastName}}</a></li>
          {{/each}}
        </ul>
      </div>

      <HeadlessForm
        @data={{this.currentUser}}
        @onSubmit={{this.handleSubmit}}
        class="flex-1"
        as |form|
      >
        {{(this.assignReset form.reset)}}

        <form.Field @name="firstName" as |field|>
          <div class="my-2 flex flex-col">
            <field.Label>First name</field.Label>
            <field.Input required class="border rounded px-2" />
            <field.Errors />
          </div>
        </form.Field>

        <form.Field @name="lastName" as |field|>
          <div class="my-2 flex flex-col">
            <field.Label>Last name</field.Label>
            <field.Input required class="border rounded px-2" />
            <field.Errors />
          </div>
        </form.Field>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>

        <p>Click on the reset button above or
          <a {{on "click" form.reset}}>here</a>
          to reset any dirty state</p>
      </HeadlessForm>
    </div>
  </template>
}
```

</div>
