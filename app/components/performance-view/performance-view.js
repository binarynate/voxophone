import { setOrientation, getOrientation, disableRotation } from 'nativescript-orientation';
import Component from 'nativescript-component';

/**
* The main, top-level application component in which constituent components are nested.
*/
class PerformanceView extends Component {

    /**
    * @override
    */
    static get isSingleton() {
        return true;
    }

    init() {
        // Lock the orientation to portrait.
        let orientation = getOrientation();

        if (orientation === 'portrait') {
            disableRotation();
        } else {
            setOrientation('portrait', false);
        }
    }
}

PerformanceView.export(exports);
