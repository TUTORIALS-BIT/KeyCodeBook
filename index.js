const express = require('express') //Estamos utilizando express en nuestro proyecto.
const cors = require('cors')
const bodyParser = require('body-parser')

const { conectDB } = require('./db')
const app = express() //Se convierte a la constate express en un objeto, por el cual vamos a poder trabajar.

app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 3000
conectDB()//Estamos ejecutando el modulo de nuestra conexión a la base de datos.

require('./routes/user')(app)
require('./routes/genre')(app)
require('./routes/book')(app)

app.listen(port, () => {
    console.log('Se levanto el servidor....')
})