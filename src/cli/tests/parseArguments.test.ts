import parseArguments from '../parseAguments';
import DEFAULT_ARGUMENTS from '../constants';

describe('parseArguments', () => {
    test('returns default arguments when argList is empty', () => {
        expect(parseArguments([])).toEqual(DEFAULT_ARGUMENTS);
    });

    test('overrides default arguments with CLI arguments', () => {
        const args = ['', '', '-ts', '-d', 'domainName'];

        const result = parseArguments(args);

        expect(result.typescript).toBeTruthy();
        expect(result.domain).toEqual('domainName');
    });
});