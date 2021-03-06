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



/* Seção Topo */
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

/* Seção Serviços */

router.get('/vis-home-serv', eAdmin, (req, res) => {
    Servico.findOne({}).then((servico) => {
        res.render("home/vis-home-serv", {layout: "adm.handlebars", servico: servico})
    }).catch((erro) =>{
        req.flash("error_msg", "Erro: Não foi possível encontrar o Serviço")
        res.redirect("/dashboard/")
    })
})

router.get('/edit-home-serv', eAdmin, (req,res) => {
    Servico.findOne({}).then((servico) => {
        res.render("home/edit-home-serv", { layout: 'adm.handlebars', servico: servico }) 
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi possível encontrar o Serviço")
        res.redirect("/dashboard/")
    })
    
})

router.post('/update-home-serv', eAdmin, (req,res) => {

    //Primeiro pega todos os campos e verifica se estão vazios, nulos ou indefinidos
    //Caso esteja, apresenta mensagem de erro em cima do formulário
    var dados_home_serv = req.body
    var errors = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Necessário preencher o campo título do Serviço"})
    }
    if(!req.body.iconeservum || typeof req.body.iconeservum == undefined || req.body.iconeservum == null){
        errors.push({error: "Necessário preencher o campo ícone do Serviço 1"})
    }
    if(!req.body.tituloservum || typeof req.body.tituloservum == undefined || req.body.tituloservum == null){
        errors.push({error: "Necessário preencher o campo título do Serviço 1"})
    }
    if(!req.body.descservum || typeof req.body.descservum == undefined || req.body.descservum == null){
        errors.push({error: "Necessário preencher o campo descrição do Serviço 1"})
    }
    if(!req.body.iconeservdois || typeof req.body.iconeservdois == undefined || req.body.iconeservdois == null){
        errors.push({error: "Necessário preencher o campo ícone do Serviço 2"})
    }
    if(!req.body.tituloservdois || typeof req.body.tituloservdois == undefined || req.body.tituloservdois == null){
        errors.push({error: "Necessário preencher o campo título do Serviço 2"})
    }
    if(!req.body.descservdois || typeof req.body.descservdois == undefined || req.body.descservdois == null){
        errors.push({error: "Necessário preencher o campo descrição do Serviço 2"})
    }
    if(!req.body.iconeservtres || typeof req.body.iconeservtres == undefined || req.body.iconeservtres == null){
        errors.push({error: "Necessário preencher o campo ícone do Serviço 3"})
    }
    if(!req.body.tituloservtres || typeof req.body.tituloservtres == undefined || req.body.tituloservtres == null){
        errors.push({error: "Necessário preencher o campo título do Serviço 3"})
    }
    if(!req.body.descservtres || typeof req.body.descservtres == undefined || req.body.descservtres == null){
        errors.push({error: "Necessário preencher o campo descrição do Serviço 3"})
    }
    

    //Verifica quantos erros tem acima. Caso tenha algum, monta o layout da página novamente
    //e apresenta os erros que foram armazenados em um array na variável dados_sobre

    //Para testar todos os ifs, retirar o campo 'required' do html 5 no 'edit-sobre.handlebars'
    if(errors.length > 0){
        res.render("home/edit-home-serv", { layout: "adm.handlebars", errors: errors, servico: dados_home_serv} )
    }

    //Caso não tenha erros, pega todos os dados digitados e altera no Banco
    else{
        Servico.findOne({ _id: req.body._id }).then((servico) => {
            servico.titulo = req.body.titulo,
            servico.iconeservum = req.body.iconeservum,
            servico.tituloservum = req.body.tituloservum,
            servico.descservum = req.body.descservum,
            servico.iconeservdois = req.body.iconeservdois,
            servico.tituloservdois = req.body.tituloservdois,
            servico.descservdois = req.body.descservdois,
            servico.iconeservtres = req.body.iconeservtres,
            servico.tituloservtres = req.body.tituloservtres,
            servico.descservtres = req.body.descservtres
    
            servico.save().then(() => {
                req.flash("success_msg", "Editado com sucesso!")
                res.redirect("/vis-home-serv")
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

/* Seção Vídeo */

router.get('/vis-home-video', eAdmin, (req, res) => {
    Video.findOne({}).then((video) => {
        res.render("home/vis-home-video", {layout: "adm.handlebars", video: video})
    }).catch((erro) =>{
        req.flash("error_msg", "Erro: Não foi possível encontrar o Vídeo")
        res.redirect("/dashboard/")
    })
})

router.get('/edit-home-video', eAdmin, (req,res) => {
    Video.findOne({}).then((video) => {
        res.render("home/edit-home-video", { layout: 'adm.handlebars', video: video }) 
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi possível encontrar o Vídeo")
        res.redirect("/dashboard/")
    })
})

router.post('/update-home-video', eAdmin, (req,res) => {

    //Primeiro pega todos os campos e verifica se estão vazios, nulos ou indefinidos
    //Caso esteja, apresenta mensagem de erro em cima do formulário
    var dados_home_video = req.body
    var errors = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Necessário preencher o campo título do Vídeo"})
    }
    if(!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null){
        errors.push({error: "Necessário preencher o campo Subtítulo do Vídeo"})
    }
    if(!req.body.urlvideo || typeof req.body.urlvideo == undefined || req.body.urlvideo == null){
        errors.push({error: "Necessário preencher o campo Link do Vídeo"})
    }
    

    //Verifica quantos erros tem acima. Caso tenha algum, monta o layout da página novamente
    //e apresenta os erros que foram armazenados em um array na variável dados_sobre

    //Para testar todos os ifs, retirar o campo 'required' do html 5 no 'edit-sobre.handlebars'
    if(errors.length > 0){
        res.render("home/edit-home-video", { layout: "adm.handlebars", errors: errors, video: dados_home_video} )
    }

    //Caso não tenha erros, pega todos os dados digitados e altera no Banco
    else{
        Video.findOne({ _id: req.body._id }).then((video) => {
            video.titulo = req.body.titulo,
            video.subtitulo = req.body.subtitulo,
            video.urlvideo = req.body.urlvideo
            
            video.save().then(() => {
                req.flash("success_msg", "Editado com sucesso!")
                res.redirect("/vis-home-video")
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


/* Seção Upload da imagem do bloco vídeo */

router.get('/edit-home-video-img', (req, res) => {
    res.render("home/edit-home-video-img", { layout: 'adm.handlebars' })
})

const storageVideo = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "public/images/video_home")
    },
    filename: function(req, res, cb){
        cb (null, "fundo-video.jpg")
    }
})
const uploadVideo = multer({ 
    storage: storageVideo,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }
})

router.post('/update-home-video-img', uploadVideo.single('file'), (req, res, next) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Erro: Selecione extensão JPG")
        res.redirect("/edit-home-video-img/")
    }else{
        req.flash("success_msg", "Upload de imagem realizada com sucesso!")
        res.redirect("/vis-home-video")
    }
})

/* Seção Experiência */

router.get('/vis-home-exp', eAdmin, (req, res) => {
    Experiencia.findOne({}).then((experiencia) => {
        res.render("home/vis-home-exp", {layout: "adm.handlebars", experiencia: experiencia})
    }).catch((erro) =>{
        req.flash("error_msg", "Erro: Não foi possível encontrar a Experiência")
        res.redirect("/dashboard/")
    })
})

router.get('/edit-home-exp', eAdmin, (req, res) => {
    Experiencia.findOne({}).then((experiencia) => {
        res.render("home/edit-home-exp", { layout: 'adm.handlebars', experiencia: experiencia })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Não foi encontrado nenhum registro para a página inicial no conteúdo da experiencia!")
        res.redirect("/dashboard/")
    })

})


/* NAO ESTÁ FUNCIONANDO */
router.post('/update-home-exp', eAdmin, (req,res) => {

    //Primeiro pega todos os campos e verifica se estão vazios, nulos ou indefinidos
    //Caso esteja, apresenta mensagem de erro em cima do formulário
    var dados_home_exp = req.body
    var errors = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Necessário preencher o campo título da Experiência"})
    }
    if(!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null){
        errors.push({error: "Necessário preencher o campo subtítulo da Experiência"})
    }
    if(!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null){
        errors.push({error: "Necessário preencher o campo título do Botão"})
    }
    if(!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null){
        errors.push({error: "Necessário preencher o campo Link do Botão"})
    }
    if(!req.body.iconeexpum || typeof req.body.iconeexpum == undefined || req.body.iconeexpum == null){
        errors.push({error: "Necessário preencher o campo ícone da Experiência 1"})
    }
    if(!req.body.tituloexpum || typeof req.body.tituloexpum == undefined || req.body.tituloexpum == null){
        errors.push({error: "Necessário preencher o campo título da Experiência 1"})
    }
    if(!req.body.descexpum || typeof req.body.descexpum == undefined || req.body.descexpum == null){
        errors.push({error: "Necessário preencher o campo descrição da Experiência 1"})
    }
    if(!req.body.iconeexpdois || typeof req.body.iconeexpdois == undefined || req.body.iconeexpdois == null){
        errors.push({error: "Necessário preencher o campo ícone da Experiência 2"})
    }
    if(!req.body.tituloexpdois || typeof req.body.tituloexpdois == undefined || req.body.tituloexpdois == null){
        errors.push({error: "Necessário preencher o campo título da Experiência 2"})
    }
    if(!req.body.descexpdois || typeof req.body.descexpdois == undefined || req.body.descexpdois == null){
        errors.push({error: "Necessário preencher o campo descrição da Experiência 2"})
    }
    if(!req.body.iconeexptres || typeof req.body.iconeexptres == undefined || req.body.iconeexptres == null){
        errors.push({error: "Necessário preencher o campo ícone da Experiência 3"})
    }
    if(!req.body.tituloexptres || typeof req.body.tituloexptres == undefined || req.body.tituloexptres == null){
        errors.push({error: "Necessário preencher o campo título da Experiência 3"})
    }
    if(!req.body.descexptres || typeof req.body.descexptres == undefined || req.body.descexptres == null){
        errors.push({error: "Necessário preencher o campo descrição da Experiência 3"})
    }
    

    //Verifica quantos erros tem acima. Caso tenha algum, monta o layout da página novamente
    //e apresenta os erros que foram armazenados em um array na variável dados_sobre

    //Para testar todos os ifs, retirar o campo 'required' do html 5 no 'edit-sobre.handlebars'
    if(errors.length > 0){
        res.render("home/edit-home-exp", { layout: "adm.handlebars", errors: errors, experiencia: dados_home_exp })
    }

    //Caso não tenha erros, pega todos os dados digitados e altera no Banco
    else{
        Experiencia.findOne({ _id: req.body._id }).then((experiencia) => {
            experiencia.titulo = req.body.titulo,
            experiencia.subtitulo = req.body.subtitulo,
            experiencia.titulobtn = req.body.titulobtn,
            experiencia.urlbtn = req.body.urlbtn,
            experiencia.iconeexpum = req.body.iconeexpum,
            experiencia.tituloexpum = req.body.tituloexpum,
            experiencia.descexpum = req.body.descexpum,
            experiencia.iconeexpdois = req.body.iconeexpdois,
            experiencia.tituloexpdois = req.body.tituloexpdois,
            experiencia.descexpdois = req.body.descexpdois,
            experiencia.iconeexptres = req.body.iconeexptres,
            experiencia.tituloexptres = req.body.tituloexptres,
            experiencia.descexptres = req.body.descexptres
                
            experiencia.save().then(() => {
                req.flash("success_msg", "Editado com sucesso!")
                res.redirect("/vis-home-exp")
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


module.exports = router