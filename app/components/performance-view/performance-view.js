import { setOrientation } from 'nativescript-orientation';
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
        setOrientation('portrait', false);
    }
}

PerformanceView.export(exports);
