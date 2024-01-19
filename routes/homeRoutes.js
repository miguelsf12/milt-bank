const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')

const { checkAuth } = require('../helpers/checkAuth')

router.get('/milt/home', checkAuth, HomeController.home)

module.exports = router
