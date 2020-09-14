const express = require('express')

const app = express()

app.use(express.json({extended: true}))

const port = process.env.port || 4000;

require('dotenv').config({path: 'variables.env'})

app.use('/api/reporte', require('./routes/reporte'));

app.listen(port,  () => {
    console.log('el servidor funciona ggg')
})