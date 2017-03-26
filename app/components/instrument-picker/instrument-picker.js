// import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class InstrumentPicker extends Component {


    onLoaded() {

        if (this._initialized) {
            return;
        }

        super.onLoaded(...arguments);

        let dependencies = this.get('dependencies');
        console.log(dependencies);
        // validate(dependencies, [ 'logger', 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        // return this._instrumentManager.getInstruments()
        // .then(instruments => {
        //     this.set('instruments', instruments);
        //     this.set('instrument', instruments[0]);
        //     this._initialized = true;
        // });
    }
}

InstrumentPicker.export(exports);
