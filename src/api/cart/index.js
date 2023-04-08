import cartRouter from "./cart.routes.js"

const cartRoutes = (app) => {
    app.use('/api/cart', cartRouter)
}

export default cartRoutes