import Cart from "./cart.model.js"

const fetchCartByUserId = async (userId) => {
    try {
        return await Cart.findOne({ userId })
    } catch (error) {
        console.log(error);
        throw error
    }
}

const deleteCartByUserId = async (userId) => {
    try{
        await Cart.deleteOne({userId})
    } catch (error) {
        console.log(error);
        throw error
    }
}

export { fetchCartByUserId, deleteCartByUserId }