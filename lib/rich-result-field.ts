import $ from 'jquery';

/**
 * RichResultField is a text field that can be overlaid with a similar-looking
 * box containing arbitrary text. Useful if you want to save a particular value
 * from a picker but display something more friendly from the user.
 *
 * Requires Bootstrap.
 */
export default class RichResultField {
  $input: JQuery<HTMLElement>;
  $uneditable: JQuery<HTMLElement>;

  constructor(input: HTMLElement) {
    this.$input = $(input);
    this.$uneditable = $(`
      <span><span class="val"></span>
      <a href="#" class="clear-field" title="Clear">&times;</a></span>
    `);
    this.$uneditable.attr({
      class: `uneditable-input rich-result-field ${this.$input.attr('class')}`,
      disabled: true,
    });

    this.$input.after(this.$uneditable);
    // Attempt to match the original widths; defined width needed for text-overflow to work
    this.$input.css('width', this.$input.css('width'));
    this.$uneditable.css('width', this.$input.css('width'));
    this.$uneditable.find('a').on('click', () => {
      this.edit();
      return false;
    });
    this.$uneditable.hide();
  }

  /** Clear field, focus for typing */
  edit() {
    this.reset();
    const input = this.$input[0];
    // Trigger a native change event, as a jQuery one doesn't act quite the same -
    // and make it bubble so that you can listen to the containing form, as real change
    // events do.
    input.dispatchEvent(new Event('change', { bubbles: true }));
    this.$input.trigger('richResultField.edit').trigger('focus');
  }

  reset() {
    this.$input.val('').typeahead('val', '');
    this.$input.show();
    this.$uneditable.hide()
      .find('.val')
      .text('')
      .attr('title', '');
  }

  /** Set value of input field, hide it and show the rich `text` instead */
  store(value: string, text: string, url?: string) {
    this.$input.val(value).trigger('change').trigger('richResultField.store');
    this.storeText(text, url);
  }

  /** Hide input field and show the rich `text` instead */
  storeText(text: string, url?: string) {
    this.$input.hide();
    const $val = this.$uneditable.show().find('.val');
    if (url && url.length > 0) {
      $val
        .empty()
        .append($('<a/>').attr({
          target: '_blank',
          href: url,
        }).text(text))
        .attr('title', text);
    } else {
      $val
        .text(text)
        .attr('title', text);
    }
  }
}
