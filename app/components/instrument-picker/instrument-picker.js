import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class InstrumentPicker extends Component {

    init() {

        let dependencies = this.get('dependencies');
        let { _voxophone } = validate(dependencies, [ 'logger', 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        return this._instrumentManager.getInstruments()
        .then(instruments => {

            instruments.sort((instrument1, instrument2) => instrument1.soundBankProgramNumber > instrument2.soundBankProgramNumber ? 1 : -1);

            let instrumentOptions = instruments.map(instrument => {

                return {
                    // Pass the child a component a function it can call to set its instrument as the selected one.
                    selectInstrument: () => this._setInstrument(instrument),
                    imageSource: instrument.imageInfo.filePath
                };
            });
            this.set('instrumentOptions', instrumentOptions);
            this._setInstrument(instruments[0]);
        });
    }

    _setInstrument(instrument) {

        this._voxophone.setInstrument({ instrument })
        this.set('selectedInstrumentImageSource', instrument.imageInfo.filePath);
    }
}

InstrumentPicker.export(exports);
