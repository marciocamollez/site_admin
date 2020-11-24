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
const dashboard = require("./routes/dashboard")
const rodape = require("./routes/rodape")
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)
const path = require('path')

//Configuração

//Sessão
app.use(session({
    secret: 'celketwosession',
    resave: true,
    saveUninitialized: true
}))
//Passport
app.use(passport.initialize())
app.use(passport.session())

//Flash
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Handlebars - Define qual o arquivo principal pra carregar o esqueleto do html
app.engine('handlebars', handlebars({ 
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, //Erro Handlebars de access-denied
        allowProtoMethodsByDefault: true,
    }, 
}));
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
app.use('/', home)
app.use('/sobre', sobre)
app.use('/contato', contato)
app.use('/usuario', usuario)
app.use('/add_bd', add_bd)
app.use('/dashboard', dashboard)
app.use('/rodape', rodape)

//Iniciar Servidor
const PORT = 8080
app.listen(PORT, () => {
    console.log("Servidor iniciado")
})