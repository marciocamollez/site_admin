//Carregando os módulos
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    //res.send('Página Inicial do Site')
    res.render("home/home") //pasta home, arquivo home.handlebars
})

module.exports = router