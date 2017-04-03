import Component from 'nativescript-component';
import delay from '../../utils/delay';

class MusicNoteMeter extends Component {

    /**
    * Sets the component's height equal to its width.
    */
    init() {

        let { height, width } = this.view.getActualSize();
        let length = Math.min(height, width);

        if (length === 0) {
            // The view hasn't been fully initialized. Let's try again in 1 millisecond.
            return delay(1).then(() => this.init());
        }

        this.view.height = this.view.width = length;
    }
}

MusicNoteMeter.export(exports);
