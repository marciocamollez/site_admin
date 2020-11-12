//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Sobre")
const Sobre = mongoose.model('sobre')

require("../models/Rodape")
const Rodape = mongoose.model('rodape')

router.get('/', (req,res) => {
    Sobre.findOne({}).then((sobre) => {
        Rodape.findOne({}).then((rodape) => {
            res.render("sobre/sobre", {sobre: sobre, rodape: rodape}) //pasta sobre, arquivo sobre.handlebars
        }).catch((erro) => {
            res.send("Nenhuma informação encontrada entre em contato com o administrador!")
        })
    }).catch((erro) => {
        res.send("Nenhuma informação encontrada entre em contato com o administrador!")
    })
    
})

router.get('/edit-sobre', (req,res) => {
    res.render("sobre/edit-sobre", { layout: 'adm.handlebars' }) //pasta sobre, arquivo edit-sobre. handlebars. O layout padrão muda para a página adm, pois é home do administrativo
})

module.exports = router