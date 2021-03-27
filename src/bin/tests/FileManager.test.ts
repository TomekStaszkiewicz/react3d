import FileManager from '../FileManager';
import * as LOGS from "../../utils/logs";
 
describe('FileManager', () => {
    describe('parseFile', () => {
        it('returns the original string if no placeholder inside', () => {
            const str = 'abcd';
            const fm = new FileManager();

            expect(fm.parseFile(str, {})).toEqual(str);
        });

        it('replaces a single placeholder', () => {
            const str = 'asd {{argumentName}} as';
            const expectedStr = 'asd monkey as'
            const fm = new FileManager();

            expect(fm.parseFile(str, {argumentName: 'monkey'})).toEqual(expectedStr);
        });

        it('replaces multiple placeholders', () => {
            const str = 'asd {{argumentName}} as {{anotherArg}}';
            const expectedStr = 'asd monkey as donkey'
            const fm = new FileManager();

            expect(fm.parseFile(str, {argumentName: 'monkey', anotherArg: 'donkey'})).toEqual(expectedStr);
        });
        it('throws error if a placeholder value is missing', () => {
            jest.spyOn(LOGS, 'logError').mockImplementationOnce(() => true);
            const str = 'asd {{argumentName}} as';
            const fm = new FileManager();

            expect(fm.parseFile(str, {anotherArg: 'monkey'})).toEqual(str);
            expect(LOGS.logError).toHaveBeenCalledTimes(1);
        });
    });
});