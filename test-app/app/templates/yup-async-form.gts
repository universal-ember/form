import { HeadlessForm } from '@universal-ember/form';
import { validateYup } from '@universal-ember/form-yup';

import type { TOC } from '@ember/component/template-only';
import type YupAsyncFormController from 'test-app/controllers/yup-async-form';

const YupAsyncFormRoute: TOC<{
  Args: { controller: YupAsyncFormController; model: unknown };
}> = <template>
  <HeadlessForm
    @data={{@controller.data}}
    @validateOn="change"
    @validate={{validateYup @controller.createFormSchema}}
    @onSubmit={{@controller.submit}}
    as |form|
  >
    <form.Field @name="name" as |field|>
      <div class="my-2 flex flex-col">
        <field.Label
          class={{if field.isInvalid "text-red-500"}}
        >Name</field.Label>
        <field.Input
          class="border rounded px-2 {{if field.isInvalid 'border-red-500'}}"
          required
        />
        <field.Errors class="text-red-600" />
      </div>
    </form.Field>

    <form.Field @name="value" as |field|>
      <div class="my-2 flex flex-col">
        <field.Label
          class={{if field.isInvalid "text-red-500"}}
        >Value</field.Label>
        <field.Input
          class="border rounded px-2 {{if field.isInvalid 'border-red-500'}}"
          required
        />
        <field.Errors class="text-red-600" />
      </div>
    </form.Field>

    <button
      type="submit"
      class="bg-slate-600 text-white rounded px-8 py-1"
      data-test-submit
    >Submit</button>
    <button
      type="reset"
      class="bg-slate-400 text-white rounded px-8 py-1"
      data-test-reset
    >Reset</button>
  </HeadlessForm>
</template>;

export default YupAsyncFormRoute;
