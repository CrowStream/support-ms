const { mqConnection } = require('../messaging/config');

const connection = mqConnection();

const create_task = async () => {
    const channel = connection.createChannel();
    try {

        const exchange = 'user.comment';
        const queue = 'post.comment';
        const routingKey = 'comment_notification_email';

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

const read_task = async () => {
    const channel = connection.createChannel();
    channel.prefetch(10);
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });

    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (msg) => {
        await channel.ack(msg);
        return msg;
    },
    {
        noAck: false,
        consumerTag: 'email_reader'
    });
}