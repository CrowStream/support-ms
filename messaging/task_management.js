const amqplib = require('amqplib');
const { callbackPromise } = require('nodemailer/lib/shared');
const { mqConnection } = require('../messaging/config');

const create_task = async (exchange, queue, routingKey, msg) => {
    const connection = await amqplib.connect(process.env.CROWSTREAM_MQ_URL, 'heartbeat=60');
    const channel = await connection.createChannel();
    try {
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);
        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    } catch (e) {
        console.error('Error in publishing message', e);
    } finally {
        await channel.close();
        await connection.close();
        console.info('Channel and connection closed');
    }
}

const read_task = async (queue, consumerTag, processMessage) => {
    const connection = await amqplib.connect(process.env.CROWSTREAM_MQ_URL, 'heartbeat=60');
    const channel = await connection.createChannel();
    channel.prefetch(10);
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });
    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (msg) => {
        await processMessage(msg)
        await channel.ack(msg);
    },
        {
            noAck: false,
            consumerTag: consumerTag
        });
}

module.exports = { create_task, read_task }