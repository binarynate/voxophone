import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class Instrument extends Component {

    init() {

        let instrument = this.get('instrument');
        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'voxophone' ], this, { addPrefix: '_' });
        let imageSource = instrument.imageInfo.filePath;
        this.set('imageSource', imageSource);
    }

    onTap() {

        let instrument = this.get('instrument');
        console.log('Setting instrument...');
        this._voxophone.setInstrument({ instrument });
        console.log('Finished setting instrument!');
    }
}

Instrument.export(exports);
