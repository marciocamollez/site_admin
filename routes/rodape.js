//Carregando os módulo
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Rodape")
const Rodape = mongoose.model('rodape')
const { eAdmin } = require("../helpers/eAdmin")

router.get('/vis-rodape', eAdmin, (req, res) => {
    Rodape.findOne({}).then((rodape) => {
        res.render("rodape/vis-rodape", { layout: 'adm.handlebars', rodape: rodape })
    }).catch((erro) => {
        res.send("Nenhuma informação sobre o rodapé encontrado!")
    })
})

router.get('/edit-rodape', eAdmin, (req, res) => {
    Rodape.findOne({}).then((rodape) => {
        res.render("rodape/edit-rodape", { layout: 'adm.handlebars', rodape: rodape })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre rodape!")
        res.redirect("/dashboard/")
    })

})

router.post('/update-rodape', eAdmin, (req, res) => {
    var dados_rodape = req.body
    var errors = []
    if (!req.body.titulopg || typeof req.body.titulopg == undefined || req.body.titulopg == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo das páginas!" })
    }
    if (!req.body.titulopgum || typeof req.body.titulopgum == undefined || req.body.titulopgum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da página 1!" })
    }
    if (!req.body.urlpgum || typeof req.body.urlpgum == undefined || req.body.urlpgum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo URL da página 1!" })
    }
    if (!req.body.titulopgdois || typeof req.body.titulopgdois == undefined || req.body.titulopgdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da página 2!" })
    }
    if (!req.body.urlpgdois || typeof req.body.urlpgdois == undefined || req.body.urlpgdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo URL da página 2!" })
    }
    if (!req.body.titulopgtres || typeof req.body.titulopgtres == undefined || req.body.titulopgtres == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da página 3!" })
    }
    if (!req.body.urlpgtres || typeof req.body.urlpgtres == undefined || req.body.urlpgtres == null) {
        errors.push({ error: "Erro: Necessário preencher o campo URL da página 3!" })
    }
    if (!req.body.tituloend || typeof req.body.tituloend == undefined || req.body.tituloend == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do endereço!" })
    }
    if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null) {
        errors.push({ error: "Erro: Necessário preencher o campo telefone!" })
    }
    if (!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
        errors.push({ error: "Erro: Necessário preencher o campo endereço!" })
    }
    if (!req.body.cnpj || typeof req.body.cnpj == undefined || req.body.cnpj == null) {
        errors.push({ error: "Erro: Necessário preencher o campo cnpj!" })
    }
    if (!req.body.tituloredsoc || typeof req.body.tituloredsoc == undefined || req.body.tituloredsoc == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo das rede sociais!" })
    }
    if (!req.body.titulorsum || typeof req.body.titulorsum == undefined || req.body.titulorsum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da rede social 1!" })
    }
    if (!req.body.urlrdum || typeof req.body.urlrdum == undefined || req.body.urlrdum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo url da rede social 1!" })
    }
    if (!req.body.titulorsdois || typeof req.body.titulorsdois == undefined || req.body.titulorsdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da rede social 2!" })
    }
    if (!req.body.urlrddois || typeof req.body.urlrddois == undefined || req.body.urlrddois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo url da rede social 2!" })
    }
    if (!req.body.titulorstres || typeof req.body.titulorstres == undefined || req.body.titulorstres == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da rede social 3!" })
    }
    if (!req.body.urlrdtres || typeof req.body.urlrdtres == undefined || req.body.urlrdtres == null) {
        errors.push({ error: "Erro: Necessário preencher o campo url da rede social 3!" })
    }
    if (!req.body.titulorsquatro || typeof req.body.titulorsquatro == undefined || req.body.titulorsquatro == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo da rede social 4!" })
    }
    if (!req.body.urlrdquatro || typeof req.body.urlrdquatro == undefined || req.body.urlrdquatro == null) {
        errors.push({ error: "Erro: Necessário preencher o campo url da rede social 4!" })
    }


    if (errors.length > 0) {
        res.render("rodape/edit-rodape", { layout: 'adm.handlebars', errors: errors, rodape: dados_rodape })
    } else {
        Rodape.findOne({ _id: req.body._id }).then((rodape) => {
            rodape.titulopg = req.body.titulopg,
                rodape.titulopgum = req.body.titulopgum,
                rodape.urlpgum = req.body.urlpgum,
                rodape.titulopgdois = req.body.titulopgdois,
                rodape.urlpgdois = req.body.urlpgdois,
                rodape.titulopgtres = req.body.titulopgtres,
                rodape.urlpgtres = req.body.urlpgtres,
                rodape.tituloend = req.body.tituloend,
                rodape.telefone = req.body.telefone,
                rodape.endereco = req.body.endereco,
                rodape.cnpj = req.body.cnpj,
                rodape.tituloredsoc = req.body.tituloredsoc,
                rodape.titulorsum = req.body.titulorsum,
                rodape.urlrdum = req.body.urlrdum,
                rodape.titulorsdois = req.body.titulorsdois,
                rodape.urlrddois = req.body.urlrddois,
                rodape.titulorstres = req.body.titulorstres,
                rodape.urlrdtres = req.body.urlrdtres,
                rodape.titulorsquatro = req.body.titulorsquatro,
                rodape.urlrdquatro = req.body.urlrdquatro

            rodape.save().then(() => {
                req.flash("success_msg", "O rodapé foi editado com sucesso!")
                res.redirect("/rodape/vis-rodape")
            }).catch((erro) => {
                req.flash("error_msg", "Error: O rodapé não foi editado com sucesso!")
                res.redirect("/dashboard/")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre rodapé!")
            res.redirect("/dashboard/")
        })
    }

})

module.exports = router