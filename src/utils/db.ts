import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
});

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect().catch((err) => {
    console.log(err);
  });
}

export { client };
