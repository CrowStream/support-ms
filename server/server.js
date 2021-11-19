const express = require('express')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        // Setup.
        this.port = process.env.PORT;
        this.app = express();

        // Database initialization.
        this.databaseConnection();

        // Routes initialization.
        this.routes();
    }

    routes(){
        this.app.get('/ping', (req, res) => {
            res.send('Pong!');
        });
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Example app listening at http://localhost:' + this.port)
        })
    }

    async databaseConnection(){
        await dbConnection();
    }
}

module.exports = Server;