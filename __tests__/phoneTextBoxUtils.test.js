import {
    validateInput,
    extractPhoneNumber,
    formatPhoneNumber
} from "../src/phoneTextBoxUtils.js";

describe("validateInput", () => {
    it("returns true for empty input", () => {
        expect(validateInput("")).toBe(true);
    });

    it("returns true for null input", () => {
        expect(validateInput(null)).toBe(true);
    });

    it("returns true for single digits", () => {
        for (const inputData of ["0", "5", "9"]) {
            expect(validateInput(inputData)).toBe(true);
        }
    });

    it("returns false for non-digits", () => {
        for (const inputData of ["A", "a", "Z", "z", ".", "/"]) {
            expect(validateInput(inputData)).toBe(false);
        }
    });

    it("returns true for multi-digit strings", () => {
        for (const inputData of ["12", "123", "1234567890"]) {
            expect(validateInput(inputData)).toBe(true);
        }
    });

    it("returns true for strings that contain non-digits", () => {
        for (const inputData of ["12a", "12.3", "12345b67890"]) {
            expect(validateInput(inputData)).toBe(false);
        }
    });

    it("returns true for long multi-digit strings", () => {
        expect(validateInput("123456789012345678901234567890")).toBe(true);
    });
});

describe("extractPhoneNumber", () => {
    it("removes non-digits", () => {
        expect(extractPhoneNumber("1A2a3Z4a5.6/7-8,9@0#$")).toBe("1234567890");
    });

    it("trims too long strings", () => {
        expect(extractPhoneNumber("12345678901234567890")).toBe("1234567890");
    });
});

describe("formatPhoneNumber", () => {
    it("returns empty for empty", () => {
        expect(formatPhoneNumber("")).toBe("");
    });

    it("returns code for short numbers", () => {
        expect(formatPhoneNumber("1")).toBe("1");
        expect(formatPhoneNumber("12")).toBe("12");
        expect(formatPhoneNumber("123")).toBe("123");
    });

    it("wraps code with parentheses", () => {
        expect(formatPhoneNumber("1234")).toBe("(123) 4");
        expect(formatPhoneNumber("12345")).toBe("(123) 45");
        expect(formatPhoneNumber("123456")).toBe("(123) 456");
    });

    it("adds hyphen between parts", () => {
        expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
        expect(formatPhoneNumber("12345678")).toBe("(123) 456-78");
        expect(formatPhoneNumber("123456789")).toBe("(123) 456-789");
        expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
    });
});
