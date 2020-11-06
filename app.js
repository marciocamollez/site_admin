//Carregando os módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const home = require("./routes/home")
const sobre = require("./routes/sobre")
const contato = require("./routes/contato")
const usuario = require("./routes/usuario")
const path = require('path')

//Configuração
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Handlebars - Define qual o arquivo principal pra carregar o esqueleto do html
app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars')

//Rotas

//Define que a URL /home será a página inicial. Dentro do diretório routes está o arquivo
app.use('/home', home)
app.use('/sobre', sobre)
app.use('/contato', contato)
app.use('/usuario', usuario)

//Iniciar Servidor
const PORT = 8080
app.listen(PORT, () => {
    console.log("Servidor iniciado")
})