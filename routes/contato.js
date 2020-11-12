//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/ContatoInfo")
const ContatoInfo = mongoose.model('contatoinfo')

require("../models/Contato")
const Contato = mongoose.model('contato')

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


router.post('/add-contato', (req, res) => {
     const addContato = {
         nome: req.body.nome,
         email: req.body.email,
         assunto: req.body.assunto,
         mensagem: req.body.mensagem
     }

     new Contato(addContato).save().then(() => {
        console.log('Cadastrado com sucesso')
        res.redirect('/contato')
     }).catch((erro) => {
        console.log('Falha ao cadastrar')
        res.redirect('/contato')
     })
})


module.exports = router