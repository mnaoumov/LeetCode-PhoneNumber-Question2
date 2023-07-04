import { handleInput } from "./phoneTextBoxUtils.js";

export default function vanillaPhoneTextBox(element) {
    element.addEventListener("beforeinput", e => {
        e.preventDefault();

        const {
            formattedPhoneNumber,
            cursorPosition
        } = handleInput({
            oldFormattedPhoneNumber: element.value,
            newText: e.data ?? "",
            inputType: e.inputType,
            selectionStart: element.selectionStart,
            selectionEnd: element.selectionEnd
        });

        element.value = formattedPhoneNumber;
        element.selectionStart = cursorPosition;
        element.selectionEnd = cursorPosition;
    });
}
