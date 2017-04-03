import { FlexboxLayout, AlignItems, JustifyContent } from 'ui/layouts/flexbox-layout';
import { Color } from 'color';
import Component from 'nativescript-component';
import delay from '../../utils/delay';

class MusicNoteMeter extends Component {

    /**
    * Sets the component's height equal to its width.
    */
    init() {

        let { height, width } = this.view.getActualSize();
        let totalDiameter = Math.min(height, width);

        if (totalDiameter === 0) {
            // The view hasn't been fully initialized. Let's try again in 1 millisecond.
            return delay(1).then(() => this.init());
        }
        this.view.height = this.view.width = totalDiameter;
        this.view.borderRadius = totalDiameter / 2;


        let center = this.view.getViewById('meter-center');
        this.view.removeChild(center);
        let centerSize = center.getActualSize();

        let ring = new FlexboxLayout();
        this.view.addChild(ring);
        ring.addChild(center);


        ring.height = ring.width = centerSize.height + 40;
        ring.backgroundColor = new Color('#FF0000');
        ring.alignItems = AlignItems.CENTER;
        ring.justifyContent = JustifyContent.CENTER;
        FlexboxLayout.setFlexGrow(center, 0);
        FlexboxLayout.setFlexShrink(center, 0);

        console.log('made it to the end of initialization!');
    }
}

MusicNoteMeter.export(exports);
