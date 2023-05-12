import mongoose from 'mongoose'

// connexting database
export const connectDB = async () =>{
    const {connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb per jai shri ram on ${connection.host}`);
}