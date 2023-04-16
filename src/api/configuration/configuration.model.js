import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Configuration = mongoose.model('Configuration', schema)

export default Configuration