import { FlexboxLayout, AlignItems, JustifyContent } from 'ui/layouts/flexbox-layout';
import { Color } from 'color';
import ColorEditor from '../../utils/Color';
import Component from 'nativescript-component';
import delay from '../../utils/delay';

const NUMBER_OF_RINGS = 4;

class MusicNoteMeter extends Component {

    init() {

        return this._buildMusicNoteMeterRings()
        .then(rings => {

            this._rings = rings;
            console.log('invoking blink the first time');
            return this._blink();
        });
    }

    _noteOn(milliseconds) {

        return this._rings.slice(1).reduce((promise, ring) => {

            let index = this._rings.indexOf(ring);
            console.log(`Turning ring ${index} on`);

            return promise
            .then(() => this._setRingVisibility(ring, true))
            .then(() => delay(milliseconds));
        }, Promise.resolve());
    }

    _noteOff(milliseconds) {

        let reversedRings = [ ...this._rings.slice(1) ].reverse();

        return reversedRings.reduce((promise, ring) => {

            let index = this._rings.indexOf(ring);
            console.log(`Turning ring ${index} off`);

            return promise
            .then(() => this._setRingVisibility(ring, false))
            .then(() => delay(milliseconds));
        }, Promise.resolve());
    }

    _setRingVisibility(ring, isVisible) {

        ring.backgroundColor = isVisible ? this._getColorForRing(ring) : this.view.page.backgroundColor;
    }

    _blink() {
        return delay(1000)
        .then(() => {
            console.log('going to invoke blink');
            this._visible = !this._visible;

            let milliseconds = 100;

            return this._visible ? this._noteOn(milliseconds) : this._noteOff(milliseconds);
        })
        .then(() => {
            console.log('invoking blink');
            return this._blink();
        });
    }

    /**
    * @returns {Promise.<Array.<View>>} - Array where each item is a View that is a ring in the music note meter's UI.
    *                                     The rings go from the center to the circumference as the index increases.
    */
    _buildMusicNoteMeterRings() {

        return this._getOuterRing()
        .then(outerRing => {

            let center = this.view.getViewById('meter-center');
            this.view.removeChild(center);

            let radiusLengthToDivide = outerRing.borderRadius - center.borderRadius;
            let radiusStepSize = radiusLengthToDivide / NUMBER_OF_RINGS;

            let numberOfRingsToCreate = NUMBER_OF_RINGS - 1; // Subtract one, since the outer ring already exists.
            let rings = this._createRings(center, numberOfRingsToCreate, radiusStepSize);
            rings.push(outerRing);

            // Link the rings together in a parent-child hierarchy.
            this._linkRingsTogether(rings);
            rings[0].addChild(center);

            this._setRingColors(rings);

            return rings;
        })
        .catch(error => {
            console.log(`An error occurred during ring creation. ${error.message}: ${error.stack}`);
        });
    }

    _createRings(initialRing, numberOfRings, radiusStepSize) {

        let previousRing = initialRing,
            rings = [];

        for (let i = 0; i < numberOfRings; i++) {

            let radius = previousRing.borderRadius + radiusStepSize;
            let ring = this._createRing(radius);
            rings.push(ring);
            previousRing = ring;
        }
        return rings;
    }

    _createRing(radius) {

        let ring = new FlexboxLayout();
        ring.height = ring.width = radius * 2;
        ring.borderRadius = radius;
        let color = this._getRandomColor();
        ring.backgroundColor = new Color(color);
        ring.alignItems = AlignItems.CENTER;
        ring.justifyContent = JustifyContent.CENTER;
        FlexboxLayout.setFlexGrow(ring, 0);
        FlexboxLayout.setFlexShrink(ring, 0);
        return ring;
    }

    _getOuterRing() {

        return Promise.resolve()
        .then(() => {

            let outerRing = this.view;
            let outerRingSize = outerRing.getActualSize();
            let outerRingRadius = Math.min(outerRingSize.height, outerRingSize.width) / 2;

            if (outerRingRadius === 0) {
                // The view hasn't been fully initialized. Let's try again in 1 millisecond.
                return delay(1).then(() => this._getOuterRing());
            }
            // Set the height and width equal to each other, because this view is initially just a rectangle.
            outerRing.height = this.view.width = outerRingRadius * 2;
            outerRing.borderRadius = outerRingRadius;
            return outerRing;
        });
    }

    _getRandomColor() {

        let num = Math.floor(Math.random() * 0xFFFFFF);
        return '#' + num.toString(16);
    }

    _linkRingsTogether(rings) {

        rings.forEach((ring, index) => {
            let parentRing = rings[index + 1];

            if (parentRing) {
                parentRing.addChild(ring);
            }
        });
    }

    _setRingColors(rings) {

        rings.forEach((ring, index) => {
            ring.backgroundColor = this._getColorForRingIndex(index);
        });
    }

    _getColorForRing(ring) {

        let ringIndex = this._rings.indexOf(ring);
        return this._getColorForRingIndex(ringIndex);
    }

    _getColorForRingIndex(ringIndex) {

        let rootColor = '#ff871e';
        let { r, g, b } = ColorEditor(rootColor).lighten(ringIndex * 0.2).rgb().object();
        return new Color(255, r, g, b);
    }
}

MusicNoteMeter.export(exports);
