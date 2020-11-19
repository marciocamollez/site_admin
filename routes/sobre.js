//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const fs = require('fs') //file streams. Consumo de memoria baixo

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

    //Primeiro pega todos os campos e verifica se estão vazios, nulos ou indefinidos
    //Caso esteja, apresenta mensagem de erro em cima do formulário
    var dados_sobre = req.body
    var errors = []

    if(!req.body.titulotop || typeof req.body.titulotop == undefined || req.body.titulotop == null){
        errors.push({error: "Necessário preencher o campo título do topo"})
    }
    if(!req.body.subtitulotop || typeof req.body.subtitulotop == undefined || req.body.subtitulotop == null){
        errors.push({error: "Necessário preencher o campo subtítulo do topo"})
    }
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Necessário preencher o campo título"})
    }
    if(!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null){
        errors.push({error: "Necessário preencher o campo subtítulo"})
    }
    if(!req.body.titulosbum || typeof req.body.titulosbum == undefined || req.body.titulosbum == null){
        errors.push({error: "Necessário preencher o campo título do ícone 1"})
    }
    if(!req.body.iconesbum || typeof req.body.iconesbum == undefined || req.body.iconesbum == null){
        errors.push({error: "Necessário preencher o campo ícone 1"})
    }
    if(!req.body.descsbum || typeof req.body.descsbum == undefined || req.body.descsbum == null){
        errors.push({error: "Necessário preencher o campo descrição do ícone 1"})
    }
    if(!req.body.titulosbdois || typeof req.body.titulosbdois == undefined || req.body.titulosbdois == null){
        errors.push({error: "Necessário preencher o campo título do ícone 2"})
    }
    if(!req.body.iconesbdois || typeof req.body.iconesbdois == undefined || req.body.iconesbdois == null){
        errors.push({error: "Necessário preencher o campo ícone 2"})
    }
    if(!req.body.descsbdois || typeof req.body.descsbdois == undefined || req.body.descsbdois == null){
        errors.push({error: "Necessário preencher o campo descrição do ícone 2"})
    }
    if(!req.body.titulosbtres || typeof req.body.titulosbtres == undefined || req.body.titulosbtres == null){
        errors.push({error: "Necessário preencher o campo título do ícone 3"})
    }
    if(!req.body.iconesbtres || typeof req.body.iconesbtres == undefined || req.body.iconesbtres == null){
        errors.push({error: "Necessário preencher o campo ícone 3"})
    }
    if(!req.body.descsbtres || typeof req.body.descsbtres == undefined || req.body.descsbdtres == null){
        errors.push({error: "Necessário preencher o campo descrição do ícone 3"})
    }
    if(!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null){
        errors.push({error: "Necessário preencher o campo título do CTA"})
    }
    if(!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null){
        errors.push({error: "Necessário preencher o campo link do CTA"})
    }

    //Verifica quantos erros tem acima. Caso tenha algum, monta o layout da página novamente
    //e apresenta os erros que foram armazenados em um array na variável dados_sobre

    //Para testar todos os ifs, retirar o campo 'required' do html 5 no 'edit-sobre.handlebars'
    if(errors.length > 0){
        res.render("sobre/edit-sobre", { layout: "adm.handlebars", errors: errors, sobre: dados_sobre} )
    }

    //Caso não tenha erros, pega todos os dados digitados e altera no Banco
    else{
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
    }

    
})

router.get('/edit-sobre-img', (req, res) => {
    res.render("sobre/edit-sobre-img", { layout: 'adm.handlebars' })
})

//const upload = multer({dest: "uploads"})

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "public/images/topo_sobre")
    },
    filename: function(req, res, cb){
        cb (null, "descr-top-sobre.jpg")
    }
})
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }
})

router.post('/update-sobre-img', upload.single('file'), (req, res, next) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Erro: Selecione extensão JPG")
        res.redirect("/sobre/edit-sobre-img/")
    }else{
        req.flash("success_msg", "Upload de imagem realizada com sucesso!")
        res.redirect("/sobre/vis-sobre/")
    }
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