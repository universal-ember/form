import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import type { Registry } from '@ember/service';

interface Signature<Key extends keyof Registry> {
  Return: Registry[Key];
  Args: {
    Positional: [serviceName: Key];
  };
}

export default class GetService<Key extends keyof Registry> extends Helper<
  Signature<Key>
> {
  compute([name]: [Key]): Registry[Key] {
    const owner = getOwner(this);

    assert('Expected the service helper to have an owner', owner);

    return owner.lookup(`service:${name}`);
  }
}
