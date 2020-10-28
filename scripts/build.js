process.env.NODE_ENV = 'production';

const {VueBuilder} = require('vue-builder');
const {webpackServer, webpackClient} = require(`../config`);
const mode = process.argv[2];
const options = mode === 'server' ? webpackServer() : webpackClient();

new VueBuilder(options)
.build()
.catch(console.log);
