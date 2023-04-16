import Router from 'express'
import auth from '../../middleware/auth.js'
import {
    getProductsByFilter, getProductsBySubCategories, getProductById, getCategories,
    createProduct, updateProduct, deleteProduct, loadProducts
} from './product.handler.js'
import roleAuth from '../../middleware/roleAuth.js'

const productRoutes = Router()


productRoutes.get("", auth, getProductsByFilter)

productRoutes.get("/sub-categories", auth, getProductsBySubCategories)

productRoutes.get("/categories", auth, getCategories)

productRoutes.get("/:id", auth, getProductById)

productRoutes.post('/load', auth, roleAuth(['admin']), loadProducts)

productRoutes.post("", auth, roleAuth(['admin']), createProduct)

productRoutes.put("/:id", auth, roleAuth(['admin']), updateProduct)

productRoutes.delete("/:id", auth, roleAuth(['admin']), deleteProduct)

export default productRoutes