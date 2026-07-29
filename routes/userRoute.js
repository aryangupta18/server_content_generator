const express = require('express')
const { register, login, logout, userProfile, checkAuth } = require('../controllers/userController')
const isAuthenticated = require('../middleware/isAuthenticated')

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/userProfile", isAuthenticated, userProfile)
userRouter.get("/check", isAuthenticated, checkAuth)

module.exports = userRouter