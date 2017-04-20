import Component from 'nativescript-component';

class Instructions extends Component {

    init() {
        let imagePath = `${__dirname}/img/instructions-phone-down.png`;
        this.set('imagePath', imagePath);
    }

}

Instructions.export(exports);
