
let script = process.argv[2];

if (!script) {
    throw new Error('Please specify the script name as command line argument.');
}

require('babel-register')({
    presets: [ 'node6' ]
});

require(`./${script}`);
