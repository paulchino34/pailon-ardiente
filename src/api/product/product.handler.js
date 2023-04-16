import productBodies from '../../backup-data/products.js'
import Product from './product.model.js'
import { fetchProductById } from './product.service.js'

const getProductsByFilter = async (req, res) => {
    try {
        const filter = req.query
        const products = await Product.find(filter).select("-features")
        return res.json({
            ok: true,
            msg: "Productos obtenidos",
            data: products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getProductsBySubCategories = async (req, res) => {
    try {
        const { subCategories } = req.query
        const products = await Product.find({ subCategories: { $in: subCategories.split(',') } })
        return res.json({
            ok: true,
            msg: "Productos obtenidos",
            data: products
        })
    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const createProduct = async (req, res) => {
    const { name, smartDescription, description, vendor,
        category, subCategories, price, code,
        stock, images, features, care } = req.body
    try {
        const product = await Product.create({
            name, smartDescription, description, vendor,
            category, subCategories, price, code,
            stock, images, features, care
        })
        return res.json({
            ok: true,
            msg: "Producto creado",
            data: product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const { name, smartDescription, description, vendor,
        category, subCategories, price, code,
        stock, images, features, care } = req.body
    const { id } = req.params
    try {
        await Product.findByIdAndUpdate(id,
            {
                name, smartDescription, description, vendor,
                category, subCategories, price, code,
                stock, images, features, care
            })
        const product = await Product.findById(id)
        return res.json({
            ok: true,
            msg: "Producto actualizado",
            data: product
        })
    } catch (error) {
        console.log(error)
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
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const loadProducts = async (req, res) => {
    try {
        Product.insertMany(productBodies)
        return res.status(200).json({
            msg: 'Productos creados exitosamente',
            totalProducts: productBodies.length
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

export {
    getProductsByFilter, getProductsBySubCategories, getProductById,
    getCategories, createProduct, updateProduct, deleteProduct, loadProducts
}