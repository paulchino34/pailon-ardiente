import orderRouter from "./order.routes.js"

const orderRoutes = (app) => {
    app.use('/api/order', orderRouter)
}

export default orderRoutes