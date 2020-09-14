const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')

    if (!token) {
        res.status(401).json({ msg: 'no hay token, permiso no valido'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRET)
        req.valido = cifrado.valido
        next()
    } catch (error) {
        res.status(401).json({msg: 'token no valido'})
    }
}