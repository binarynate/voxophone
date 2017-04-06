import { setOrientation } from 'nativescript-orientation';
import Component from 'nativescript-component';

class PerformanceView extends Component {

    /**
    * @override
    */
    static get isSingleton() {
        return true;
    }

    init() {

        setOrientation('portrait', false);
    }
}

PerformanceView.export(exports);
