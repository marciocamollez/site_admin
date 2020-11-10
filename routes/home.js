//Carregando os módulos
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

router.get('/', (req,res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        console.log(hometopo)
        res.render("home/home", { hometopo: hometopo }) //pasta home, arquivo home.handlebars
    }).catch((erro) =>{
        res.send("Nenhum topo encontrado")
    })
    //res.send('Página Inicial do Site')
    
})

module.exports = router