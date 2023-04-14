import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { json } from 'express'
dotenv.config()

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        province: {
            type: String
        },
        city: {
            type: String
        },
        zipCode: {
            type: String
        },
        role: {
            type: String,
            enum: ['client', 'admin']
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', schema)

export default User