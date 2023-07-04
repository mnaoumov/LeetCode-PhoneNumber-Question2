import InputType from '../src/InputType';

describe('fromEvent', () => {
    it('returns Backspace for deleteContentBackward', () => {
        expect(InputType.fromEvent('deleteContentBackward')).toBe(InputType.Backspace);
    });

    it('returns Backspace for deleteContentForward', () => {
        expect(InputType.fromEvent('deleteContentForward')).toBe(InputType.Delete);
    });

    it('returns InsertText for insertText', () => {
        expect(InputType.fromEvent('insertText')).toBe(InputType.InsertText);
    });

    it('returns InsertText for insertFromPaste', () => {
        expect(InputType.fromEvent('insertFromPaste')).toBe(InputType.InsertText);
    });
});
