import productRouter from "./product.routes.js"

const productRoutes = (app) => {
    app.use('/api/product', productRouter)
}

export default productRoutes