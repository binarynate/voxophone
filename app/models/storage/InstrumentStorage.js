import { Folder } from 'file-system';
import clone from '../../utils/clone';

export default class InstrumentStorage {

    constructor() {
        this._storageDirectoryPath = `${__dirname}/../../data/instruments`;
    }

    query() {

        return this._getInstruments();
    }

    /**
    * Loads the instruments from disk if they haven't already been loaded.
    */
    _getInstruments() {

        return Promise.resolve()
        .then(() => {

            if (this._cachedInstruments) {
                return this._cachedInstruments;
            }
            let storageDirectory = Folder.fromPath(this._storageDirectoryPath);

            return storageDirectory.getEntities()
            .then(instrumentFiles => {

                let promisedSerializedInstruments = instrumentFiles.map(file => file.readText());
                return Promise.all(promisedSerializedInstruments);
            })
            .then(serializedInstruments => {

                this._cachedInstruments = serializedInstruments.map(s => JSON.parse(s));
                return this._cachedInstruments;
            });
        })
        .then(clone); // Return clones in case a client mutates an instrument.
    }
}
