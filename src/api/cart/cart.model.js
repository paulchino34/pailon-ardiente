import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const schema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        items: [
            {
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', schema)

export default Cart