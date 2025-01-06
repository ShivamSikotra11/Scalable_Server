import mongoose from "mongoose";

export const connectDb= async () => {
    mongoose.connect("mongodb+srv://ShivamSikotra:Shivam75671@cluster0.n6pgxl4.mongodb.net/EDA?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log("Connected to database");
    }).catch((e)=>{
        console.error("Error connecting to the Database:",e);
    })
}