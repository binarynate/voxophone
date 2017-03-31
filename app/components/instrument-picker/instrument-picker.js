import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class InstrumentPicker extends Component {


    init() {

        console.log('initializing instrument-picker');
        let dependencies = this.get('dependencies');

        validate(dependencies, [ 'logger', 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        return this._instrumentManager.getInstruments()
        .then(instruments => {

            console.log('received instruments');
            // console.log(`${Math.random()} instruments: ${JSON.stringify(instruments)}`);

            this.set('instruments', instruments);
            this.set('instrument', instruments[0]);
            console.log('instrument set: ' + JSON.stringify(this.get('instrument')));
            this._initialized = true;
        });
    }
}

InstrumentPicker.export(exports);
