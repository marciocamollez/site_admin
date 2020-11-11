//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

require("../models/Servico")
const Servico = mongoose.model('servicos')

require("../models/Video")
const Video = mongoose.model('video')


router.get('/', (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        Servico.findOne({}).then((servico) => {
            Video.findOne({}).then((video) => {
                res.render("home/home", { hometopo: hometopo, servico: servico, video: video })
            }).catch((erro) =>{
                res.send("Nenhum vídeo encontrado entre em contato com o administrador!")
            })
            
        }).catch((erro) => {
            res.send("Nenhum serviço encontrado entre em contato com o administrador!")
        })
    }).catch((erro) => {
        res.send("Nenhum topo encontrado entre em contato com o administrador!")
    })
        //pasta home, arquivo home.handlebars
        // primeiro parametro é o nome que vai ficar dentro da chave no html e o segundo
        // é o nome do modelo. Exemplo { nome_do_html: nome_do_modelo }
})


module.exports = router