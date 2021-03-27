import { logs } from '../utils';
import fse from 'fs-extra';
import path from 'path';
import FileManager from './FileManager';

const { logInfo, logError, logWarning } = logs;
export default class Generator implements IGenerator {
    private fileManager: FileManager;
    constructor(
        private readonly cliArguments: IProgramArguments
    ){
        this.fileManager = new FileManager();
    }

    private async generateProject(): Promise<void> {
        const {
            typescript,
            init
        } = this.cliArguments;
        /**
         * 1) Check type of boilerplate 
         */
        const templateName = typescript ? 'typescript' : 'basic';
        logInfo(`
        Creating project ${init}, using ${templateName} template
        `);
        /**
        * 2) Generate paths
        */
        const templatePath = `${path.join(__dirname)}/../templates/${templateName}`;
        const directoryPath = `${process.cwd()}/${init}`;
        try{
            /**
             * 3) Create new directory or log warning
             */
            if(!fse.existsSync(directoryPath)){
                fse.mkdirSync(directoryPath);
            } else {
                logWarning(`A directory named ${init} already exists!`);
                return;
            }
        
            /**
             * 4) Copy content from given template
             */
            fse.copySync(templatePath, directoryPath);
        } catch(e){
            logError(e);
        }
    }

    private async createNewDomain(){
        const {
            typescript,
            domain
        } = this.cliArguments;

        const templateName = typescript ? 'typescript' : 'basic';
        logInfo(`
        Creating domain ${domain}, using ${templateName} template
        `);

         /**
        * 2) Generate paths
        */
          const templatePath = `${path.join(__dirname)}/../templates/domainTemplates/${templateName}`;
          const directoryPath = `${process.cwd()}/src/${domain}`;
          try{
              /**
               * 3) Create new directory or log warning
               */
              if(!fse.existsSync(directoryPath)){
                  fse.mkdirSync(directoryPath);
              } else {
                  logWarning(`A directory named ${domain} already exists!`);
                  return;
              }

              this.fileManager.recursiveCopyFiles(templatePath, domain, directoryPath);
             
          } catch(e){
              logError(e);
          }
    }

    public async run(): Promise<string>{
        if(this.cliArguments.init){
            await this.generateProject();
            return 'create new project';
        }

        if(this.cliArguments.domain){
            await this.createNewDomain();
            return 'create new domain';
        }

        return '';
    }
}
