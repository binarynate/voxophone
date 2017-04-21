import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

/**
* Displays the available instruments for selection and the currently selected instrument.
*
*/
class InstrumentPicker extends Component {

    init() {

        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        return this._instrumentManager.getInstruments()
        .then(instruments => {

            // The context objects that will be bound to the nested `instrument` components.
            let instrumentOptions = instruments.map(instrument => ({
                // Pass the child a component a function it can call to set its instrument as the selected one.
                selectInstrument: () => this._setInstrument(instrument),
                imageSource: instrument.imageInfo.filePath
            }));
            this.set('instrumentOptions', instrumentOptions);
            this._setInstrument(instruments[0]);
        });
    }

    _setInstrument(instrument) {

        this._voxophone.setInstrument({ instrument });
        this.set('selectedInstrumentImageSource', instrument.imageInfo.filePath);
    }
}

InstrumentPicker.export(exports);
