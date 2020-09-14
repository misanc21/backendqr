const express = require('express')
const router = express.Router()
const reporteController = require('../controllers/reporteController')

//crear Qr
router.post('/', reporteController.crearQr)

module.exports = router