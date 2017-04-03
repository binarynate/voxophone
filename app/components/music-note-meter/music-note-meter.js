import { FlexboxLayout, AlignItems, JustifyContent } from 'ui/layouts/flexbox-layout';
import { Color } from 'color';
import Component from 'nativescript-component';
import delay from '../../utils/delay';

class MusicNoteMeter extends Component {

    /**
    * Sets the component's height equal to its width.
    */
    init() {

        let outerRingSize = this.view.getActualSize();
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

        let ring = new FlexboxLayout();
        this.view.addChild(ring);
        ring.addChild(center);

        let ringRadius = centerRadius + ((outerRingRadius - centerRadius) / 2);
        ring.height = ring.width = ringRadius * 2;
        ring.borderRadius = ringRadius;
        ring.backgroundColor = new Color('#FF0000');
        ring.alignItems = AlignItems.CENTER;
        ring.justifyContent = JustifyContent.CENTER;
        FlexboxLayout.setFlexGrow(center, 0);
        FlexboxLayout.setFlexShrink(center, 0);

        console.log('made it to the end of initialization!');
    }
}

MusicNoteMeter.export(exports);
