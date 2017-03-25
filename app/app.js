import { Logger } from 'nativescript-utilities';
import VoxophoneEngine from 'nativescript-voxophone-engine';
import application from 'application';

import FileSystemJsonStorage from './models/storage/FileSystemJsonStorage';
import FileInfoStorage from './models/storage/FileInfoStorage';

let logger = new Logger();

logger.info(`Building the app's dependencies...`);
let storageBasePath = `${__dirname}/data`;

let instrumentStorage = new FileSystemJsonStorage({ logger, directoryPath: `${storageBasePath}/instruments` });
let fileInfoStorage = new FileInfoStorage({ logger, directoryPath: `${storageBasePath}/fileInfo` });

let appDependencies = {
    logger,
    voxophone: new VoxophoneEngine(),
    fileInfoStorage,
    instrumentStorage
};

application.start({
    moduleName: 'components/performance-view/performance-view',
    context: {
        appDependencies
    }
});

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
