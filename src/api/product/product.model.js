import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        smartDescription: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        vendor: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String,
            required: false
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
        stock: {
            type: Map,
            of: Number
        },
        images: [
            {
                url: {
                    type: String
                },
                order: {
                    type: Number,
                    required: false
                }
            }
        ],
        features: {
            type: [String],
            required: true
        },
        care: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', schema)

export default Product