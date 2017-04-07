import { validate, validateAsync } from 'parameter-validator';

/**
* @interface Instrument
*
* @property {string}   id                     - guid
* @property {string}   name                   - e.g. 'Acoustic Grand Piano'
* @property {FileInfo} soundBankInfo
* @property {int}      soundBankProgramNumber
* @property {FileInfo} imageInfo
* @param    {int}      order                  - Determines the order in which instruments are displayed
*/

/**
* @interface FileInfo
*
* @property {string} id
* @property {string} name     - file name, with extension
* @property {string} filePath - Absolute path to the file on disk
*/

/**
* Provides the instruments which are available for selection.
*/
export default class InstrumentManager {

    constructor(options) {

        validate(options, [
            'instrumentStorage',
            'fileInfoStorage',
            'logger'
        ], this, { addPrefix: '_' });
    }

    /**
    * Provides the available instruments.
    *
    * @returns {Promise.<Array.<Instrument>>}
    */
    getInstruments() {

        return Promise.resolve()
        .then(() => {

            if (this._cachedInstruments) {
                return this._cachedInstruments;
            }

            return Promise.all([
                this._instrumentStorage.query(),
                this._fileInfoStorage.query()
            ])
            .then(([ instruments, fileInfoObjects ]) => {

                this._cachedInstruments = instruments.reduce((instrumentsWithFileInfo, instrument) => {
                    try {
                        let instrumentWithFileInfo = this._addFileInfo(instrument, fileInfoObjects);
                        instrumentsWithFileInfo.push(instrumentWithFileInfo);
                    } catch (error) {
                        this._logger.error('Omitting instrument due to missing file info.', { instrument, error });
                    }
                    return instrumentsWithFileInfo;
                }, []);

                return this._cachedInstruments;
            });
        });
    }

    /**
    * Saves the given instruments.
    *
    * @param   {Object}             options
    * @param   {Array.<Instrument>} options.instruments
    * @returns {Promise}
    */
    saveInstruments(options) {

        return validateAsync(options, [ 'instruments' ])
        .then(({ instruments }) => {

            let promisedInstruments = instruments.map(instrument => {

                let { soundBankInfo, imageInfo } = instrument,
                    promisedSoundBankInfoId,
                    promisedImageInfoId;

                promisedSoundBankInfoId = soundBankInfo.id ? Promise.resolve(soundBankInfo.id)
                                                           : this._fileInfoStorage.insert(soundBankInfo).then(({ id }) => id);

                promisedImageInfoId = imageInfo.id ? Promise.resolve(imageInfo.id)
                                                           : this._fileInfoStorage.insert(imageInfo).then(({ id }) => id);

                return Promise.all([ promisedSoundBankInfoId, promisedImageInfoId ])
                .then(([ soundBankInfoId, imageInfoId ]) => {

                    let instrumentToInsert = Object.assign({}, instrument, {
                        soundBankInfo: {
                            id: soundBankInfoId
                        },
                        imageInfo: {
                            id: imageInfoId
                        }
                    });
                    return this._instrumentStorage.insert(instrumentToInsert);
                });
            });
            return Promise.all(promisedInstruments);
        });
    }

    /**
    * The `imageInfo` and `soundBankInfo` properties of instruments returned by instrument storage
    * are objects with only an `id` property which refers to ID to use to fetch the corresponding
    * FileInfo objects from fileInfoStorage. This method performs that lookup so that the empty objects
    * are replaced by the full FileInfo objects.
    */
    _addFileInfo(instrument, fileInfoObjects) {

        let imageInfoId = instrument.imageInfo.id,
            imageInfo = fileInfoObjects.find(({ id }) => id === imageInfoId);
        if (!imageInfo) throw new Error(`No FileInfo found with ID ${imageInfoId}`);

        let soundBankInfoId = instrument.soundBankInfo.id,
            soundBankInfo = fileInfoObjects.find(({ id }) => id === soundBankInfoId);
        if (!soundBankInfo) throw new Error(`No FileInfo found with ID ${soundBankInfoId}`);

        Object.assign(instrument, { imageInfo, soundBankInfo });
        return instrument;
    }
}
