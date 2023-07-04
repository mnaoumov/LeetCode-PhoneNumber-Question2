/**
 * @jest-environment jsdom
 */

import vanillaPhoneTextBox from "../src/vanillaPhoneTextBox.js"
import * as phoneTextBoxUtilsModule from "../src/phoneTextBoxUtils.js"
import InputType from "../src/InputType.js";

let element;

beforeEach(() => {
    element = document.createElement("input");
    vanillaPhoneTextBox(element);
});

afterEach(() => {
    jest.restoreAllMocks();
});

it("calls handleInput on beforeInput", () => {
    jest.spyOn(phoneTextBoxUtilsModule, "handleInput");
    element.value = "(123) 45"
    element.selectionStart = 2;
    element.selectionEnd = 4;
    element.dispatchEvent(new InputEvent("beforeinput", { data: "5b6c7d" }));

    expect(phoneTextBoxUtilsModule.handleInput).toHaveBeenCalledWith(expect.objectContaining({
        oldFormattedPhoneNumber: "(123) 45",
        newText: "5b6c7d",
        selectionStart: 2,
        selectionEnd: 4
    }));
});

it("calls InputType.fromEvent on beforeInput", () => {
    jest.spyOn(InputType, "fromEvent");
    element.dispatchEvent(new InputEvent("beforeinput", { data: "5b6c7d" }));
    expect(InputType.fromEvent).toBeCalled();
});
