import { logs } from '../utils';
import fse from 'fs-extra';

const { logInfo, logError } = logs;
export default class Generator implements IGenerator {
    constructor(
        private readonly cliArguments: IProgramArguments
    ){}

    private async generateProject(): Promise<void> {
        const {
            typescript,
            init
        } = this.cliArguments;
        const templateName = typescript ? 'typescript' : 'basic';
        logInfo(`
        Creating project ${init}, using ${templateName} template
        `);
        const templatePath = `../templates/${templateName}`;
        const directoryPath = `${process.cwd()}/${init}`;
        try{
        // Create directory
        if(!fse.existsSync(directoryPath)){
            fse.mkdirSync(directoryPath);
        }
        
        // Copy content
        fse.copySync(templatePath, directoryPath);
        } catch(e){
            logError(e);
        }
    }

    public async run(): Promise<void>{
        if(this.cliArguments.init){
            await this.generateProject();
        }
    }
}
