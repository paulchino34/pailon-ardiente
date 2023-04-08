import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import db from './config/db.js'
import userRoutes from './api/user/index.js'
import productRoutes from './api/product/index.js'
import orderRoutes from './api/order/index.js'
import cartRoutes from './api/cart/index.js'


await db()

const app = express()

app.use(cors())
app.use(express.json())

userRoutes(app)
productRoutes(app)
orderRoutes(app)
cartRoutes(app)

app.get('/', (req, res) => res.send('Proyecto up'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
