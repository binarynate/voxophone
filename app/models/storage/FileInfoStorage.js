import FileSystemJsonStorage from './FileSystemJsonStorage';

/**
* Extends FileSystemJsonStorage to provide storage for the `FileInfo` interface, which includes
* a path to a BLOB file.
*/
export default class FileInfoStorage extends FileSystemJsonStorage {

    query() {

        return super.query(...arguments)
        .then(fileInfoObjects => {

            for (let fileInfo of fileInfoObjects) {
                fileInfo.filePath = `${this._directoryPath}/files/${fileInfo.id}/${fileInfo.name}`;
            }
            return fileInfoObjects;
        });
    }
}
