const amqplib = require('amqplib');

const mqConnection = () => {
    console.log('Conecting to message queue ' + process.env.MQ_URL)
    amqplib.connect(process.env.MQ_URL, 'heartbeat=60')
        .then((conn) => {
            console.log('Message queue initializated.');
        }).catch((error) => {
            console.error(error);
            throw new Error('Error initializing the message queue');
        });
}

module.exports = { mqConnection }