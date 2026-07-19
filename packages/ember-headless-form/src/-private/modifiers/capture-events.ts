import { modifier } from 'ember-modifier';

export interface CaptureEventsModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      /*
       * @internal
       */
      event: 'focusout' | 'change' | 'input' | undefined;

      /*
       * @internal
       */
      triggerValidation: (this: void) => void;
    };
  };
}

const CaptureEventsModifier = modifier<CaptureEventsModifierSignature>(
  (element, _pos, { event, triggerValidation }) => {
    if (event) {
      const handler = () => triggerValidation();

      element.addEventListener(event, handler, { passive: true });

      return () => {
        element.removeEventListener(event, handler);
      };
    }
  }
);

export default CaptureEventsModifier;
