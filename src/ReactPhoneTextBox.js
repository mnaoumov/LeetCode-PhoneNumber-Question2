import { useId, useState } from "react";
import { validateInput, extractPhoneNumber, formatPhoneNumber } from "./phoneTextBoxUtils";

export default function ReactPhoneTextBox() {
    const id = useId();
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

    function handleBeforeInput(e) {
        if (!validateInput(e.data)) {
            e.preventDefault();
        }
    };

    function handleInput(e) {
        const phoneNumber = extractPhoneNumber(e.target.value);
        setFormattedPhoneNumber(formatPhoneNumber(phoneNumber));
    };

    return (
        <div className="container text-center">
            <input type="tel" id={id} maxLength="16" placeholder="mobile number" autoComplete="off" value={formattedPhoneNumber} onBeforeInput={handleBeforeInput} onInput={handleInput} />
            <div><label htmlFor={id}>(123) 456-7890</label></div>
        </div>
    );
}
