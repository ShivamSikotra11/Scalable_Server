import {Admin, Consumer, Kafka, logLevel} from 'kafkajs';
class KafkaConfig {
    private kafka: Kafka;
    private consumer: Consumer;
    private brokers: string;
    // broker is url where our Kafka Runs
    
    constructor() {
        this.brokers = process.env.KAFKA_BROKER || '192.168.196.58:9092';
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: [this.brokers],
            logLevel: logLevel.ERROR,
        });
        this.consumer = this.kafka.consumer({
            groupId:"post-consumer"
        });
    }
    async subscribeTopic(topic:string):Promise<void>{
        try {
            await this.consumer.subscribe({
                topic,
                fromBeginning:true,
            })
        } catch (error) {
            console.error("Error subscribing to the topic:",error);
        }
    }

    async consumeEvent(callback:(message:any)=>void):Promise<void>{
        try {
            await this.consumer.run({
                eachMessage: async ({topic,partition,message})=>{
                    console.log("Message received: ",{
                        topic,partition,
                        value:message?.value?.toString()
                    });
                    callback(JSON.parse(message?.value?.toString()!));
                }
            })
        } catch (error) {
            console.error("Error subscribing to the topic:",error);
        }
    }

    async connect():Promise<void> {
        try{
            await this.consumer.connect();
            console.log('Connected to Kafka');
        } catch (error) {
            console.error('Error in connecting Kafka', error);
        }
    }

    
    async disconnect(): Promise<void> {
        try {
            await this.consumer.disconnect();
            console.log('Disconnected from Kafka');
        } catch (error) {
            console.error('Error in disconnecting Kafka', error);
        }
    }
}

export default new KafkaConfig();