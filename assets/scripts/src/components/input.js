import { getWidthOfInput } from '../lib/utils';

/**
 * Input
 */
export default class Input {
  constructor(instance, element, classNames) {
    this.instance = instance;
    this.element = element;
    this.classNames = classNames;

    // Bind event listeners
    this.onPaste = this.onPaste.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  addEventListeners() {
    this.element.addEventListener('input', this.onInput);
    this.element.addEventListener('paste', this.onPaste);
  }

  removeEventListeners() {
    this.element.removeEventListener('input', this.onInput);
    this.element.removeEventListener('paste', this.onPaste);
  }

  /**
   * Input event
   * @return
   * @private
   */
  onInput() {
    if (!this.instance.isSelectOneElement) {
      this.setWidth();
    }
  }

  /**
   * Paste event
   * @param  {Object} e Event
   * @return
   * @private
   */
  onPaste(e) {
    // Disable pasting into the input if option has been set
    if (e.target === this.element && !this.instance.config.paste) {
      e.preventDefault();
    }
  }

  activate(focusInput) {
    // Optionally focus the input if we have a search input
    if (focusInput && this.instance.canSearch && document.activeElement !== this.element) {
      this.element.focus();
    }
  }

  deactivate(blurInput) {
    // IE11 ignores aria-label and blocks virtual keyboard
    // if aria-activedescendant is set without a dropdown
    this.element.removeAttribute('aria-activedescendant');

    // Optionally blur the input if we have a search input
    if (blurInput && this.instance.canSearch && document.activeElement === this.element) {
      this.element.blur();
    }
  }

  enable() {
    this.element.removeAttribute('disabled');
  }

  disable() {
    this.element.setAttribute('disabled', '');
  }

  /**
   * Set value of input to blank
   * @return {Object} Class instance
   * @public
   */
  clear(setWidth = true) {
    if (this.element.value) {
      this.element.value = '';
    }

    if (setWidth) {
      this.setWidth();
    }

    return this.instance;
  }

  /**
   * Set the correct input width based on placeholder
   * value or input value
   * @return
   */
  setWidth() {
    if (this.instance.placeholder) {
      // If there is a placeholder, we only want to set the width of the input when it is a greater
      // length than 75% of the placeholder. This stops the input jumping around.
      if (
        this.element.value &&
        this.element.value.length >= (this.instance.placeholder.length / 1.25)
      ) {
        this.element.style.width = getWidthOfInput(this.element);
      }
    } else {
      // If there is no placeholder, resize input to contents
      this.element.style.width = getWidthOfInput(this.element);
    }
  }

  setPlaceholder(placeholder) {
    this.element.placeholder = placeholder;
  }
}