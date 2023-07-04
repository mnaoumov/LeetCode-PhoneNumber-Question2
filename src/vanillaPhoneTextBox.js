import {validateInput, extractPhoneNumber, formatPhoneNumber} from "./phoneTextBoxUtils.js";

export default function vanillaPhoneTextBox(element) {
    element.addEventListener("beforeinput", e => {
        if (!validateInput(e.data)) {
            e.preventDefault();
        }
    });

    element.addEventListener("input", () => {
        const phoneNumber = extractPhoneNumber(element.value);
        element.value = formatPhoneNumber(phoneNumber);
    });
}
