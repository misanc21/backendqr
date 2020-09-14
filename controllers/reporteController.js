const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
var QRCode = require('qrcode')

exports.crearQr = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array()})
    }

    const {cantidad, fecha, id} = req.body
    try {
        const str = `${cantidad} - ${fecha} - ${id}`
        await QRCode.toFile(`Qrimages/${id}.png`, str)
        res.json('imagen generada')
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
    

}

exports.crearToken = (req, res) => {
        
        const payload = {
            valido: 'permiso valido'
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 900
        }, (error, token) => {
            if(error) throw error

            res.json(({token}))
        })
}