//Carregando os módulos
const express = require('express')
const router = express.Router()

router.get('/login', (req,res) => {
    res.render("usuario/login", { layout: 'login.handlebars' })  //Pasta usuario dentro da view, arquivo login. Template usado login dentro da pasta layout
})


module.exports = router