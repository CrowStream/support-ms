const ping = require('express-ping');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { read_task, create_task } = require('../messaging/task_management');
const { comment_notification } = require('../tasks/comment_notification');
const { upload_file_task } = require('../tasks/upload_file');


class Server {
    constructor(){
        // Setup
        this.port = process.env.SUPPORT_MS_PORT | 3000;
        this.app = express();

        // Database initialization
        this.databaseConnection();

        // Tasking initialization
        this.tasks();

        // Middelware initialization
        this.middlewares();

        // Routes initialization
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(ping.ping());
        this.app.use('/posts', (require('../routes/post')));
        this.app.use('/support_requests', require('../routes/support_request'));
    }

    start(){
        const server = this.app.listen(this.port, () => {
            console.log('Support_ms listening at port: ' + this.port);
        });
    }

    databaseConnection(){
        dbConnection();
    }

    tasks(){
        // Read Email Notification Task.
        read_task('comment.creation', 'comment.creation', comment_notification);

        // Read Upload File Task.
        read_task('file.upload', 'file.upload', upload_file_task);
    }

}

module.exports = Server;