const Backspace = Symbol("Backspace");
const Delete = Symbol("Delete");
const Insert = Symbol("Insert");

function fromEvent(inputTypeStr) {
    switch (inputTypeStr) {
        case "deleteContentBackward":
            return Backspace;
        case "deleteContentForward":
            return Delete;
        default:
            return Insert;
    }
}

export default {
    Backspace,
    Delete,
    Insert,
    fromEvent
};
