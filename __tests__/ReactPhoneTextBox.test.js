/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ReactPhoneTextBox from '../src/ReactPhoneTextBox.js';
import * as phoneTextBoxUtilsModule from '../src/phoneTextBoxUtils.js';
import InputType from '../src/InputType.js';

let user;
let textBox;

// HACK: https://github.com/facebook/react/issues/11211
// React dispatchEvent doesn't trigger onBeforeInput listener, that's why we need to trigger it manually in a hacky way
function triggerBeforeInput() {
  const reactPropsKey = Object.keys(textBox).find((k) => k.startsWith('__reactProps$'));
  const { onBeforeInput } = textBox[reactPropsKey];

  act(() => {
    onBeforeInput(new InputEvent('beforeinput', {
      data: '5b6c7d',
      bubbles: true,
      inputType: 'insertText',
    }));
  });
}

beforeEach(async () => {
  user = userEvent.setup();
  render(<ReactPhoneTextBox />);
  textBox = await screen.findByRole('textbox');
  textBox.focus();
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('calls handleInput on beforeInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name);

  textBox.value = '(123) 4';
  textBox.selectionStart = 2;
  textBox.selectionEnd = 4;

  triggerBeforeInput();

  expect(phoneTextBoxUtilsModule.handleInput).toHaveBeenCalledWith(expect.objectContaining({
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

it('calls handleInput with InputType.Backspace on keypress', async () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name);

  await user.keyboard('{Backspace}');

  expect(phoneTextBoxUtilsModule.handleInput).toHaveBeenCalledWith(expect.objectContaining({
    inputType: InputType.Backspace,
  }));
});

it('calls handleInput with InputType.Delete on keypress', async () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name);

  await user.keyboard('{Delete}');

  expect(phoneTextBoxUtilsModule.handleInput).toHaveBeenCalledWith(expect.objectContaining({
    inputType: InputType.Delete,
  }));
});

it('sets formattedPhoneNumber from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name).mockImplementation(() => ({
    formattedPhoneNumber: '(123) 45',
    cursorPosition: 3,
  }));

  triggerBeforeInput();

  expect(textBox.value).toBe('(123) 45');
});

it('sets selectionStart from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name).mockImplementation(() => ({
    formattedPhoneNumber: '(123) 45',
    cursorPosition: 3,
  }));

  triggerBeforeInput();

  expect(textBox.selectionStart).toBe(3);
});

it('sets selectionEnd from handleInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.handleInput.name).mockImplementation(() => ({
    formattedPhoneNumber: '(123) 45',
    cursorPosition: 3,
  }));

  triggerBeforeInput();

  expect(textBox.selectionEnd).toBe(3);
});
