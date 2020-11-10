const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeTopo = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    titulobtn: {
        type: String,
        required: true
    },
    urlbtn: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false
    },
})

mongoose.model("hometopos", HomeTopo)
//valor entre aspas é como vai ficar a tabela do Banco de Dados