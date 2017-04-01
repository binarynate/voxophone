import path from 'path';
import logger from 'winston';
import InstrumentManager from '../app/models/InstrumentManager';
import NodeFileSystemJsonStorage from './NodeFileSystemJsonStorage';
import NodeFileInfoStorage from './NodeFileInfoStorage';

const storageBasePath = __dirname + '/../app/data';
const defaultSoundBankId = 'b32b751a-cc80-4b6f-96ea-8c8eb9f1b9c9';

let instruments = [

    {
        'name': 'Alto Sax',
        'soundBankInfo': {
            'id': defaultSoundBankId
        },
        'soundBankProgramNumber': 65,
        'imageInfo': {
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

// Add the file path to each instrument's imageInfo
for (let instrument of instruments) {
    let { imageInfo } = instrument;
    imageInfo.filePath = path.join(__dirname, 'images', imageInfo.name);
}

logger.info('Saving the instruments...');

instrumentManager.saveInstruments({ instruments })
.then(() => logger.info('Successfully finished saving the instruments!'))
.catch(error => logger.error(`An error occurred while saving the instruments: ${error.stack}`));
