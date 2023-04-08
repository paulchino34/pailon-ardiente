import { deleteCartByUserId, fetchCartByUserId } from '../cart/cart.service.js'
import { getCostItems } from '../product/product.service.js'
import Order from './order.model.js'

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).select("-items")
        return res.json({
            ok: true,
            msg: "Ordenes encontradas",
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id
        const orders = await Order.find({ userId: userId }).select("-items")
        return res.json({
            ok: true,
            msg: "Ordenes encontradas",
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        return res.json({
            ok: true,
            msg: "Orden encontrada",
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const createOrder = async (req, res) => {
    const userId = req.user.id
    let cart = await fetchCartByUserId(userId)
    cart = cart.toObject()
    try {
        const invoicedPrice = await getCostItems(cart.items)
        const order = await Order.create({
            userId,
            status: "paid",
            items: cart.items,
            invoicedPrice
        })
        await deleteCartByUserId(userId)
        return res.json({
            ok: true,
            msg: "Orden creada",
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateOrderItems = async (req, res) => {
    const { id } = req.params
    const { items } = req.body
    try {
        const invoicedPrice = await getCostItems(items)
        const order = await Order.findByIdAndUpdate(
            id,
            {
                $set: { items, invoicedPrice }
            },
            { new: true }
        )
        return res.json({
            ok: true,
            msg: "Orden actualizada",
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    const { id, status } = req.params
    try {
        const order = await Order.findByIdAndUpdate(
            id,
            {
                $set: { status }
            },
            { new: true }
        ).select("-items")
        res.json({
            ok: true,
            msg: "Orden actualizada",
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        await Order.findByIdAndRemove({ _id: id })
        return res.json({
            ok: true,
            msg: "Orden eliminada"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getOrderStatuses = async (req, res) => {
    const { id, type } = req.params
    try {
        const order = await Order.findById({ _id: id }).select("-items")
        let list
        if (type === 'admin') {
            list = orderStatusAdmin.get(order.status)
        } else {
            list = orderStatusClient.get(order.status)
        }
        return res.json({
            ok: true,
            data: list,
            msg: "Posibles estados"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const orderStatusClient = new Map([
    ["paid", ["refund-request"]],
    ["refund-request", ["paid"]],
    ['paid-verified', ["refund-request"]],
    ["refunded", ["paid"]],
    ["sended", ["returned"]],
])

const orderStatusAdmin = new Map([
    ["paid", ["paid-pending", "paid-verified"]],
    ["paid-pending", ["paid-verified"]],
    ['paid-verified', ["paid-pending", "in-progress"]],
    ["in-progress", ["sended"]],
    ["sended", ["closed"]],
    ["refund-request", ["refunded"]],
])


export { getOrders, getOrdersByUser, getOrderById, createOrder, updateOrderItems, updateOrderStatus, deleteOrder, getOrderStatuses }