//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.render("dashboard/dashboard", { layout: 'adm.handlebars' })
})

module.exports = router