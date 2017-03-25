import { validate } from 'parameter-validator';

export default class InstrumentManager {

    constructor(options) {

        validate(options, [
            'instrumentStorage',
            'fileStorage',
            'soundBankStorage'
        ], this);
    }

    getInstruments() {

    }
}
