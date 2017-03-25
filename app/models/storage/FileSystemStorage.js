import { validate } from 'parameter-validator';
import { Folder } from 'file-system';
import clone from '../../utils/clone';

export default class FileSystemStorage {

    constructor(options) {

        validate(options, [ 'directoryPath', 'logger' ], this, { addPrefix: '_' });
    }

    /**
    * Returns entities from a cache if they have already been loaded and loads them from disk otherwise.
    *
    * @return {Promise.<Array>}
    */
    query() {

        return Promise.resolve()
        .then(() => {

            if (this._cachedEntities) {
                return this._cachedEntities;
            }
            let storageDirectory = Folder.fromPath(this._directoryPath);

            return storageDirectory.getEntities()
            .then(files => {

                let promisedSerializedEntities = files.map(file => file.readText());
                return Promise.all(promisedSerializedEntities);
            })
            .then(serializedEntities => {

                this._cachedEntities = serializedEntities.reduce((parsedEntities, serializedEntity) => {

                    let parsedEntity;
                    try {
                        parsedEntity = JSON.parse(serializedEntity);
                    } catch (error) {
                        this._logger.error(`${this.constructor.name} encountered an invalid JSON file, which will be omitted.`, { error, serializedEntity });
                    }
                    return [ ...parsedEntities, serializedEntity ];
                }, []);

                return this._cachedEntities;
            });
        })
        .then(clone); // Return clones to guard against clients mutating them.
    }
}
