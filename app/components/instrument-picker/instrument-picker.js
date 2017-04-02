import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class InstrumentPicker extends Component {

    init() {

        let dependencies = this.get('dependencies');
        let { _voxophone } = validate(dependencies, [ 'logger', 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        return this._instrumentManager.getInstruments()
        .then(instruments => {

            let instrumentOptions = instruments.map(instrument => {
                return {
                    instrument,
                    voxophone: _voxophone,
                    imageSource: instrument.imageInfo.filePath
                };
            });
            this.set('instrumentOptions', instrumentOptions);
            this._initialized = true;
        });
    }
}

InstrumentPicker.export(exports);
