import { validate } from 'parameter-validator';
import Component from 'nativescript-component';

class Instrument extends Component {

    onTap() {

        this.get('selectInstrument')();
    }
}

Instrument.export(exports);
