import { FlexboxLayout, AlignItems, JustifyContent } from 'ui/layouts/flexbox-layout';
import { Color } from 'color';
import ColorEditor from '../../utils/Color';
import Component from 'nativescript-component';
import delay from '../../utils/delay';

class MusicNoteMeter extends Component {

    /**
    * Sets the component's height equal to its width.
    */
    init() {

        try {

            let outerRing = this.view;
            let outerRingSize = outerRing.getActualSize();
            let outerRingRadius = Math.min(outerRingSize.height, outerRingSize.width) / 2;

            if (outerRingRadius === 0) {
                // The view hasn't been fully initialized. Let's try again in 1 millisecond.
                return delay(1).then(() => this.init());
            }
            this.view.height = this.view.width = outerRingRadius * 2;
            this.view.borderRadius = outerRingRadius;


            let center = this.view.getViewById('meter-center');
            this.view.removeChild(center);
            let centerSize = center.getActualSize();
            let centerRadius = centerSize.width / 2;

            console.log('Generating rings...');

            let numberOfRings = 4;
            let radiusLengthToDivide = outerRingRadius - centerRadius;
            let radiusStepSize = radiusLengthToDivide / numberOfRings;

            let rings = [];
            let previousRing = center;

            for (let i = 0; i < numberOfRings - 1; i++) {

                let radius = previousRing.borderRadius + radiusStepSize;
                let ring = this._createRing(radius);
                rings.push(ring);
                previousRing = ring;
            }
            rings.push(outerRing);

            rings[0].addChild(center);
            rings.forEach((ring, index) => {
                let parentRing = rings[index + 1];

                if (parentRing) {
                    parentRing.addChild(ring);
                }
            });

            let rootColor = '#ff871e';

            rings.forEach((ring, index) => {

                let { r, g, b } = ColorEditor(rootColor).lighten(index * 0.2).rgb().object();
                ring.backgroundColor = new Color(255, r, g, b);
            });

            console.log('made it to the end of initialization!');
        } catch (error) {
            console.log(`An error occurred during ring creation. ${error.message}: ${error.stack}`);
        }
    }

    _createRing(radius) {

        let ring = new FlexboxLayout();
        ring.height = ring.width = radius * 2;
        ring.borderRadius = radius;
        let color = this._getRandomColor();
        console.log('color: ' + color);
        ring.backgroundColor = new Color(color);
        ring.alignItems = AlignItems.CENTER;
        ring.justifyContent = JustifyContent.CENTER;
        FlexboxLayout.setFlexGrow(ring, 0);
        FlexboxLayout.setFlexShrink(ring, 0);
        return ring;
    }

    _getRandomColor() {

        let num = Math.floor(Math.random() * 0xFFFFFF);
        return '#' + num.toString(16);
    }
}

MusicNoteMeter.export(exports);
