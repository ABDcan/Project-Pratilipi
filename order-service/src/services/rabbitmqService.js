const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

const emitEvent = async (eventName, eventPayload) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = "orderExchange";
    await channel.assertExchange(exchange, "fanout", { durable: false });

    const message = JSON.stringify({ event: eventName, payload: eventPayload });

    channel.publish(exchange, "", Buffer.from(message));
    console.log(`[Order Service] Emitted event: ${eventName}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(`[Order Service] Failed to emit event: ${eventName}`, error);
  }
};

module.exports = { emitEvent };
