import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["Dildos", "Anillos", "Lenceria", "Plugs"]
        },
        price: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            unique: true,
            required: true
        },
        images:[
            {
                url: {
                    type: String
                }
            }
        ],
        features: {
            materials: {
                type: [String]
            },
            dimensions: {
                length: {
                    type: Number,
                },
                insertable_length: {
                    type: Number,
                },
                thickness: {
                    type: Number,
                }
            }
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', schema)

export default Product