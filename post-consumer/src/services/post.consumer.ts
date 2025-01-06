import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/post";

export const postConsumer = async ()=>{
    const messages:any[] = [];
    let processing:boolean = false;
    
    try {
        await kafkaConfig.subscribeTopic("post");
        await kafkaConfig.consumeEvent(async (message)=>{
            messages.push(message);
            console.log("Message received: ",message);
            if(messages.length>100){
                // todo: Save into Database: bulk insertion
                processMessages();
            }
        });
        
        //Run every 5 seconds
        setInterval(processMessages,5000);

    } catch (error) {
        console.error("Error consuming the topic:",error);
    }

    async function processMessages(){
        if(messages.length>0 && !processing){
            processing = true;
            const batchToProcess = [...messages];
            messages.length = 0;

            try {
                await PostModel.insertMany(batchToProcess,{ordered:false});
                console.log("Bulk Insertion Completed..");
            } catch (error) {
                console.log("Error inserting messages to DB:",error);
                messages.push(...batchToProcess);
            } finally{
                processing = false;
            }
        }
    }

}

