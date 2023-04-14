import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const db = async () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(
            process.env.MONGODB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default db