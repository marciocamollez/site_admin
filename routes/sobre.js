//Carregando os módulos
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    //res.send('Página Inicial do Site')
    res.render("sobre/sobre") //pasta sobre, arquivo sobre.handlebars
})

router.get('/edit-sobre', (req,res) => {
    res.render("sobre/edit-sobre", { layout: 'adm.handlebars' }) //pasta sobre, arquivo edit-sobre. handlebars. O layout padrão muda para a página adm, pois é home do administrativo
})

module.exports = router