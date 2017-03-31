import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class PerformanceView extends Component {

    /**
    * @override
    */
    static get isSingleton() {
        return true;
    }

    init() {

        console.log('initializing performace-view');
        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'logger' ], this, { addPrefix: '_' });
        this._initialized = true;
    }
}

PerformanceView.export(exports);
