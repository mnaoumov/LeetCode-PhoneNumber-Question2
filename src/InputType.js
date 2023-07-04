const Backspace = Symbol('Backspace');
const Delete = Symbol('Delete');
const InsertText = Symbol('InsertText');

function fromEvent(inputTypeStr) {
  switch (inputTypeStr) {
    case 'deleteContentBackward':
      return Backspace;
    case 'deleteContentForward':
      return Delete;
    default:
      return InsertText;
  }
}

export default {
  Backspace,
  Delete,
  InsertText,
  fromEvent
};
