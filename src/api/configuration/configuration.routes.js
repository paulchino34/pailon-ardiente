import Router from 'express'
import { getConfiguration, updateConfiguration, deleteConfiguration } from './configuration.handler.js'
import auth from '../../middleware/auth.js'

const configurationRoutes = Router()


configurationRoutes.get("/:name", auth, getConfiguration)

configurationRoutes.put("/:name", auth, updateConfiguration)

configurationRoutes.delete("/:name", auth, deleteConfiguration)

export default configurationRoutes