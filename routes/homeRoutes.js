const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')

const { checkAuth } = require('../helpers/checkAuth')

// Uso parar Desenvolver front
// router.get('/milt/home', HomeController.home)
// router.get('/milt/pix', HomeController.pix)

router.get('/milt/home', checkAuth, HomeController.home)
router.get('/milt/pix', checkAuth, HomeController.pix)

module.exports = router
