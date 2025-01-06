import { Hono } from "hono";
import { initKafka } from "./services/start.services";
import postRoutes from "./services/create-post"

const app = new Hono();

initKafka();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route('/', postRoutes);

export default app;
