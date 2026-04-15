# Rich Result Field

RichResultField is a text field that can be overlaid with a similar-looking box containing arbitrary text. Useful if you want to save a particular value from a picker but display something more friendly from the user.

Requires Bootstrap.

Example usage:

```aiignore
import RichResultField from '@universityofwarwick/rich-result-field';

const input = document.getElementById('input');
const richResultField = new RichResultField(input);
richResultField.store('input-value', 'Disaplay text');
```
