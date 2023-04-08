import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Permiso no valido o inexistente'
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET)
        let remainingTimeTokenInSeconds = (new Date(verifiedToken.exp * 1000) - Date.now()) / 1000
        if (remainingTimeTokenInSeconds <= process.env.TOKEN_TIME_RENEW) {
            const payload = { user: { id: verifiedToken.user.id } }
            jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION },
                (error, token) => {
                    if (error) {
                        throw error
                    }
                    res.setHeader('new-x-auth-token', token)
                }
            )
        }
        req.user = verifiedToken.user
        next()
    } catch (error) {
        res.status(400).json({
            msg: 'Se ha producido un error', error
        })
    }
}

export default auth