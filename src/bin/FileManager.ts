import { logError } from "../utils/logs";
import fse from 'fs-extra';

export default class FileManager implements IFileManager {
   
    public parseFile<T extends Record<string, string>>(fileContent: string, variables: T): string {
        const pattern = /{{[A-Za-z]*}}/ig;
        const foundPlaceholders = fileContent.match(pattern);
        let newFileContent = fileContent;

        if(!foundPlaceholders?.length){
            return fileContent;
        }

        foundPlaceholders.forEach((placeholder) => {
            const argName = placeholder.replace(/[{}]/ig, '');
            if(argName in variables){
                // see: https://stackoverflow.com/questions/62825358/javascript-replaceall-is-not-a-function-type-error
                newFileContent = newFileContent.split(placeholder).join(variables[argName]);
            } else {
                logError('Wrong arg name when parsing file');
                return newFileContent;
            }

        });

        return newFileContent;
    }

    public recursiveCopyFiles(templatePath: string, domainName: string, destPath: string): void {
        /**
         * 1) Read all files from directory
         */
        const files = fse.readdirSync(templatePath);
        
        files.forEach((file) => {
            const originalFilePath = `${templatePath}/${file}`;
            /**
             * 2) If file is directory - call recursiveCopyFiles with the directory
             */
            if(fse.lstatSync(originalFilePath).isDirectory()){
                fse.mkdirSync(`${destPath}/${file}`);
                this.recursiveCopyFiles(`${templatePath}/${file}`, domainName, `${destPath}/${file}`);
            } else {
                /**
                 * 3) Read file content
                 */
                const fileContent = fse.readFileSync(originalFilePath, 'utf-8');
                const settings = {
                    ComponentName: domainName
                  };
              
                /**
                 * 4) Create Proper name for file
                 */
                let newFileName = [settings.ComponentName, file.split('.').pop()].join('.');
                  if(file.split('.').shift() === 'index'){
                      newFileName = file;
                  }
                /**
                 * 5) Parse file content
                 */
                const content = this.parseFile(fileContent, settings);
    
                const newFilePath = `${destPath}/${newFileName}`; 
                /**
                 * 6) Create file
                 */
                fse.createFileSync(newFilePath);
                fse.writeFileSync(newFilePath, content);
            }
        });
    }
}