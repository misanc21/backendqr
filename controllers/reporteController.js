const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearQr = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array()})
    }
    

}

exports.crearToken = (req, res) => {
        
        const payload = {
            valido: true
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 30
        }, (error, token) => {
            if(error) throw error

            res.json(({token}))
        })
}