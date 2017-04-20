import Component from 'nativescript-component';
import delay from '../../utils/delay';

const MARGIN_STEP_SIZE = 1;
const MARGIN_DELAY = 10;
const MARGIN_MAX = 80;
const MARGIN_MIN = 20;

class Instructions extends Component {

    init() {
        let imagePath = `${__dirname}/img/instructions-phone-down.png`;
        this.set('imagePath', imagePath);
        this._animate();
    }

    _animate() {

        return this._increaseMargin()
        .then(() => this._decreaseMargin())
        .then(() => this._animate());
    }

    _increaseMargin() {

        let margin = this._getMargin();

        if (margin >= MARGIN_MAX) {
            return Promise.resolve();
        }
        let newMargin = margin + MARGIN_STEP_SIZE;
        this._setMargin(newMargin);
        return delay(MARGIN_DELAY).then(() => this._increaseMargin());
    }

    _decreaseMargin() {

        let margin = this._getMargin();

        if (margin <= MARGIN_MIN) {
            return Promise.resolve();
        }
        let newMargin = margin - MARGIN_STEP_SIZE;
        this._setMargin(newMargin);
        return delay(MARGIN_DELAY).then(() => this._decreaseMargin());
    }

    _getMargin() {
        let marginString = this._viewToResize.margin.split(' ')[0];
        return Number.parseInt(marginString);
    }

    _setMargin(margin) {
        this._viewToResize.margin = new Array(4).fill(margin).join(' ');
    }

    get _viewToResize() {
        return this.view.getViewById('instructions');
    }
}

Instructions.export(exports);
