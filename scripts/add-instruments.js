import path from 'path';
import logger from 'winston';
import InstrumentManager from '../app/models/InstrumentManager';
import NodeFileSystemJsonStorage from './util/NodeFileSystemJsonStorage';
import NodeFileInfoStorage from './util/NodeFileInfoStorage';

const storageBasePath = __dirname + '/../app/data';

let defaultSoundBank = {
    name: 'GeneralUser GS MuseScore v1.442.sf2'
};
defaultSoundBank.filePath = path.join(__dirname, 'files', defaultSoundBank.name)

let instruments = [
    {
        name: 'Acoustic Grand Piano',
        soundBankProgramNumber: 0,
        imageInfo: {
            name: 'acoustic-grand-piano.png'
        }
    },
    {
        name: 'Vibraphone',
        soundBankProgramNumber: 11,
        imageInfo: {
            name: 'vibraphone.jpg'
        }
    },
    {
        name: 'Alto Sax',
        soundBankProgramNumber: 65,
        imageInfo: {
            name: 'alto-sax.jpg'
        }
    }
];

let instrumentStorage = new NodeFileSystemJsonStorage({
    directoryPath: `${storageBasePath}/instruments`
});

let fileInfoStorage = new NodeFileInfoStorage({
    directoryPath: `${storageBasePath}/fileInfo`
});

let instrumentManager = new InstrumentManager({
    logger,
    instrumentStorage,
    fileInfoStorage
});

logger.info('Saving the instruments...');

fileInfoStorage.insert(defaultSoundBank)
.then(soundBankInfo => {

    // Add the sound bank and the imageInfo file path for each instrument
    for (let instrument of instruments) {

        Object.assign(instrument, { soundBankInfo });
        let { imageInfo } = instrument;
        imageInfo.filePath = path.join(__dirname, 'files', imageInfo.name);
    }

    return instrumentManager.saveInstruments({ instruments });
})
.then(() => logger.info('Successfully finished saving the instruments!'))
.catch(error => logger.error(`An error occurred while saving the instruments: ${error.stack}`));
