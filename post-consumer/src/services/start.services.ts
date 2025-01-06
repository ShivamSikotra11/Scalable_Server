import { connectDb } from "../config/db.config";
import kafkaConfig from "../config/kafka.config";
import { postConsumer } from "./post.consumer";

export const init = async ()=>{
    try {
        console.log("init");
        await connectDb();
        await kafkaConfig.connect();
        await postConsumer();
    } catch (error) {
        console.error(error);
    }
}