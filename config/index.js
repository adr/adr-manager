module.exports = {
  env: process.env.NODE_ENV || process.env.npm_package_config_env,
  serverPort: process.env.SERVER_PORT || process.env.npm_package_config_serverPort,
  serverHost: process.env.SERVER_HOST || process.env.npm_package_config_serverHost,
  publicPath: process.env.PUBLIC_PATH || process.env.npm_package_config_publicPath,

  webpackServer () {
    return require('./webpack')(
      Object.assign({mode: 'server'}, module.exports)
    );
  },
  webpackClient () {
    return require('./webpack')(
      Object.assign({mode: 'client'}, module.exports)
    );
  }
};
