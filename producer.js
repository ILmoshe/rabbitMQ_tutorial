import amqp from "amqplib";

const idiotQueue = "queue1";
const idiotQueue2 = "queue2";

async function main() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange("chat", "fanout");
  await channel.assertQueue(idiotQueue, { durable: true });
  await channel.bindQueue(idiotQueue, "chat");

  // create another queue:
  await channel.assertQueue(idiotQueue2, { durable: true });
  await channel.bindQueue(idiotQueue2, "chat");

  for (let index = 0; index < 10; index++) {
    channel.publish("chat", "", Buffer.from(new Date().toDateString()));
  }
}

main();
