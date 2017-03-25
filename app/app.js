import { Logger } from 'nativescript-utilities';
import VoxophoneEngine from 'nativescript-voxophone-engine';
import application from 'application';

import InstrumentStorage from './models/storage/InstrumentStorage';

// Build the app's dependencies
let appDependencies = {
    logger: new Logger(),
    voxophone: new VoxophoneEngine(),
    instrumentStorage: new InstrumentStorage()
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
