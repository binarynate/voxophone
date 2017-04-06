import path from 'path';
import logger from 'winston';
import InstrumentManager from '../app/models/InstrumentManager';
import NodeFileSystemJsonStorage from './util/NodeFileSystemJsonStorage';
import NodeFileInfoStorage from './util/NodeFileInfoStorage';

const storageBasePath = __dirname + '/../app/data';

let defaultSoundBank = {
    name: 'GeneralUser GS MuseScore v1.442.sf2'
};
defaultSoundBank.filePath = path.join(__dirname, 'files', defaultSoundBank.name);

let instruments = [
    {
        name: 'Acoustic Grand Piano',
        soundBankProgramNumber: 0,
        imageInfo: {
            name: 'acoustic-grand-piano.png'
        }
    },
    {
        name: 'Music Box',
        soundBankProgramNumber: 10,
        imageInfo: {
            name: 'music-box.jpg'
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
        name: 'Marimba',
        soundBankProgramNumber: 12,
        imageInfo: {
            name: 'marimba.jpg'
        }
    },
    {
        name: 'Drawbar Organ',
        soundBankProgramNumber: 16,
        imageInfo: {
            name: 'drawbar-organ.png'
        }
    },
    {
        name: 'Acoustic Guitar (nylon)',
        soundBankProgramNumber: 24,
        imageInfo: {
            name: 'nylon-guitar.png'
        }
    },
    {
        name: 'Violin',
        soundBankProgramNumber: 40,
        imageInfo: {
            name: 'violin.png'
        }
    },
    {
        name: 'Orchestral Harp',
        soundBankProgramNumber: 46,
        imageInfo: {
            name: 'orchestral-harp.jpg'
        }
    },
    {
        name: 'Trombone',
        soundBankProgramNumber: 57,
        imageInfo: {
            name: 'trombone.jpg'
        }
    },
    {
        name: 'Muted Trumpet',
        soundBankProgramNumber: 59,
        imageInfo: {
            name: 'trumpet.jpg'
        }
    },
    {
        name: 'Soprano Sax',
        soundBankProgramNumber: 66,
        imageInfo: {
            name: 'alto-sax.jpg'
        }
    },
    {
        name: 'Flute',
        soundBankProgramNumber: 73,
        imageInfo: {
            name: 'flute.png'
        }
    },
    {
        name: 'FX 1 (rain)',
        soundBankProgramNumber: 96,
        imageInfo: {
            name: 'swirl.jpg'
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
