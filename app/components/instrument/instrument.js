import Component from 'nativescript-component';

class Instrument extends Component {

    init() {

        if (this._initialized) {
            return;
        }

        // super.onLoaded(...arguments);
        // let instrument = this.get('instrument');
        // let imageSource = instrument.imageInfo.filePath;
        // this.set('imageSource', imageSource);
        this._initialized = true;
    }


}

Instrument.export(exports);
