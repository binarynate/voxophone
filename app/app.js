import { Logger } from 'nativescript-utilities';
import VoxophoneEngine from 'nativescript-voxophone-engine';
import application from 'application';

import FileSystemJsonStorage from './models/storage/FileSystemJsonStorage';

let logger = new Logger();

logger.info(`Building the app's dependencies...`);
let storageBasePath = `${__dirname}/data`;

let appDependencies = {
    logger,
    voxophone: new VoxophoneEngine(),
    instrumentStorage: new FileSystemJsonStorage({ logger, directoryPath: `${storageBasePath}/instruments` })
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
