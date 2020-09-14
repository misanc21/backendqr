const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearQr = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array()})
    }
    console.log('si se pusooooo')

}

exports.crearToken = (req, res) => {
        
        const payload = {
            valido: 'permiso valido'
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 300
        }, (error, token) => {
            if(error) throw error

            res.json(({token}))
        })
}