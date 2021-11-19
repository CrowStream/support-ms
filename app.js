require('dotenv').config();

const server_model = require('./server/server');

const server = new Server();
server.start();
