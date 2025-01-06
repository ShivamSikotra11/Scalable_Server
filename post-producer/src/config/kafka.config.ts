import {Admin, Kafka, logLevel, Producer} from 'kafkajs';
// Kafka is a distributed event streaming platform capable of handling trillions of events a day.

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;
    private brokers: string;
    // broker is url where our Kafka Runs
    
    constructor() {
        this.brokers = process.env.KAFKA_BROKER || '192.168.196.58:9092';
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: [this.brokers],
            logLevel: logLevel.ERROR,
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }

    async connect():Promise<void> {
        try{
            await this.producer.connect();
            await this.admin.connect();
            // Admin can cretae topics, delete topics, list topics etc
            // Topics are like channels where we can send messages
            // Producer sends messages to topics
            // Consumer reads messages from topics
            // Consumer Group is a group of consumers that reads messages from topics
            console.log('Connected to Kafka');
        } catch (error) {
            console.error('Error in connecting Kafka', error);
        }
    }

    async createTopic(topic: string): Promise<void> {
        try {
            await this.admin.createTopics({
                topics:[{topic, numPartitions: 1}]
            })
            console.log('Topic created');
        } catch (error) {
            console.error('Error in creating topic', error);
        }
    }
    // sendToTopic sends messages(OR events) to a topic
    // Streams an event to a particular topic
    async sentToTopic(topic: string, message: string): Promise<void> {
        try {
            await this.producer.send({
                topic,
                messages:[{value:message}]
            })
            console.log('Message sent');
        } catch (error) {
            console.error('Error in sending message', error);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
            console.log('Disconnected from Kafka');
        } catch (error) {
            console.error('Error in disconnecting Kafka', error);
        }
    }
}

export default new KafkaConfig();