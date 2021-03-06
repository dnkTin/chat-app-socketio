const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it ('should reject non-string values', () => {
        expect(isRealString(12)).toBeFalsy();
    });

    it ('should reject string with only space', () => {
        expect(isRealString('  ')).toBeFalsy();
    });

    it ('should allow string with non-space character', () => {
        expect(isRealString('as')).toBeTruthy();
    })
})