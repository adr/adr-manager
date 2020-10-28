const express = require('express');
const {publicServer, vueServer, appServer} = require('./middlewares/app');

/*
* HTTP server class.
*/

exports.Server = class Server {

  /*
  * Class constructor.
  */

  constructor (config) {
    this.config = config;
    this.app = null;
    this.server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  async listen () {
    if (this.server) return this;

    this.app = express();
    this.app.use(publicServer(this));
    this.app.use(vueServer(this));
    this.app.use(appServer(this));

    await new Promise((resolve) => {
      let {serverPort, serverHost} = this.config;
      this.server = this.app.listen(serverPort, serverHost, resolve);
    });
  }

  /*
  * Returns a promise which stops the server.
  */

  async close () {
    if (!this.server) return this;

    await new Promise((resolve) => {
      this.server.close(resolve);
    });
    this.server = null;
    this.app = null;
  }

}
