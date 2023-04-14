import User from './user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        return res.json({
            ok: true,
            msg: "Usuarios obtenidos",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-password')
        return res.json({
            ok: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const createUser = async (req, res) => {
    const { name, lastname, email, phone, password } = req.body
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const emails = process.env.ADMIN_USERS.split(',')
    try {
        const user = await User.create({
            name, lastname, email,
            password: hashedPassword, phone,
            role: emails.includes(email) ? 'admin' : 'client'
        })

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) },
            (error, token) => {
                if (error) {
                    throw error
                }
                res.json({ token })
            }
        )
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const { name, lastname, email, phone, address, province, city, zipCode } = req.body
    const { id } = req.params
    try {
        const user = await User.findByIdAndUpdate(id,
            { name, lastname, email, phone, address, province, city, zipCode },
            { new: true })
        return res.json({
            ok: true,
            msg: "Usuario actualizado",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    const { name, lastname, email, phone, address, province, city, zipCode } = req.body
    const id = req.user.id
    try {
        const user = await User.findByIdAndUpdate(id,
            { name, lastname, email, phone, address, province, city, zipCode },
            { new: true }).select('-password')
        return res.json({
            ok: true,
            msg: "Usuario actualizado",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updatePassword = async (req, res) => {
    const { password } = req.body
    const id = req.user.id
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        await User.updateOne(
            { _id: id },
            { password: hashedPassword },
            { new: true }).select('-password')
        res.json({
            ok: true,
            msg: "Usuario actualizado"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndRemove({ _id: id })
        return res.json({
            ok: true,
            msg: "Usuario eliminado"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }

        const rightPassword = await bcryptjs.compare(password, user.password)
        if (!rightPassword) {
            return res.status(400).json({
                msg: "Password incorrecto"
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        if (email && rightPassword) {
            jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION },
                (error, token) => {
                    if (error) {
                        throw error
                    }
                    res.json({ token })
                }
            )
        } else {
            return res.json({
                msg: "Se ha presentado un error"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Se ha presentado un error",
            error
        })
    }
}

const verifyUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById({ _id: id }).select('-password')
        res.json({ user })
    } catch (error) {
        return res.status(500).json({
            msg: "Se ha presentado un error",
            error
        })
    }
}

export { getUsers, getUser, createUser, updateUser, updateProfile, updatePassword, deleteUser, loginUser, verifyUser }