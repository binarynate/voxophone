import { validate } from 'parameter-validator';
import { Folder } from 'file-system';

/**
* Implements database-like, file system-based storage for JSON objects.
*/
export default class FileSystemJsonStorage {

    constructor(options) {

        validate(options, [ 'directoryPath', 'logger' ], this, { addPrefix: '_' });
    }

    /**
    * Loads all of the directory's object from disk.
    *
    * @return {Promise.<Array>}
    */
    query() {

        return Promise.resolve()
        .then(() => {

            let storageDirectory = Folder.fromPath(this._directoryPath);
            return storageDirectory.getEntities();
        })
        .then(files => {

            let promisedSerializedEntities = files.map(file => file.readText());
            return Promise.all(promisedSerializedEntities);
        })
        .then(serializedEntities => {

            let entities = serializedEntities.reduce((parsedEntities, serializedEntity) => {

                let parsedEntity;
                try {
                    parsedEntity = JSON.parse(serializedEntity);
                } catch (error) {
                    this._logger.error(`${this.constructor.name} encountered an invalid JSON file, which will be omitted.`, { error, serializedEntity });
                }
                return [ ...parsedEntities, serializedEntity ];
            }, []);

            return entities;
        });
    }
}
