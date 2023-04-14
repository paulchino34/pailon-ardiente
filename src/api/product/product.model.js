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
        subCategories: {
            type: [String],
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
        stock: [
            {
                sizeNumber: {
                    type: Number
                },
                sizeLetters: {
                    type: String
                },
                color: {
                    type: String
                },
                quantity: {
                    type: Number
                },
            }
        ],
        images: [
            {
                url: {
                    type: String
                },
                order: {
                    type: Number
                }
            }
        ],
        features: {
            type: String
        },
        care: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', schema)

export default Product