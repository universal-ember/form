# Managing asynchronous state

`@universal-ember/form` knows about two events that can be asynchronous:

- **validation** will often be synchronous, but you can also define [asynchronous validations](/3-validation/custom-validation.md#asynchronous-validation) for e.g. validating data on the server
- **submission** is most often asynchronous when e.g. sending a `POST` request with your form data to the server

To make the form aware of the asynchronous submission process, you just need to return a Promise from the submit callback passed to [`@onSubmit`](/2-usage/data.md#getting-data-out).

`@universal-ember/form` will then make the async state of both these events available to you in the template. This allows for use cases like

- disabling the submit button while a submission is ongoing
- showing a loading indicator while submission or validation is pending
- rendering the results of the (either successful or failed) submission, after it is resolved/rejected

To enable these, the form component is yielding `validationState` and `submissionState` objects with these properties:

- `isPending`
- `isResolved`
- `isRejected`
- `value` (when resolved)
- `error` (when rejected)

These derived properties are fully reactive and typed, as these are provided by the excellent [ember-async-data](https://github.com/tracked-tools/ember-async-data) library. Refer to their documentation for additional details!

Submit this form with a valid email, and with the same email again, to see how it disables the submit button, changes its label, and shows error messages coming from the "backend":

<div class="featured-demo" data-demo-fit data-demo-tight>

```gjs live preview no-shadow
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  saved = [];

  handleSubmit = async ({ email }) => {
    // pretending something async is happening here
    await new Promise((r) => setTimeout(r, 3000));

    if (!email) {
      throw new Error('No email given');
    }

    if (this.saved.includes(email)) {
      // Throwing this error will cause the form to yield form.submissionState.isRejected as true
      throw new Error(`${email} is already taken!`);
    }

    this.saved.push(email);
  };

  <template>
    <HeadlessForm @onSubmit={{this.handleSubmit}} as |form|>
      <form.Field @name="email" as |field|>
        <div class="my-2 flex flex-col">
          <field.Label>Email</field.Label>
          <field.Input
            @type="email"
            placeholder="Please enter your email"
            class="border rounded px-2"
          />
        </div>
      </form.Field>

      <button type="submit" disabled={{form.submissionState.isPending}}>
        {{if form.submissionState.isPending "Submitting..." "Submit"}}
      </button>

      {{#if form.submissionState.isResolved}}
        <p>We got your data! 🎉</p>
      {{else if form.submissionState.isRejected}}
        <p>⛔️ {{form.submissionState.error}}</p>
      {{/if}}
    </HeadlessForm>
  </template>
}
```

</div>
