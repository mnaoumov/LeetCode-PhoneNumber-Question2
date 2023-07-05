import InputType from './InputType';
import { handleInput } from './phoneTextBoxUtils';

export default function vanillaPhoneTextBox(element) {
  element.addEventListener('beforeinput', (e) => {
    e.preventDefault();

    const {
      formattedPhoneNumber,
      cursorPosition,
    } = handleInput({
      oldFormattedPhoneNumber: element.value,
      newText: e.data ?? '',
      inputType: InputType.fromEvent(e.inputType),
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    });

    Object.assign(element, {
      value: formattedPhoneNumber,
      selectionStart: cursorPosition,
      selectionEnd: cursorPosition,
    });
  });
}
