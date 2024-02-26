const express = require('express')
const router = express.Router()
const TransferController = require('../controllers/TransferController')

const { checkAuth } = require('../helpers/checkAuth')

router.get('/milt/pix/registerKey', checkAuth, TransferController.registerKey)
router.post('/milt/pix/registerKey', checkAuth, TransferController.registerKeyPost)

router.get('/milt/pix/pagar', checkAuth, TransferController.pay)
router.post('/milt/pix/pagar', checkAuth, TransferController.pixPay)

router.get('/milt/pix/confirmarPagamento', checkAuth, TransferController.confirmPayment)
router.post('/milt/pix/confirmarPagamento', checkAuth, TransferController.confirmPaymentPost)

router.get('/milt/pix/revisao', checkAuth, TransferController.revision)
router.post('/milt/pix/revisao', checkAuth, TransferController.revisionPost)

router.get('/milt/pix/concluido', checkAuth, TransferController.concludedPay)

module.exports = router
