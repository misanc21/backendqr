const express = require('express')
const router = express.Router()
const reporteController = require('../controllers/reporteController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

//crear Qr
router.post('/', [
 check('cantidad', 'la cantidad es requerida').not().isEmpty(),
 check('fecha', 'la fecha es requerida').not().isEmpty(),
 check('id', 'el id es requerido').not().isEmpty(),
],
auth,
reporteController.crearQr)

router.get('/',
    auth,
    reporteController.sendFile)

router.get('/token', reporteController.crearToken)


module.exports = router