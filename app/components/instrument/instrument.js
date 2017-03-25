import Component from 'nativescript-component';

class Instrument extends Component {

    onLoaded() {
        console.log('onLoaded was invoked!');
        super.onLoaded(...arguments);
    }
}

Instrument.export(exports);
