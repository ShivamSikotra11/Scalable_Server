import mongoose from "mongoose";

export const connectDb= async () => {
    mongoose.connect("Insert Your MongoDB Cluster URL here");
    }).catch((e)=>{
        console.error("Error connecting to the Database:",e);
    })
}
