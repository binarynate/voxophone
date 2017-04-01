import _ from 'lodash';
import { validate, validateAsync } from 'parameter-validator';

export default class InstrumentManager {

    constructor(options) {

        validate(options, [
            'instrumentStorage',
            'fileInfoStorage',
            'logger'
        ], this, { addPrefix: '_' });
    }

    /**
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
                    debugger;
                    let instrumentToInsert = _.omit(instrument, [ 'soundBankInfo', 'imageInfo' ]);
                    Object.assign(instrumentToInsert, { soundBankInfoId, imageInfoId });
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
