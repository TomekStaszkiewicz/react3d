interface IFileManager {
    parseFile: <T extends Record<string, string>>(fileContent: string, variables: T) => string;
    recursiveCopyFiles: (templatePath: string, domainName: string, destPath: string) => void;
}