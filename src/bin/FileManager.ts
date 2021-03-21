export default class FileManager implements IFileManager {
    constructor(
        private readonly rootPath: string,
    ){}
}