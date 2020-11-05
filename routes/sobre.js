//Carregando os módulos
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    //res.send('Página Inicial do Site')
    res.render("sobre/sobre") //pasta sobre, arquivo sobre.handlebars
})

router.get('/edit-sobre', (req,res) => {
    res.render("sobre/edit-sobre") //pasta sobre, arquivo edit-sobre.handlebars
})

module.exports = router