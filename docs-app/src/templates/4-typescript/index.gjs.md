# Using with TypeScript / Glint

This library is written in TypeScript, and strives to give TypeScript users a first-class experience. It will be mostly used within templates, which TypeScript does not understand unfortunately. Here [Glint](https://github.com/typed-ember/glint) comes to the rescue, which will make strict type checking available in templates.

## Usage with template tag (gjs/gts)

All the components, which are `<HeadlessForm>` as well as those [yielded from it](/2-usage/index.md), have strict Glint types. When using _strict mode templates_ via `<template>` tag (gjs/gts) files, you only need to import the component and you are ready to go:

```gts
import { HeadlessForm } from '@universal-ember/form';
```

## Usage with classic templates (hbs)

For the case of using classic `.hbs` templates, Glint requires a template registry to be set up, that declares a mapping of component _names_ to their types. This library follows the [recommendations for Glint-enabled addons](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons), so add the library's provided registry to your app's own registry as follows:

```ts
import type HeadlessFormRegistry from '@universal-ember/form/template-registry';

declare module '@glint/template/registry' {
  export default interface Registry extends HeadlessFormRegistry {
    // your app's own entries here...
  }
}
```

The same applies for any additional packages of this project if in use, like [`@universal-ember/form-yup`](/3-validation/yup.md) or [`@universal-ember/form-changeset`](/3-validation/ember-changeset.md).

## Typing of form data

This library's types also ensure that your form data matches the form fields you use in your templates. As such it is recommended that you type your form data in a strict and explicit way. Make sure to mark properties as optional, if they are not guaranteed to be filled out initially.

In other words, you cannot use a field with a `@name` which does not have a corresponding property on `@data`. Take the following example:

```gts
import Component from '@glimmer/component';
import { HeadlessForm } from '@universal-ember/form';

export default class MyFormComponent extends Component {
  // notice there is no firstName or lastName key in data
  data = {};

  handleSubmit = ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    // do something
  };

  <template>
    <HeadlessForm @data={{this.data}} @onSubmit={{this.handleSubmit}} as |form|>
      <form.Field @name="firstName" as |field|>
        <field.Label>First name</field.Label>
        <field.Input />
      </form.Field>

      <form.Field @name="lastName" as |field|>
        <field.Label>Last name</field.Label>
        <field.Input />
      </form.Field>

      <button type="submit">Submit</button>
    </HeadlessForm>
  </template>
}
```

Glint will show an error with the following, because `data` has a type of an empty object (`{}`), so neither `firstName` nor `lastName` are known properties:

![Glint error from unknown field name](/glint-name-error.png)

The correctly typed version of the component definition of the previous example would look like this:

```ts
import Component from '@glimmer/component';

interface MyFormData {
  firstName?: string;
  lastName?: string;
}

export default class MyFormComponent extends Component {
  data: MyFormData = {};

  handleSubmit = ({ firstName, lastName }: MyFormData) => {
    // do something
  };
}
```

Note that the initial `data` is still an empty object, but it has the explicit type of `MyFormData` (which an empty object is assignable to, as all properties are optional). This will make sure that `firstName` and `lastName` are the only valid properties you can refer to using the field's `@name`, preventing you from accidental errors like typos.
