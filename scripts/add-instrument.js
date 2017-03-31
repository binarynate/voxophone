import NodeFileSystemJsonStorage from './NodeFileSystemJsonStorage';

const storageBasePath = __dirname + '/../app/data';
const defaultSoundBankId = 'b32b751a-cc80-4b6f-96ea-8c8eb9f1b9c9';

let instruments = [

    {
        'name': 'Alto Sax',
        'soundBankInfo': {
            'id': defaultSoundBankId
        },
        'soundBankProgramNumber': 65,
        'imageInfo': {
            name: 'alto-sax.jpg'
        }
    }
];



let instrumentStorage = new NodeFileSystemJsonStorage({
    directoryPath: `${storageBasePath}/instruments`
});
