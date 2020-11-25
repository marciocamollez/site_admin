//Carregando os módulo
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const multer = require('multer')
const path = require('path')
const fs = require('fs')
require("../models/ContatoInfo")
const ContatoInfo = mongoose.model('contatoinfo')
const { eAdmin } = require("../helpers/eAdmin")

router.get('/vis-contato-info', eAdmin, (req, res) => {
    ContatoInfo.findOne({}).then((contatoinfo) => {
        res.render("contato-info/vis-contato-info", { layout: 'adm.handlebars', contatoinfo: contatoinfo })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre informações de contato!")
    })
})

router.get('/edit-contato-info', eAdmin, (req, res) => {
    ContatoInfo.findOne({}).then((contatoinfo) => {
        res.render("contato-info/edit-contato-info", { layout: 'adm.handlebars', contatoinfo: contatoinfo })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre informações de contato!")
        res.redirect("/dashboard/")
    })

})

router.post('/update-contato-info', eAdmin, (req, res) => {
    var dados_contato_info = req.body
    var errors = []
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo título da página!" })
    }
    if (!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo subtitulo da página!" })
    }
    if (!req.body.tituloform || typeof req.body.tituloform == undefined || req.body.tituloform == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do formulário!" })
    }
    if (!req.body.titulohratend || typeof req.body.titulohratend == undefined || req.body.titulohratend == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do horário de atendimento!" })
    }
    if (!req.body.hratend || typeof req.body.hratend == undefined || req.body.hratend == null) {
        errors.push({ error: "Erro: Necessário preencher o campo horário de atendimento!" })
    }
    if (!req.body.tituloend || typeof req.body.tituloend == undefined || req.body.tituloend == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do endereço!" })
    }
    if (!req.body.logradouro || typeof req.body.logradouro == undefined || req.body.logradouro == null) {
        errors.push({ error: "Erro: Necessário preencher o campo logradouro!" })
    }
    if (!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null) {
        errors.push({ error: "Erro: Necessário preencher o campo bairro!" })
    }
    if (!req.body.complemento || typeof req.body.complemento == undefined || req.body.complemento == null) {
        errors.push({ error: "Erro: Necessário preencher o campo complemento!" })
    }
    if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null) {
        errors.push({ error: "Erro: Necessário preencher o campo telefone!" })
    }


    if (errors.length > 0) {
        res.render("contato-info/edit-contato-info", { layout: 'adm.handlebars', errors: errors, contatoinfo: dados_contato_info })
    } else {
        ContatoInfo.findOne({ _id: req.body._id }).then((contatoinfo) => {
            contatoinfo.titulo = req.body.titulo,
                contatoinfo.subtitulo = req.body.subtitulo,
                contatoinfo.tituloform = req.body.tituloform,
                contatoinfo.titulohratend = req.body.titulohratend,
                contatoinfo.hratend = req.body.hratend,
                contatoinfo.tituloend = req.body.tituloend,
                contatoinfo.logradouro = req.body.logradouro,
                contatoinfo.bairro = req.body.bairro,
                contatoinfo.complemento = req.body.complemento,
                contatoinfo.telefone = req.body.telefone

            contatoinfo.save().then(() => {
                req.flash("success_msg", "Informações de contato foi editado com sucesso!")
                res.redirect("/contato-info/vis-contato-info")
            }).catch((erro) => {
                req.flash("error_msg", "Error: Informações de contato não foi editado com sucesso!")
                res.redirect("/dashboard/")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre informações de contato!")
            res.redirect("/dashboard/")
        })
    }
})

router.get('/edit-contato-info-img', (req, res) => {
    res.render("contato-info/edit-contato-info-img", { layout: 'adm.handlebars' })
})

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "public/images/topo_contato")
    },
    filename: function(req, res, cb) {
        cb(null, "topo-contato.jpg")
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

router.post('/update-contato-info-img', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        req.flash("error_msg", "Error: Selecione uma imagem JPEG!")
        res.redirect("/contato-info/edit-contato-info-img")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/contato-info/vis-contato-info")
    }
})

module.exports = router