//Carregando os módulos
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render("contato/contato") //pasta contato, arquivo contato.handlebars
})


module.exports = router