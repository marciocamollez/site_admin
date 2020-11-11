const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Experiencia = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    iconeexpum: {
        type: String,
        required: true
    }, 
    tituloexpum: {
        type: String,
        required: true
    },
    descexpum: {
        type: String,
        required: true
    },
    iconeexpdois: {
        type: String,
        required: true
    }, 
    tituloexpdois: {
        type: String,
        required: true
    },
    descexpdois: {
        type: String,
        required: true
    },
    iconeexptres: {
        type: String,
        required: true
    }, 
    tituloexptres: {
        type: String,
        required: true
    },
    descexptres: {
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

mongoose.model("experiencia", Experiencia)
//valor entre aspas é como vai ficar a tabela do Banco de Dados