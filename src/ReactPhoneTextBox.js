import { useId, useState, useRef, useEffect } from "react";
import { handleInput } from "./phoneTextBoxUtils";

export default function ReactPhoneTextBox() {
    const textBoxId = useId();
    const textBoxRef = useRef();
    let [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
    let [cursorPosition, setCursorPosition] = useState(0);

    useEffect(() => {
        textBoxRef.current.selectionStart = cursorPosition;
        textBoxRef.current.selectionEnd = cursorPosition;
    });

    function handleBeforeInput(e) {
        e.preventDefault();

        ({ formattedPhoneNumber, cursorPosition } = handleInput({
            oldFormattedPhoneNumber: formattedPhoneNumber,
            newText: e.data ?? "",
            inputType: e.inputType,
            selectionStart: textBoxRef.current.selectionStart,
            selectionEnd: textBoxRef.current.selectionEnd
        }));

        setFormattedPhoneNumber(formattedPhoneNumber);
        setCursorPosition(cursorPosition);
    };

    // HACK: https://github.com/facebook/react/issues/11211
    // onBeforeInput isn't triggered for Backspace/Delete buttons
    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            e.inputType = "deleteContentBackward";
            handleBeforeInput(e);
        } else if (e.key === "Delete") {
            e.inputType = "deleteContentForward";
            handleBeforeInput(e);
        }
    }

    return (
        <div className="container text-center">
            <input type="tel" id={textBoxId} ref={textBoxRef} maxLength="16" placeholder="mobile number" autoComplete="off" defaultValue={formattedPhoneNumber} onBeforeInput={handleBeforeInput} onKeyDown={handleKeyDown} />
            <div><label htmlFor={textBoxId}>(123) 456-7890</label></div>
        </div>
    );
}
