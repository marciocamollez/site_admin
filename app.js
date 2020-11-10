//Carregando os módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const home = require("./routes/home")
const sobre = require("./routes/sobre")
const contato = require("./routes/contato")
const usuario = require("./routes/usuario")
const add_bd = require("./routes/add_bd")
const mongoose = require('mongoose')
const path = require('path')

//Configuração
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Handlebars - Define qual o arquivo principal pra carregar o esqueleto do html
app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars')

//Carregar arquivos estáticos. Informa que o css, js, images está na pasta public do projeto
app.use(express.static(path.join(__dirname, "public")))

//Conexão com o Banco de Dados
mongoose.connect('mongodb://localhost/db_marcio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão realizada com sucesso!");
}).catch((erro) => {
    console.log("Conexão falhou: " + erro);
})

//Rotas

//Define que a URL /home será a página inicial. Dentro do diretório routes está o arquivo
app.use('/home', home)
app.use('/sobre', sobre)
app.use('/contato', contato)
app.use('/usuario', usuario)
app.use('/add_bd', add_bd)

//Iniciar Servidor
const PORT = 8080
app.listen(PORT, () => {
    console.log("Servidor iniciado")
})