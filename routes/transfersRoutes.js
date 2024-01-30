const express = require('express')
const router = express.Router()
const TransferController = require('../controllers/TransferController')

const { checkAuth } = require('../helpers/checkAuth')

router.get('/milt/pix/registerKey', checkAuth, TransferController.registerKey)
router.post('/milt/pix/registerKey', checkAuth, TransferController.registerKeyPost)
router.get('/milt/pix/pagar', checkAuth, TransferController.pay)

module.exports = router
