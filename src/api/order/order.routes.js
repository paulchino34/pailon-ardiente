import Router from 'express'
import { getOrders, getOrdersByUser, getOrderById, createOrder, updateOrderItems, updateOrderStatus, deleteOrder, getOrderStatuses } from './order.handler.js'
import auth from '../../middleware/auth.js'
import roleAuth from '../../middleware/roleAuth.js'

const orderRoutes = Router()


orderRoutes.get("", auth, roleAuth(['admin']), getOrders)

orderRoutes.get("/:id/status/:type", auth, getOrderStatuses)

orderRoutes.get("/user", auth, getOrdersByUser)

orderRoutes.get("/:id", auth, getOrderById)

orderRoutes.post("", auth, createOrder)

orderRoutes.put("/:id", auth, roleAuth(['admin']), updateOrderItems)

orderRoutes.patch("/:id/status/:status", auth, updateOrderStatus)

orderRoutes.delete("/:id", auth, roleAuth(['admin']), deleteOrder)

export default orderRoutes