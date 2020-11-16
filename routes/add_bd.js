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

require("../models/Rodape")
const Rodape = mongoose.model('rodape')

require("../models/Sobre")
const Sobre = mongoose.model('sobre')

require("../models/ContatoInfo")
const ContatoInfo = mongoose.model('contatoinfo')

require("../models/Usuario")
const Usuario = mongoose.model('usuario')

const bcryptjs = require('bcryptjs')


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

    /*new Experiencia({
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
    })*/


    /*new Rodape({
        titulopg: "Celke",
        titulopgum: "Home",
        urlpgum: "/",
        titulopgdois: "Sobre",
        urlpgdois: "/sobre",
        titulopgtres: "Contato",
        urlpgtres: "/contato",
        tituloend: "Contato",
        telefone: "(XX) XXXX-XXXX",
        endereco: "Avenida Winston Churchill",
        cnpj: "CNPJ: XX.XXX.XXX/XXXX-XX",
        tituloredsoc: "Redes Sociais",
        titulorsum: "Instagram",
        urlrdum: "https://www.instagram.com/celkecursos",
        titulorsdois: "Facebook",
        urlrddois: "https://www.facebook.com/celkecursos/",
        titulorstres: "YouTube",
        urlrdtres: "https://www.youtube.com/channel/UC5ClMRHFl8o_MAaO4w7ZYug",
        titulorsquatro: "Twiter",
        urlrdquatro: "https://twitter.com/celkecursos",
    }).save().then(() => {
        res.send('Rodapé cadastrado com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar rodapé')
    })*/

    /*new Sobre({
        titulotop: "Blá blá é uma empresa de trasporte!",
        subtitulotop: "Uma das maiores transportadora do Brasil",
        titulo: "Somos uma empresa...",
        subtitulo: "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
        iconesbum: "fas fa-route",
        titulosbum: "EXPERIÊNCIA",
        descsbum: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        iconesbdois: "fas fa-satellite",
        titulosbdois: "TECNOLOGIA",
        descsbdois: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        iconesbtres: "far fa-handshake",
        titulosbtres: "PROXIMIDADE",
        descsbtres: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato"
    }).save().then(() => {
        res.send('Sobre cadastrado com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar sobre')
    })*/

    /*new ContatoInfo({
        titulo: "Entre em Contato – Transportadora!",
        subtitulo: "Escolha o canal de atendimento de sua preferência para orçamento ou dúvidas",
        tituloform: "Solicite mais informações ou orçamento",
        titulohratend: "Fale Conosco",
        hratend: "Segunda a Sexta: 08:30 às 12:00 e 13:30 às 18:00",
        tituloend: "Endereço",
        logradouro: "Avenida Winston Churchill, 936",
        bairro: "Capão Raso - Curitiba",
        complemento: "Sala",
        telefone: "(xx) xxxx-xxxx"
    }).save().then(() => {
        res.send('Contato cadastrado com sucesso')
    }).catch((erro) => {
        res.send('Erro ao cadastrar contato')
    })*/

    var senha = "123456"
    bcryptjs.genSalt(10, (erro, salt) => {
        bcryptjs.hash(senha, salt, (erro, hash) => {
            if(erro){
                res.send('Erro ao criptografar a senha')
            }
            else{
                var senha_cript = hash
                new Usuario({
                    nome: "Marcio",
                    email: "marciocamollez@hotmail.com",
                    senha: senha_cript
                }).save().then(() => {
                    res.send('Usuario cadastrado com sucesso')
                }).catch((erro) => {
                    res.send('Erro ao cadastrar usuario')
                })
            }
        })
    })
    

})

module.exports = router