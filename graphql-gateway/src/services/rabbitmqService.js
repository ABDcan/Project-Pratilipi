const amqplib = require("amqplib");

const emitEvent = async (event, payload) => {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(event);
  channel.sendToQueue(event, Buffer.from(JSON.stringify(payload)));
  console.log(`Event emitted: ${event}`);
  setTimeout(() => connection.close(), 1000);
};

module.exports = { emitEvent };
