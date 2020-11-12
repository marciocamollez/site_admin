//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/ContatoInfo")
const ContatoInfo = mongoose.model('contatoinfo')

require("../models/Rodape")
const Rodape = mongoose.model('rodape')

router.get('/', (req,res) => {
    ContatoInfo.findOne({}).then((contatoinfo) => {
        Rodape.findOne({}).then((rodape) => {
            res.render("contato/contato", {contatoinfo: contatoinfo, rodape: rodape}) //pasta contato, arquivo contato.handlebars
        }).catch((erro) => {
            res.send("Nenhuma informação encontrada entre em contato com o administrador!")
        })
    }).catch((erro) => {
        res.send("Nenhuma informação encontrada entre em contato com o administrador!")
    })
    
})


module.exports = router