import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class PerformanceView extends Component {

    /**
    * @override
    */
    static get isSingleton() {
        return true;
    }

    onLoaded() {

        if (this._initialized) {
            return;
        }

        super.onLoaded(...arguments);

        let appDependencies = this.get('appDependencies');

        validate(appDependencies, [ 'logger', 'voxophone', 'instrumentStorage' ], this, { addPrefix: '_' });
        this._initialized = true;

        return this._instrumentStorage.query();
    }
}

PerformanceView.export(exports);
