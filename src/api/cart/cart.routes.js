import Router from 'express'
import { getCart, getSimpleCart, updateItem } from './cart.handler.js'
import auth from '../../middleware/auth.js'

const cartRoutes = Router()


cartRoutes.get("", auth, getCart)

cartRoutes.get("/simple", auth, getSimpleCart)

cartRoutes.put("", auth, updateItem)

export default cartRoutes