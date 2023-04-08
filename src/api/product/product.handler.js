import Product from './product.model.js'
import { fetchProductById } from './product.service.js';

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select("-features")

        const mapProducts = new Map();
        products.forEach((product) => {
            const category = product.category
            if (mapProducts.has(category)) {
                mapProducts.get(category).push(product)
            } else {
                mapProducts.set(category, [product])
            }
        })
        return res.json({
            ok: true,
            msg: "Productos obtenidos",
            data: Object.fromEntries(mapProducts)
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category }).select("-features")
        return res.json({
            ok: true,
            msg: "Productos obtenidos",
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await fetchProductById(id)
        return res.json({
            ok: true,
            msg: "Producto encontrado",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category')
        return res.json({
            ok: true,
            msg: "Categorías",
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const createProduct = async (req, res) => {
    const { name, description, category, price, code, features, images } = req.body
    try {
        const product = await Product.create({
            name, description, category, price, code, features, images
        })
        return res.json({
            ok: true,
            msg: "Producto creado",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const { name, description, category, price, code, features, images } = req.body
    const { id } = req.params
    try {
        await Product.findByIdAndUpdate(id, { name, description, category, price, code, features, images })
        const product = await Product.findById(id)
        return res.json({
            ok: true,
            msg: "Producto actualizado",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndRemove(id)
        return res.json({
            ok: true,
            msg: "Producto eliminado"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

export { getProducts, getProductsByCategory, getProductById, getCategories, createProduct, updateProduct, deleteProduct }