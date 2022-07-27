const express = require('express')
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
require('dotenv').config()

const port = process.env.PORT || 3000;

// Conexión a base de datos
const mongoose = require('mongoose');

const uri = `mongodb+srv://youtube_neo:${process.env.PASSWORD}@cluster0.zjlo0jf.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri).then(() => console.log("Base de datos conectada")).catch(e => console.log(e))



// Motor de plantilla
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"))

// Rutas Web
app.use('/', require('./router/RutasWeb'))
app.use('/mascotas', require('./router/Mascotas'))

app.use((req, res , next) => {
	res.status(404).render("404")
})

app.listen(port,() => {
	console.log('Servidor a su servicio en el puerto',port)
})
