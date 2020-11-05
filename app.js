//Carregando os módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

//Configuração

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Iniciar Servidor
const PORT = 8080
app.listen(PORT, () => {
    console.log("Servidor iniciado")
})