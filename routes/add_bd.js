//Carregando os módulos
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

require("../models/Servico")
const Servico = mongoose.model('servicos')

require("../models/Video")
const Video = mongoose.model('video')

require("../models/Experiencia")
const Experiencia = mongoose.model('experiencia')

router.get('/', (req,res) => {
    /*new HomeTopo({
        titulo: "Temos a solução que sua empresa precisa!",
        subtitulo: "This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser’s viewport.",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato"
    }).save().then(() => {
        res.send("Topo Cadastrado com Sucesso")
    }).catch((erro) => {
        res.send("Erro ao cadastrar o Topo")
    })*/

    /*new Servico({
        titulo: "Serviços",
        iconeservum: "fas fa-truck-moving",
        tituloservum: "Serviço um",
        descservum: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        iconeservdois: "fas fa-truck-loading",
        tituloservdois: "Serviço dois",
        descservdois: "This card has supporting text below as a natural lead-in to additional content.",
        iconeservtres: "fas fa-boxes",
        tituloservtres: "Serviço três",
        descservtres: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."

    }).save().then(() => {
        res.send('Serviço cadastrado com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar serviço')
    })*/

    /*new Video({
        titulo: "Vídeo",
        subtitulo: "This is a wider card with supporting text below as a natural lead-in to additional content.",
        urlvideo: "<iframe class='embed-responsive-item' src='https://www.youtube.com/embed/ddnWxl2yXeM?rel=0' allowfullscreen></iframe>"
    }).save().then(() => {
        res.send('Vídeo cadastrado com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar vídeo')
    })*/

    new Experiencia({
        titulo: "Somos uma empresa...",
        subtitulo: "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
        iconeexpum: "fas fa-route",
        tituloexpum: "EXPERIÊNCIA",
        descexpum: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        iconeexpdois: "fas fa-satellite",
        tituloexpdois: "TECNOLOGIA",
        descexpdois: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        iconeexptres: "far fa-handshake",
        tituloexptres: "PROXIMIDADE",
        descexptres: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato"
    }).save().then(() => {
        res.send('Experiencia cadastrada com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar experiência')
    })

})

module.exports = router