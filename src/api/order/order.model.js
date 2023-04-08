import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const schema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["paid", 'paid-verified', "paid-pending", "refund-request", "refunded", "in-progress", "sended", "returned", "closed"]
        },
        items: [
            {
                productId: {
                    type: String, 
                    required: true
                },
                name: {
                    type: String, 
                    required: true
                },
                price: {
                    type: Number, 
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        invoicedPrice: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', schema)

export default Order