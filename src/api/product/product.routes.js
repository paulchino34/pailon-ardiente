import Router from 'express'
import auth from '../../middleware/auth.js'
import {getProducts, getProductsByFilter, getProductById, getCategories, 
    createProduct, updateProduct, deleteProduct} from './product.handler.js'
import roleAuth from '../../middleware/roleAuth.js'

const productRoutes = Router()


productRoutes.get("", auth, getProducts)

productRoutes.get("/filter", auth, getProductsByFilter)

productRoutes.get("/categories", auth, getCategories)

productRoutes.get("/:id", auth, getProductById)

productRoutes.post("", auth, roleAuth(['admin']), createProduct)

productRoutes.put("/:id", auth, roleAuth(['admin']), updateProduct)

productRoutes.delete("/:id", auth, roleAuth(['admin']), deleteProduct)

export default productRoutes