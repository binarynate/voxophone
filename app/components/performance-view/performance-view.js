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

        if (this._initialized) {
            return;
        }

        // super.onLoaded(...arguments);

        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'logger' ], this, { addPrefix: '_' });
        this._initialized = true;
    }
}

PerformanceView.export(exports);
