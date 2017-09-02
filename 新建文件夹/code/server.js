const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./cfg/dev.js');
const {dfPath} = require('./cfg/default');
const OpenBrowser = require('open-browser-webpack-plugin');

const argv = require('minimist')(process.argv.slice(2));


let app = new ( require('express') )();

let port = 9001;

config.entry.unshift('webpack-hot-middleware/client?reload=true');


console.log(argv.o);
if( argv.o === true ){
    config.plugins.push(new OpenBrowser( { url : `http://localhost:${port}` } ) );
}

let compiler = webpack(config);

app.use( webpackDevMiddleware(compiler, {
    publicPath: '/assets/',
    stats:{ colors: true },
    headers: { "X-Custom-Header": "yes" }
}) );

app.use( webpackHotMiddleware(compiler) );

app.get('/*', (req, res)=> res.sendFile(dfPath.src + '/index.html') )

app.listen(port, (error)=>{
    if(!error){
        console.log('');
    }
});
