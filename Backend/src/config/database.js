import mongoose from "mongoose";
const connectingToDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server is successfully connected to database")
        
    } catch (error) {
        console.log("Something went wrong while try to connect to database",error)
        process.exit(1)
    }
}
export {connectingToDb}