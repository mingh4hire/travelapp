const nameChecker = require('./nameChecker');

describe('nameChecker', () => {
    it('should be a valid name ', () => {
        expect(nameChecker.checkForName('Picard')).toBe(true)
    });

    it('should be an invalid name ', () => {
        expect(nameChecker.checkForName('Diasy')).toBe(false)
    });
})