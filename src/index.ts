import parseArguments from './cli';
import Generator from './bin';
import { logs } from './utils';

const { logInfo, logError } = logs;
const args = parseArguments(process.argv);

const generator = new Generator(args);

generator.run().then(() => {
    logInfo('Success');
}).catch((err) => {
    logError('Error');
});
