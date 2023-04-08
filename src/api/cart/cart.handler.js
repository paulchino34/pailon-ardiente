import { getCostItems } from '../product/product.service.js'
import Cart from './cart.model.js'
import { fetchCartByUserId } from './cart.service.js'

const getCart = async (req, res) => {
    try {
        const userId = req.user.id
        let cart = await fetchCartByUserId(userId)
        cart = cart?.toObject()

        if (cart && cart.items && cart.items.length > 0) {
            const invoiceCart = await getCostItems(cart.items)
            cart.invoiceCart = invoiceCart
        }
        return res.json({
            ok: true,
            msg: "Carrito de compras",
            data: cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getSimpleCart = async (req, res) => {
    try {
        const userId = req.user.id
        let cart = await fetchCartByUserId(userId)
        return res.json({
            ok: true,
            msg: "Carrito simple de compras",
            data: cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateItem = async (req, res) => {
    const userId = req.user.id
    const item = req.body
    if (!item.productId) {
        return res.status(400).json({ msg: 'El item debe contener un productId.' })
    }
    try {
        const cart = await Cart.findOne({ userId: userId })
        if (cart) {
            const update = { $set: {} }
            const cartItemIndex = cart.items.findIndex(i => i?.productId === item.productId)
            if (cartItemIndex > -1) {
                if (item.quantity > 0) {
                    update.$set[`items.${cartItemIndex}.quantity`] = item.quantity
                } else {
                    update.$pull = { items: { productId: item.productId } }
                }
            } else {
                update.$push = { items: item }
            }
            await Cart.updateOne({ userId: userId }, update)
        } else {
            await Cart.create({
                userId, items: [item]
            })
        }
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

export { getCart, getSimpleCart, updateItem }