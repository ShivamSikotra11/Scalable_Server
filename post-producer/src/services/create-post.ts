import {Hono} from 'hono'
// import {initKafka} from './start.services'
import kafkaConfig from '../config/kafka.config';
import {zValidator} from '@hono/zod-validator'
import { z } from 'zod';




const app = new Hono();

app.post('/create-post',zValidator("json",z.object({
    title: z.string(),
    content: z.string(),
})) ,async (c) => {
    const {title, content} = c.req.valid("json");
    try {
        await kafkaConfig.sentToTopic('post',JSON.stringify({title, content}));
        return c.json({message: 'Post created'},201);
    } catch (error) {
        console.error('Error in creating post', error);
        return c.json({error: 'Error in creating post'},500);
    }
})

export default app
