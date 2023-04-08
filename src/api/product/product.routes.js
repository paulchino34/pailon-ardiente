import Router from 'express'
import {getProducts, getProductsByCategory, getProductById, getCategories, createProduct, updateProduct, deleteProduct} from './product.handler.js'
import auth from '../../middleware/auth.js'

const productRoutes = Router()


productRoutes.get("", auth, getProducts)

productRoutes.get("/category/:category", auth, getProductsByCategory)

productRoutes.get("/categories", auth, getCategories)

productRoutes.get("/:id", auth, getProductById)

productRoutes.post("", auth, createProduct)

productRoutes.put("/:id", auth, updateProduct)

productRoutes.delete("/:id", auth, deleteProduct)

export default productRoutes