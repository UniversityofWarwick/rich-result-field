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
    constructor(input: HTMLElement);
    /** Clear field, focus for typing */
    edit(): void;
    reset(): void;
    /** Set value of input field, hide it and show the rich `text` instead */
    store(value: string, text: string, url?: string): void;
    /** Hide input field and show the rich `text` instead */
    storeText(text: string, url?: string): void;
}
