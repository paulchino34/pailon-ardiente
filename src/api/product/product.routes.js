import Router from 'express'
import auth from '../../middleware/auth.js'
import {getProducts, getProductsByFilter, getProductById, getCategories, 
    createProduct, updateProduct, deleteProduct} from './product.handler.js'

const productRoutes = Router()


productRoutes.get("", auth, getProducts)

productRoutes.get("/filter", auth, getProductsByFilter)

productRoutes.get("/categories", auth, getCategories)

productRoutes.get("/:id", auth, getProductById)

productRoutes.post("", auth, createProduct)

productRoutes.put("/:id", auth, updateProduct)

productRoutes.delete("/:id", auth, deleteProduct)

export default productRoutes