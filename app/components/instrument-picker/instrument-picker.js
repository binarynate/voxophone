import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class InstrumentPicker extends Component {


    init() {

        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'logger', 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        return this._instrumentManager.getInstruments()
        .then(instruments => {

            let instrumentOptions = instruments.map(instrument => ({ instrument }));
            this.set('instrumentOptions', instrumentOptions);
            // this.set('instrument', instruments[0]);
            this._initialized = true;
        });
    }
}

InstrumentPicker.export(exports);
