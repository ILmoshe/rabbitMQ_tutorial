import amqp from "amqplib";

const idiotQueue = "queue1";
const idiotQueue2 = "queue2";

async function main() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();


  channel.consume(idiotQueue, async (msg) => {
    const content = msg.content.toString();
    console.log("received from the first queue");
    console.log(`${content}`);
    channel.ack(msg);
  });

  channel.consume(idiotQueue2, async (msg) => {
    const content = msg.content.toString();
    console.log("received from the second queue");
    console.log(`${content}`);
    channel.ack(msg);
  });
}

main();
