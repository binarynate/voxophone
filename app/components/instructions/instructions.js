import Component from 'nativescript-component';
import { validate } from 'parameter-validator';
import { MusicNoteEventType } from 'nativescript-voxophone-engine';
import delay from '../../utils/delay';

const MARGIN_STEP_SIZE = 1;
const MARGIN_MAX_DELAY = 150;
const MARGIN_MIN_DELAY = 100;
const MARGIN_MAX = 50;
const MARGIN_MIN = 30;

class Instructions extends Component {

    init() {

        let dependencies = this.get('dependencies');
        validate(dependencies, [ 'voxophone' ], this, { addPrefix: '_' });
        // Listen for a music note event to dismiss the instructions screen.
        this._voxophone.addMusicNoteListener(this._handleMusicNoteEvent.bind(this));
        this._initImagePaths();
        this._animate();
    }

    onTap() {

        this._dismissInstructions();
    }

    _animate() {

        return this._increaseMargin()
        .then(() => this._decreaseMargin())
        .then(() => this._animate());
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

    _dismissInstructions() {

        let dependencies = this.get('dependencies');
        this.navigate({
            component: 'performance-view',
            context: { dependencies }
        });
    }

    _getMargin() {
        let marginString = this._viewToResize.margin.split(' ')[0];
        return Number.parseInt(marginString);
    }

    _getMarginDelay(margin) {

        let normalizedMargin = margin - MARGIN_MIN,
            normalizedMarginRange = MARGIN_MAX - MARGIN_MIN;

        let halfwayPoint = normalizedMarginRange / 2;
        let delayPercentage = Math.abs(halfwayPoint - normalizedMargin) / halfwayPoint;
        let delay = delayPercentage * MARGIN_MAX_DELAY;

        return delay < MARGIN_MIN_DELAY ? MARGIN_MIN_DELAY : delay;
    }

    _handleMusicNoteEvent(event) {

        if (event.type === MusicNoteEventType.NOTE_ON) {
            this._dismissInstructions();
        }
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

    _initImagePaths() {

        let instructionsImage = `${__dirname}/img/instructions-phone-down.png`;
        this.set('instructionsImage', instructionsImage);
        let buttonImage = `${__dirname}/img/check-mark-button.png`;
        this.set('buttonImage', buttonImage);
    }

    _setMargin(margin) {
        this._viewToResize.margin = new Array(4).fill(margin).join(' ');
    }

    get _viewToResize() {
        return this.view.getViewById('instructions');
    }
}

Instructions.export(exports);
