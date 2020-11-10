//Carregando os módulos
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

router.get('/', (req,res) => {
    new HomeTopo({
        titulo: "Temos a solução que sua empresa precisa!",
        subtitulo: "This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser’s viewport.",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato"
    }).save().then(() => {
        console.log("Topo Cadastrado com Sucesso")
    }).catch((erro) => {
        console.log("Erro ao cadastrar o Topo")
    })
})

module.exports = router