import jwt from 'jsonwebtoken'
import User from "../api/user/user.model.js"

const roleAuth = (roles) => async (req, res, next) => {
    const token = req.header('x-auth-token')

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET)
        req.user = verifiedToken.user
        const user = await User.findOne({ _id: req.user.id }, 'role')
        if ([].concat(roles).includes(user.role)) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'No el rol necesario para utilizar este servicio' })
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Se ha producido un error', error
        })
    }
}

export default roleAuth