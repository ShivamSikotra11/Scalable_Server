import { Hono } from 'hono'
import { init } from './services/start.services'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
init();

export default {
  port:2003,
  fetch: app.fetch,
}
