import {
  useId, useState, useRef, useEffect,
} from 'react';
import { handleInput } from './phoneTextBoxUtils';
import InputType from './InputType';

export default function ReactPhoneTextBox() {
  const textBoxId = useId();
  const textBoxRef = useRef();
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    textBoxRef.current.selectionStart = cursorPosition;
    textBoxRef.current.selectionEnd = cursorPosition;
  });

  function handleInputEvent(newText, inputType) {
    const {
      formattedPhoneNumber: newFormattedPhoneNumber,
      cursorPosition: newCursorPosition,
    } = handleInput({
      oldFormattedPhoneNumber: formattedPhoneNumber,
      newText,
      inputType,
      selectionStart: textBoxRef.current.selectionStart,
      selectionEnd: textBoxRef.current.selectionEnd,
    });

    setFormattedPhoneNumber(newFormattedPhoneNumber);
    setCursorPosition(newCursorPosition);
  }

  function handleBeforeInput(e) {
    e.preventDefault();
    handleInputEvent(e.data, InputType.fromEvent(e.inputType));
  }

  // HACK: https://github.com/facebook/react/issues/11211
  // onBeforeInput isn't triggered for Backspace/Delete buttons
  function handleKeyDown(e) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleInputEvent('', InputType.Backspace);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      handleInputEvent('', InputType.Delete);
    }
  }

  return (
    <div className="container text-center">
      <input type="tel" id={textBoxId} ref={textBoxRef} maxLength="16" placeholder="mobile number" autoComplete="off" defaultValue={formattedPhoneNumber} onBeforeInput={handleBeforeInput} onKeyDown={handleKeyDown} />
      <div><label htmlFor={textBoxId}>(123) 456-7890</label></div>
    </div>
  );
}
