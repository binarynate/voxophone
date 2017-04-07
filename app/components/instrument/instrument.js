import Component from 'nativescript-component';

/**
* An available instrument which can be selected.
*/
class Instrument extends Component {

    onTap() {

        this.get('selectInstrument')();
    }
}

Instrument.export(exports);
