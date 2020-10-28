const express = require('express');
const {join} = require('path');

/*
* Returns a middleware for serving static files.
*/

exports.publicServer = function () {
  return express.static('public');
}

/*
* Returns the Vue.js server middleware.
*/

exports.vueServer = function ({config}) {
  let isDev = config.env === 'development';

  if (isDev) { // development
    let {devServer} = require('express-vue-dev');
    return devServer({
      server: config.webpackServer(),
      client: config.webpackClient()
    });
  }
  else { // production
    let {bundleRenderer} = require('express-vue-builder');
    let bundlePath = join(__dirname, '..', '..', '..', 'dist', 'server', 'bundle.js');
    return [
      bundleRenderer(bundlePath), // register req.vue
      express.static('dist/client') // serve bundles from ./dist
    ];
  }
}

/*
* Returns a middleware which renders the Vue.js application.
*/

exports.appServer = function ({config}) {
  return (req, res) => {
    let {publicPath, env} = config;
    let isDev = env === 'development';
    let page = req.vue.renderToStream();

    res.write(`<!DOCTYPE html>`);
    page.on('init', () => {
      res.write(`<html lang="en">`);
      res.write(`<head>`);
      res.write(  `<meta charset="utf-8">`);
      res.write(  `<meta name="viewport" content="width=device-width, initial-scale=1">`);
      res.write(  `<title>Example</title>`);
      res.write(  !isDev ? `<link href="${publicPath}bundle.css" rel='stylesheet' type='text/css'>` : '');
      res.write(`</head>`);
      res.write(`<body>`);
    });
    page.on('data', (chunk) => {
      res.write(chunk);
    });
    page.on('end', () => {
      res.write(  `<script src="${publicPath}bundle.js"></script>`);
      res.write(`</body>`);
      res.write(`</html>`);
      res.end();
    });
    page.on('error', function (error) {
      console.error(error);
      res.status(500).send('Server Error');
    });
  };
}
