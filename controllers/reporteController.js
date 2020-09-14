const {validationResult} = require('express-validator')

exports.crearQr = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array()})
    }
    
}