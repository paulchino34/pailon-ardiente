import Router from 'express'
import { getUsers, getUser, createUser, updateUser, updateProfile, updatePassword, deleteUser, loginUser, verifyUser } from './user.handler.js'
import auth from '../../middleware/auth.js'

const userRoutes = Router()


userRoutes.get("", auth, getUsers)

userRoutes.get("/verify", auth, verifyUser)

userRoutes.get("/:id", auth, getUser)

userRoutes.post("", createUser)

userRoutes.post("/login", loginUser)

userRoutes.put("", auth, updateProfile)

userRoutes.put("/password", auth, updatePassword)

userRoutes.put("/:id", auth, updateUser)

userRoutes.delete("/:id", auth, deleteUser)

export default userRoutes