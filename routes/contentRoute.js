const express = require('express')
const apiController = require('../controllers/apiController')
const isAuthenticated = require('../middleware/isAuthenticated')

const contentRouter = express.Router()

contentRouter.post("/generate", isAuthenticated, apiController)

module.exports = contentRouter