const express = require('express')
const { dbConnection } = require('../database/config')

class server {
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
        app.get('/', (req, res) => {
            res.send('Hello World!');
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