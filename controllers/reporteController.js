const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const pdf = require('html-pdf')
var QRCode = require('qrcode')
const path = require('path');

exports.crearQr = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array()})
    }

    const {cantidad, fecha, id} = req.body
    try {
        const str = `${cantidad} - ${fecha} - ${id}`
        const qr = await QRCode.toDataURL(str)
        
        const options = {
            "format": "letter",
        }
        const contenido = `
        <html>
            <head>
            <style>
                .titulo{
                    background: black;
                    color: white;
                    text-align: center;
                    padding: 10px 0 5px 0;
                    margin: 0;
                }
                .container {
                    width: 100%;
                    border: 1px solid black;
                }
                .datos {
                    width: 300px;
                    heigth: 100%;
                    border-right: 1px solid black;
                }
                .imagen {
                    width: 300px;
                    text-align: center;
                }
                .imagen > img {
                    width: 280px;
                }
                .dato-title {
                    background: black;
                    color: #FFF;
                    margin: 0;
                    padding: 10px;
                }
                .dato {
                    font-size: 25px;
                    margin: 10px;
                }
                .dato-id {
                    font-size: 15px;
                    margin: 10px;
                }   
            </style>
            </Head>
            <body>
                <h1 class="titulo">
                    REFERENCIA DE PEDIDO
                </h1>
                <hr/>
                <div class="container">
                    <table>
                        <tr>
                            <td class="datos">
                                <h5 class="dato-title">Cantidad</h5>
                                <p class="dato">${cantidad}</p>
                                <h5 class="dato-title">Fecha</h5>
                                <p class="dato">${fecha}</p>
                                <h5 class="dato-title">Identificador</h5>
                                <p class="dato-id">${id}</p>
                            </td>
                            <td class="imagen">
                                <img src='${qr}' />
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
        `
        pdf.create(contenido, options).toFile(`PdfReports/reporte.pdf`, function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
        })
        res.json('pdf generado')
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
    

}

exports.sendFile = (re, res) => {
    res.sendFile(path.join(__dirname,'../pdfReports/reporte.pdf'))
}

exports.crearToken = (req, res) => {
        
        const payload = {
            valido: 'permiso valido'
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 9000
        }, (error, token) => {
            if(error) throw error

            res.json(({token}))
        })
}