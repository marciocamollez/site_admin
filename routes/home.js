//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/HomeTopo")
const HomeTopo = mongoose.model('hometopos')

router.get('/', (req,res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        console.log(hometopo)
        res.render("home/home", { hometopo: hometopo }) 
        //pasta home, arquivo home.handlebars
        // primeiro parametro é o nome que vai ficar dentro da chave no html e o segundo
        // é o nome do modelo. Exemplo { nome_do_html: nome_do_modelo }

    }).catch((erro) =>{
        res.send("Nenhum topo encontrado")
    })
    //res.send('Página Inicial do Site')
    
})

module.exports = router