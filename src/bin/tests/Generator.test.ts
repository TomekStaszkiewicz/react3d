import Generator from '../Generator';
import DEFAULT_ARGUMENTS from '../../cli/constants';
import fse from 'fs-extra';

jest.spyOn(fse, 'mkdirSync').mockImplementation(() => true);

describe('Generator class', () => {
    describe('run', () => {
        it('returns empty string when no valid option passed', async () => {
            const gen = new Generator({
                ...DEFAULT_ARGUMENTS
            });

            const res = await gen.run();
            expect(res).toEqual('');
        });
        it('a', async () => {
            const gen = new Generator({
                ...DEFAULT_ARGUMENTS,
                domain: 'asd'
            });
            const res = await gen.run();

        });
    });
});