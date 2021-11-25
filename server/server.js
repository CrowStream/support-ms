const ping = require('express-ping');
const express = require('express')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        // Setup
        this.port = process.env.SUPPORT_MS_PORT | 3000;
        this.app = express();

        // Database initialization
        this.databaseConnection();

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
    }

    start(){
        const server = this.app.listen(this.port, () => {
            const host = server.address().address;
            const port = server.address().port;
            console.log('App listening at http://${host}:${port}');
        });
    }

    databaseConnection(){
        dbConnection();
    }
}

module.exports = Server;