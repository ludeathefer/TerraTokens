import express from 'express';
const app = express();
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const port = 3000;

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});