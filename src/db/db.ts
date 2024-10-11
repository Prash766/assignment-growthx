import mongoose from "mongoose";
import 'dotenv/config'

const connectDB= async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
        console.log(`Db connected to ${res.connections[0].host} to the port ${res.connections[0].port}`)

    } catch (error) {
        console.log("Error Connecting to the DB" , error)
        
    }
}

export default connectDB