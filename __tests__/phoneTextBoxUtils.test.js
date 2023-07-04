import InputType from '../src/InputType.js';
import {
    handleInput,
    extractDigits,
    formatPhoneNumber
} from '../src/phoneTextBoxUtils.js';

describe('handleInput', () => {
    describe('InsertText', () => {
        it('preserves formattedPhoneNumber if new text doesn't have digits', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: 'abc',
                inputType: InputType.InsertText,
                selectionStart: 8,
                selectionEnd: 8
            });
            expect(formattedPhoneNumber).toBe('(123) 45');
        });

        it('adds digits to the end', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: '678',
                inputType: InputType.InsertText,
                selectionStart: 8,
                selectionEnd: 8
            });
            expect(formattedPhoneNumber).toBe('(123) 456-78');
        });

        it('adds digits to the beginning', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: '678',
                inputType: InputType.InsertText,
                selectionStart: 0,
                selectionEnd: 0
            });
            expect(formattedPhoneNumber).toBe('(678) 123-45');
        });

        it('adds digits in the middle', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: '678',
                inputType: InputType.InsertText,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(formattedPhoneNumber).toBe('(126) 783-45');
        });

        it('inserts digits only', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: '6a7b8c',
                inputType: InputType.InsertText,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(formattedPhoneNumber).toBe('(126) 783-45');
        });

        it('inserts not more than 10 letters', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 45',
                newText: '1234567890',
                inputType: InputType.InsertText,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(formattedPhoneNumber).toBe('(121) 234-5345');
        });

        it('replaces existing digits if has selection', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '1234',
                inputType: InputType.InsertText,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(formattedPhoneNumber).toBe('(121) 234-678');
        });

        it('moves cursor after last inserted digit', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '1234',
                inputType: InputType.InsertText,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(cursorPosition).toBe(9);
        });
    });

    describe('Backspace', () => {
        it('deletes selected digits on Backspace', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(formattedPhoneNumber).toBe('(126) 78');
        });

        it('deletes digit to the left', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(formattedPhoneNumber).toBe('(134) 567-8');
        });

        it('does not delete if no digits to the left', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 1,
                selectionEnd: 1
            });
            expect(formattedPhoneNumber).toBe('(123) 456-78');
        });

        it('deletes closest digit to the left', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 6,
                selectionEnd: 6
            });
            expect(formattedPhoneNumber).toBe('(124) 567-8');
        });

        it('moves cursor to selection start', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(cursorPosition).toBe(3);
        });

        it('moves cursor to the left', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(cursorPosition).toBe(2);
        });

        it('moves cursor to the closest digit to the left', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Backspace,
                selectionStart: 6,
                selectionEnd: 6
            });
            expect(cursorPosition).toBe(3);
        });
    });

    describe('Delete', () => {
        it('deletes selected digits', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(formattedPhoneNumber).toBe('(126) 78');
        });

        it('deletes digit to the right', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(formattedPhoneNumber).toBe('(124) 567-8');
        });

        it('does not delete if no digits to the right', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 12,
                selectionEnd: 12
            });
            expect(formattedPhoneNumber).toBe('(123) 456-78');
        });

        it('deletes closest digit to the right', () => {
            const { formattedPhoneNumber } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 4,
                selectionEnd: 4
            });
            expect(formattedPhoneNumber).toBe('(123) 567-8');
        });

        it('moves cursor to selection start', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 3,
                selectionEnd: 8
            });
            expect(cursorPosition).toBe(3);
        });

        it('keeps cursor', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 456-78',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 3,
                selectionEnd: 3
            });
            expect(cursorPosition).toBe(3);
        });

        it('moves cursor if formatting changed', () => {
            const { cursorPosition } = handleInput({
                oldFormattedPhoneNumber: '(123) 4',
                newText: '',
                inputType: InputType.Delete,
                selectionStart: 2,
                selectionEnd: 2
            });
            expect(cursorPosition).toBe(1);
        });
    });
});

describe('extractDigits', () => {
    it('removes non-digits', () => {
        expect(extractDigits('1A2a3Z4a5.6/7-8,9@0#$')).toBe('1234567890');
    });

    it('trims too long strings', () => {
        expect(extractDigits('12345678901234567890')).toBe('1234567890');
    });
});

describe('formatPhoneNumber', () => {
    it('returns empty for empty', () => {
        expect(formatPhoneNumber('')).toBe('');
    });

    it('returns code for short numbers', () => {
        expect(formatPhoneNumber('1')).toBe('1');
        expect(formatPhoneNumber('12')).toBe('12');
        expect(formatPhoneNumber('123')).toBe('123');
    });

    it('wraps code with parentheses', () => {
        expect(formatPhoneNumber('1234')).toBe('(123) 4');
        expect(formatPhoneNumber('12345')).toBe('(123) 45');
        expect(formatPhoneNumber('123456')).toBe('(123) 456');
    });

    it('adds hyphen between parts', () => {
        expect(formatPhoneNumber('1234567')).toBe('(123) 456-7');
        expect(formatPhoneNumber('12345678')).toBe('(123) 456-78');
        expect(formatPhoneNumber('123456789')).toBe('(123) 456-789');
        expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    });
});
