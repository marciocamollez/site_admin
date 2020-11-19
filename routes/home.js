//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const multer = require('multer')
const path = require('path')
const fs = require('fs') //file streams. Consumo de memoria baixo

require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

require("../models/Servico")
const Servico = mongoose.model('servicos')

require("../models/Video")
const Video = mongoose.model('video')

require("../models/Experiencia")
const Experiencia = mongoose.model('experiencia')

require("../models/Rodape")
const Rodape = mongoose.model('rodape')

const { eAdmin } = require("../helpers/eAdmin") 

//Montando a página inicial
router.get('/', (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        Servico.findOne({}).then((servico) => {
            Video.findOne({}).then((video) => {
                Experiencia.findOne({}).then((experiencia) => {
                    Rodape.findOne({}).then((rodape) => {
                        res.render("home/home", { hometopo: hometopo, servico: servico, video: video, experiencia: experiencia, rodape: rodape })
                    }).catch((erro) => {
                        res.send("Nenhuma informação encontrada entre em contato com o administrador!")
                    })

                }).catch((erro) => {
                    res.send("Nenhuma experiência encontrada entre em contato com o administrador!")
                })
            }).catch((erro) => {
                res.send("Nenhum vídeo encontrado entre em contato com o administrador!")
            })
        }).catch((erro) => {
            res.send("Nenhum serviço encontrado entre em contato com o administrador!")
        })
    }).catch((erro) => {
        res.send("Nenhum topo encontrado entre em contato com o administrador!")
    })

})
//pasta home, arquivo home.handlebars
// primeiro parametro é o nome que vai ficar dentro da chave no html e o segundo
// é o nome do modelo. Exemplo { nome_do_html: nome_do_modelo }



router.get('/vis-home-top', eAdmin, (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        res.render("home/vis-home-top", {layout: "adm.handlebars", hometopo: hometopo})
    }).catch((erro) =>{
        req.flash("error_msg", "Erro: Não foi possível encontrar o topo")
        res.redirect("/dashboard/")
    })
})

router.get('/edit-home-top', eAdmin, (req,res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        res.render("home/edit-home-top", { layout: 'adm.handlebars', hometopo: hometopo }) 
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi possível encontrar o topo")
        res.redirect("/dashboard/")
    })
    
})

router.post('/update-home-top', eAdmin, (req,res) => {

    //Primeiro pega todos os campos e verifica se estão vazios, nulos ou indefinidos
    //Caso esteja, apresenta mensagem de erro em cima do formulário
    var dados_home_top = req.body
    var errors = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Necessário preencher o campo título do topo"})
    }
    if(!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null){
        errors.push({error: "Necessário preencher o campo subtítulo do topo"})
    }
    if(!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null){
        errors.push({error: "Necessário preencher o campo título do Botão"})
    }
    if(!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null){
        errors.push({error: "Necessário preencher o Link do botão"})
    }
    

    //Verifica quantos erros tem acima. Caso tenha algum, monta o layout da página novamente
    //e apresenta os erros que foram armazenados em um array na variável dados_sobre

    //Para testar todos os ifs, retirar o campo 'required' do html 5 no 'edit-sobre.handlebars'
    if(errors.length > 0){
        res.render("/edit-home-top", { layout: "adm.handlebars", errors: errors, hometopo: dados_home_top} )
    }

    //Caso não tenha erros, pega todos os dados digitados e altera no Banco
    else{
        HomeTopo.findOne({ _id: req.body._id }).then((hometopo) => {
            hometopo.titulo = req.body.titulo,
            hometopo.subtitulo = req.body.subtitulo,
            hometopo.titulobtn = req.body.titulobtn,
            hometopo.urlbtn = req.body.urlbtn
    
            hometopo.save().then(() => {
                req.flash("success_msg", "Editado com sucesso!")
                res.redirect("/vis-home-top")
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

router.get('/edit-home-top-img', (req, res) => {
    res.render("home/edit-home-top-img", { layout: 'adm.handlebars' })
})

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "public/images/topo_home")
    },
    filename: function(req, res, cb){
        cb (null, "home-top.jpg")
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

router.post('/update-home-top-img', upload.single('file'), (req, res, next) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Erro: Selecione extensão JPG")
        res.redirect("/edit-home-top-img/")
    }else{
        req.flash("success_msg", "Upload de imagem realizada com sucesso!")
        res.redirect("/vis-home-top")
    }
})

module.exports = router