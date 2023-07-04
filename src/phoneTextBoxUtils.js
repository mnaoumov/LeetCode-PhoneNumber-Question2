import InputType from './InputType.js';

const MAX_PHONE_LENGTH = 10;

function extractDigits(formattedPhoneNumber) {
  return formattedPhoneNumber.replace(/\D/g, '').substring(0, MAX_PHONE_LENGTH);
}

function formatPhoneNumber(phoneNumber) {
  const { length } = phoneNumber;
  const PART1_INDEX = 3;
  const PART2_INDEX = 6;

  const code = phoneNumber.substring(0, PART1_INDEX);
  const part1 = phoneNumber.substring(PART1_INDEX, PART2_INDEX);
  const part2 = phoneNumber.substring(PART2_INDEX, MAX_PHONE_LENGTH);

  if (length <= PART1_INDEX) {
    return code;
  }

  if (length <= PART2_INDEX) {
    return `(${code}) ${part1}`;
  }

  return `(${code}) ${part1}-${part2}`;
}

function handleInput({
  oldFormattedPhoneNumber,
  newText,
  inputType,
  selectionStart,
  selectionEnd,
}) {
  let digitsBeforeSelection = extractDigits(oldFormattedPhoneNumber.substring(0, selectionStart));
  let digitsAfterSelection = extractDigits(oldFormattedPhoneNumber.substring(selectionEnd));
  const maxInsertDigitCount = MAX_PHONE_LENGTH - digitsBeforeSelection.length - digitsAfterSelection.length;
  const insertedDigits = extractDigits(newText).substring(0, maxInsertDigitCount);

  if (selectionStart === selectionEnd) {
    if (inputType === InputType.Backspace) {
      digitsBeforeSelection = digitsBeforeSelection.substring(0, digitsBeforeSelection.length - 1);
    } else if (inputType === InputType.Delete) {
      digitsAfterSelection = digitsAfterSelection.substring(1);
    }
  }

  const phoneNumber = digitsBeforeSelection + insertedDigits + digitsAfterSelection;
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  const unformattedCursorPosition = digitsBeforeSelection.length + insertedDigits.length;

  let cursorPosition = 0;
  let digitsSeenCount = 0;

  while (cursorPosition < formattedPhoneNumber.length) {
    if (digitsSeenCount === unformattedCursorPosition) {
      break;
    }

    if (formattedPhoneNumber[cursorPosition].match(/\d/)) {
      digitsSeenCount++;
    }

    cursorPosition++;
  }

  return {
    formattedPhoneNumber,
    cursorPosition,
  };
}

export { extractDigits, formatPhoneNumber, handleInput };
