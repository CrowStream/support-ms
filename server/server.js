var ping = require('express-ping');
const express = require('express')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        // Setup
        this.port = process.env.PORT;
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
        this.app.use('/comments', require('../routes/comment'));
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Example app listening at port: ' + this.port)
        })
    }

    async databaseConnection(){
        await dbConnection();
    }
}

module.exports = Server;