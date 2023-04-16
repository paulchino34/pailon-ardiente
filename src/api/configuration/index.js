import configurationRouter from "./configuration.routes.js"

const configurationRoutes = (app) => {
    app.use('/api/configuration', configurationRouter)
}

export default configurationRoutes