import { Command } from 'commander';
import DEFAULT_ARGUMENTS from './constants';

export default function parseArguments(argList: string[]): IProgramArguments {
    /**
     * 1) Create instance of Command
     */
    const program = new Command();

    /**
     * 2) Define options
     */
    program
        .option('-ts, --typescript', 'use typescript')
        .option('-d, --domain <name>', 'create a new domain')
        .option('-i, --init <name>', 'init empty CRA project');

    /**
     * 3) Parse argument list
     */
    program.parse(argList);
    const options = program.opts();
    
    /**
     * 4) Return given arguments and default arguments
     */
    return {
        ...DEFAULT_ARGUMENTS,
        ...options
    }
}