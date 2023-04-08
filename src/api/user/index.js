import userRouter from "./user.routes.js"

const userRoutes = (app) => {
    app.use('/api/user', userRouter)
}

export default userRoutes