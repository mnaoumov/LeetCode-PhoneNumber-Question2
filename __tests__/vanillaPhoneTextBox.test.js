/**
 * @jest-environment jsdom
 */

import vanillaPhoneTextBox from '../src/vanillaPhoneTextBox';
import * as phoneTextBoxUtilsModule from '../src/phoneTextBoxUtils';
import InputType from '../src/InputType';

let textBox;

function triggerBeforeInput() {
  return textBox.dispatchEvent(new InputEvent('beforeinput', { data: '5b6c7d' }));
}

beforeEach(() => {
  textBox = document.createElement('input');
  vanillaPhoneTextBox(textBox);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('calls handleInput on beforeInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name);
  textBox.value = '(123) 45';
  textBox.selectionStart = 2;
  textBox.selectionEnd = 4;

  triggerBeforeInput();

  expect(phoneTextBoxUtilsModule.handleInput).toBeCalledWith(expect.objectContaining({
    oldFormattedPhoneNumber: '(123) 45',
    newText: '5b6c7d',
    selectionStart: 2,
    selectionEnd: 4,
  }));
});

it('calls InputType.fromEvent on beforeInput', () => {
  jest.spyOn(InputType, InputType.fromEvent.name);

  triggerBeforeInput();

  expect(InputType.fromEvent).toBeCalled();
});

it('sets formattedPhoneNumber from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name)
    .mockReturnValue({
      formattedPhoneNumber: '(123) 45',
      cursorPosition: 3,
    });

  triggerBeforeInput();

  expect(textBox.value).toBe('(123) 45');
});

it('sets selectionStart from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name)
    .mockReturnValue({
      formattedPhoneNumber: '(123) 45',
      cursorPosition: 3,
    });

  triggerBeforeInput();

  expect(textBox.selectionStart).toBe(3);
});

it('sets selectionEnd from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name)
    .mockReturnValue({
      formattedPhoneNumber: '(123) 45',
      cursorPosition: 3,
    });

  triggerBeforeInput();

  expect(textBox.selectionEnd).toBe(3);
});
