import Component from 'nativescript-component';
import delay from '../../utils/delay';

const MARGIN_STEP_SIZE = 1;
const MARGIN_MAX_DELAY = 150;
const MARGIN_MIN_DELAY = 100;
const MARGIN_MAX = 30;
const MARGIN_MIN = 5;

class Instructions extends Component {

    init() {

        /** @todo: Subscribe to music note events. */

        let imagePath = `${__dirname}/img/instructions-phone-down.png`;
        this.set('imagePath', imagePath);
        this._animate();
    }

    onTap() {

        let dependencies = this.get('dependencies');
        this.navigate({
            component: 'performance-view',
            context: { dependencies }
        });
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
        let marginDelay = this._getMarginDelay(newMargin);
        return delay(marginDelay).then(() => this._increaseMargin());
    }

    _decreaseMargin() {

        let margin = this._getMargin();

        if (margin <= MARGIN_MIN) {
            return Promise.resolve();
        }
        let newMargin = margin - MARGIN_STEP_SIZE;
        this._setMargin(newMargin);
        let marginDelay = this._getMarginDelay(newMargin);
        return delay(marginDelay).then(() => this._decreaseMargin());
    }

    _getMargin() {
        let marginString = this._viewToResize.margin.split(' ')[0];
        return Number.parseInt(marginString);
    }

    _setMargin(margin) {
        this._viewToResize.margin = new Array(4).fill(margin).join(' ');
    }

    _getMarginDelay(margin) {

        let normalizedMargin = margin - MARGIN_MIN,
            normalizedMarginRange = MARGIN_MAX - MARGIN_MIN;

        let halfwayPoint = normalizedMarginRange / 2;
        let delayPercentage = Math.abs(halfwayPoint - normalizedMargin) / halfwayPoint;
        let delay = delayPercentage * MARGIN_MAX_DELAY;

        return delay < MARGIN_MIN_DELAY ? MARGIN_MIN_DELAY : delay;
    }

    get _viewToResize() {
        return this.view.getViewById('instructions');
    }
}

Instructions.export(exports);
