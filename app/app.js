import { Logger } from 'nativescript-utilities';
import VoxophoneEngine from 'nativescript-voxophone-engine';
import application from 'application';

import FileSystemJsonStorage from './models/storage/FileSystemJsonStorage';
import FileInfoStorage from './models/storage/FileInfoStorage';
import InstrumentManager from './models/InstrumentManager';

let logger = new Logger();

logger.info(`Building the app's dependencies...`);
let storageBasePath = `${__dirname}/data`;

let instrumentManager = new InstrumentManager({
    logger,
    instrumentStorage: new FileSystemJsonStorage({ logger, directoryPath: `${storageBasePath}/instruments` }),
    fileInfoStorage: new FileInfoStorage({ logger, directoryPath: `${storageBasePath}/fileInfo` })
});

let dependencies = {
    logger,
    voxophone: new VoxophoneEngine(),
    instrumentManager
};

application.start({
    moduleName: 'components/performance-view/performance-view',
    context: { dependencies }
});

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
