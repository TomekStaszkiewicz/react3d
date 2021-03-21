import chalk from 'chalk';

export function logInfo(information: string): void {
    console.log(chalk.yellow(information));
}

export function logWarning(warningMessage: string): void {
    console.log(chalk.red(warningMessage));
}

export function logError(errorMessage: string): void {
    console.log(chalk.red.bold.bgYellow(errorMessage));
}