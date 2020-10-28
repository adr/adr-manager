const {Server} = require('..');
const config = require('../config');

const app = new Server(config);

app.listen().then(() => {
  console.log(`Listening on ${config.serverHost}:${config.serverPort}`);
})
.catch((error) => {
  app.close();
  console.log('Error', error);
});
