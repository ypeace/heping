const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

let {env} = argv;

let name = ''

switch (env) {
    case "dist":
        name = "dist";
        break;
    default:
        name = "dev";
}

module.exports = require(path.resolve(__dirname, 'cfg' ,name ));
