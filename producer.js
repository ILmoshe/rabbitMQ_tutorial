import amqp from "amqplib";

const idiotQueue = "queue1";
const idiotQueue2 = "queue2";

async function main() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange("chat", "direct");
  await channel.assertQueue(idiotQueue, { durable: true });
  // note how we used the pattern "blue" for the first queue
  await channel.bindQueue(idiotQueue, "chat", "blue");

  // create another queue:
  await channel.assertQueue(idiotQueue2, { durable: true });
  // note how we used the pattern "yellow" for the second queue
  await channel.bindQueue(idiotQueue2, "chat", "yellow");

  for (let index = 0; index < 5; index++) {
    // note the second argument which explicity say how to send a message with a direct algo
    channel.publish("chat", "blue", Buffer.from(`some blue msg ${index}`));
  }
  for (let index = 0; index < 2; index++) {
    // note the second argument which explicity say how to send a message with a direct algo
    channel.publish("chat", "yellow", Buffer.from("some Yellow msg"));
  }
}

main();
