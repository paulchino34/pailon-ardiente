import Product from './product.model.js'

const getCostItems = async (items) => {
    try {
        const products = await Product.find({
            _id: { $in: items.map(item => item.productId) }
        });

        products.forEach(product => {
            const item = items.find(item => item.productId == product._id)
            item.name = product.name
            item.price = product.price
            item.pricexQuantity = product.price * item.quantity
        })
    } catch (error) {
        throw error
    }
    return items.reduce((accumulator, item) => accumulator + item.pricexQuantity, 0)
}

const fetchProductById = async (id) => {
    try {
        return await Product.findById(id)
    } catch (error) {
        throw error
    }
}

export { getCostItems, fetchProductById }