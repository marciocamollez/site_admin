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

const { eAdmin } = require("../helpers/eAdmin")

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


/* Pega os dados digitados do form, verifica se não está em branco. Caso esteja algum faltando, apresenta mensagem de erro e recarrega a página. Caso dê certo, avança para salvar no banco de dados */
router.post('/add-contato', (req, res) => {
    var dados_contato = req.body
    var errors = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Necessário preencher o campo nome!" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        errors.push({ error: "Necessário preencher o campo e-mail!" })
    }
    if (!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null) {
        errors.push({ error: "Necessário preencher o campo assunto!" })
    }
    if (!req.body.mensagem || typeof req.body.mensagem == undefined || req.body.mensagem == null) {
        errors.push({ error: "Necessário preencher o campo mensagem!" })
    }

    if (errors.length > 0) {
        ContatoInfo.findOne({}).then((contatoinfo) => {
            Rodape.findOne({}).then((rodape) => {
                res.render("contato/contato", { errors: errors, contato: dados_contato, contatoinfo: contatoinfo, rodape: rodape })
            }).catch((erro) => {
                res.send("Nenhuma informação encontrada entre em contato com o administrador!")
            })
        }).catch((erro) => {
            res.send("Nenhuma informação encontrada entre em contato com o administrador!")
        })
    } else {
        const addContato = {
            nome: req.body.nome,
            email: req.body.email,
            assunto: req.body.assunto,
            mensagem: req.body.mensagem
        }
        new Contato(addContato).save().then(() => {
            req.flash("success_msg", "Mensagem enviada com sucesso")
            res.redirect('/contato')
        }).catch((erro) => {
            ContatoInfo.findOne({}).then((contatoinfo) => {
                Rodape.findOne({}).then((rodape) => {
                    errors.push({ error: "Falha ao enviar" })
                    res.render("contato/contato", { errors: errors, contato: dados_contato, contatoinfo: contatoinfo, rodape: rodape })
                }).catch((erro) => {
                    res.send("Nenhuma informação encontrada entre em contato com o administrador!")
                })
            }).catch((erro) => {
                res.send("Nenhuma informação encontrada entre em contato com o administrador!")
            })
        })
    }
})

router.get("/list-contato", eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Contato.paginate({}, { page, limit: 2 }).then((contato) => {
        res.render("contato/list-contato", { layout: 'adm.handlebars', contatos: contato })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de contato encontrada!")
        res.redirect("/dashboard/")
    })
})


module.exports = router