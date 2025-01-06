import kafkaConfig from "../config/kafka.config";

export const initKafka = async () =>{
    try{
        await kafkaConfig.connect();
        await kafkaConfig.createTopic('post');
        // await kafkaConfig.createTopic('post-created');
        // await kafkaConfig.createTopic('post-updated');
        // await kafkaConfig.createTopic('post-deleted');
        console.log('Kafka initialized');
    } catch (error) {
        console.error('Error in connecting Kafka', error);
    }
}