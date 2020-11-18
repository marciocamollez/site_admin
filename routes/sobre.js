//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Sobre")
const Sobre = mongoose.model('sobre')

require("../models/Rodape")
const Rodape = mongoose.model('rodape')

const { eAdmin } = require("../helpers/eAdmin") 

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

router.get('/edit-sobre', eAdmin, (req,res) => {
    Sobre.findOne({}).then((sobre) => {
        res.render("sobre/edit-sobre", { layout: 'adm.handlebars', sobre: sobre }) 
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Nenhum registro Sobre a Empresa encontrado")
        res.redirect("/sobre")
    })
    
})

router.post('/update-sobre', eAdmin, (req,res) => {
    res.send("Salvar")
})

router.get('/vis-sobre', eAdmin, (req,res) => {
    Sobre.findOne({}).then((sobre) => {
        res.render("sobre/vis-sobre", { layout: 'adm.handlebars', sobre: sobre }) 
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Nenhum registro encontrado")
        res.redirect("/dashboard/")
    })
    
})

module.exports = router