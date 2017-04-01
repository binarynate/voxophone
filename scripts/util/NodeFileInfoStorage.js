import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import ninvoke from './ninvoke';
import NodeFileSystemJsonStorage from './NodeFileSystemJsonStorage';

/**
* Extends NodeFileSystemJsonStorage to provide storage for the `FileInfo` interface, which includes
* a path to a BLOB file.
*/
export default class NodeFileInfoStorage extends NodeFileSystemJsonStorage {

    /**
    * Inserts a new file info record, copying the file from the location indicated by the given fileInfo.
    *
    * @param   {FileInfo}         fileInfo
    * @returns {Promise.<Object>} result
    * @returns {string}           result.id
    */
    insert(originalFileInfo) {

        let newFilePath,
            newFileDirectory,
            newFileInfoId;

        return Promise.resolve()
        .then(() => {

            let fileInfoToInsert = _.cloneDeep(originalFileInfo);
            // Delete the filePath, as that's added dynamically after the entity is retrieved from disk.
            delete fileInfoToInsert.filePath;
            return super.insert(fileInfoToInsert);
        })
        .then(newFileInfo => {

            let newFileInfoId = newFileInfo.id;
            newFileDirectory = path.join(this._directoryPath, 'files', newFileInfoId);
            newFilePath = path.join(newFileDirectory, newFileInfo.name);
            return ninvoke(fs, 'mkdir', newFileDirectory);
        })
        .then(() => this._copyFile(originalFileInfo.filePath, newFilePath))
        .then(() => ({ id: newFileInfoId }));
    }

    _copyFile(source, destination) {

        let resolve, reject;
        let promise = new Promise((...args) => { [ resolve, reject ] = args; });

        let readStream = fs.createReadStream(source);
        readStream.on('error', reject);

        let writeStream = fs.createWriteStream(destination);
        writeStream.on('close', resolve);

        readStream.pipe(writeStream);
        return promise;
    }

}
