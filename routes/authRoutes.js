const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/AuthController')

// Helpers
const checkAge = require('../helpers/checkAge').checkAge

router.get('/', AuthController.welcome)
router.get('/register', AuthController.register)
router.post('/register', checkAge, AuthController.registerPost)
router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/reedem-password', AuthController.reedemPassword)
router.post('/reedem-password', AuthController.reedemPasswordPost)
// router.get('/reedem', AuthController.reedem)
// router.post('/reedem', AuthController.reedemPost)

module.exports = router
