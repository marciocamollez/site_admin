//Carregando os módulos
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req,res) => {
    res.render("usuario/login", { layout: 'login.handlebars' })  //Pasta usuario dentro da view, arquivo login. Template usado login dentro da pasta layout
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req, res, next)
})

module.exports = router