import { validate } from 'parameter-validator';
import { Folder, File } from 'file-system';

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
        .then(entities => {

            let jsonFiles = entities.filter(entity => entity instanceof File)
                                    .filter(({ extension }) => extension === '.json');

            let promisedSerializedEntities = jsonFiles.map(file => file.readText());
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

                if (parsedEntity) parsedEntities.push(parsedEntity);
                return parsedEntities;
            }, []);

            return entities;
        });
    }
}
