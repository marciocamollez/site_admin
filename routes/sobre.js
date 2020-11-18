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
    Sobre.findOne({ _id: req.body._id }).then((sobre) => {
        sobre.titulotop = req.body.titulotop,
        sobre.subtitulotop = req.body.subtitulotop,
        sobre.titulo = req.body.titulo,
        sobre.subtitulo = req.body.subtitulo,
        sobre.titulosbum = req.body.titulosbum,
        sobre.iconesbum = req.body.iconesbum,
        sobre.descsbum = req.body.descsbum,
        sobre.titulosbdois = req.body.titulosbdois,
        sobre.iconesbdois = req.body.iconesbdois,
        sobre.descsbdois = req.body.descsbdois,
        sobre.titulosbtres = req.body.titulosbtres,
        sobre.iconesbtres = req.body.iconesbtres,
        sobre.descsbtres = req.body.descsbtres,
        sobre.titulobtn = req.body.titulobtn,
        sobre.urlbtn = req.body.urlbtn

        sobre.save().then(() => {
            req.flash("success_msg", "Editado com sucesso!")
            res.redirect("/sobre/vis-sobre")
        }).catch((erro) => {
            req.flash("error_msg", "Erro: Não foi possível alterar")
            res.redirect("/dashboard/")
        })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Nenhum registro encontrado")
        res.redirect("/dashboard/")
    })
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