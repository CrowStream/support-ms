const ping = require('express-ping');
const express = require('express');
const { dbConnection } = require('../database/config');
const { mqConnection } = require('../messaging/config');

class Server {
    constructor(){
        // Setup
        this.port = process.env.SUPPORT_MS_PORT | 3000;
        this.app = express();

        // Database initialization
        this.databaseConnection();

        // Message queue connection
        //this.messageQueueConnection();

        // Middelware initialization
        this.middlewares();

        // Routes initialization
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use(ping.ping());
        this.app.use('/posts', require('../routes/post'));
        this.app.use('/support_request', require('../routes/support_request'));
    }

    start(){
        const server = this.app.listen(this.port, () => {
            console.log('Support_ms listening at port: ' + this.port);
        });
    }

    databaseConnection(){
        dbConnection();
    }

    messageQueueConnection(){
        mqConnection();
    }
}

module.exports = Server;