const express = require('express')
const apiController = require('../controllers/apiController')
const isAuthenticated = require('../middleware/isAuthenticated')
const checkAPIrequest = require('../middleware/checkAPIrequest')

const contentRouter = express.Router()

contentRouter.post("/generate", isAuthenticated, checkAPIrequest, apiController)

module.exports = contentRouter