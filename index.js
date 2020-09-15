const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json({extended: true}))
var corsOptions = {
    origin: ["https://elated-fermat-32fd73.netlify.app/", "http://localhost:3000"]
  }
app.use(cors(corsOptions))

const port = process.env.port || 4000;

require('dotenv').config({path: 'variables.env'})

app.use('/api/reporte', require('./routes/reporte'));

app.listen(port,  () => {
    console.log('el servidor funciona ggg')
})