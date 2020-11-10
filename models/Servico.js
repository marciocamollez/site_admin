const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Servico = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    iconeservum: {
        type: String,
        required: true
    },
    tituloservum: {
        type: String,
        required: true
    },
    descservum: {
        type: String,
        required: true
    },
    iconeservdois: {
        type: String,
        required: true
    },
    tituloservdois: {
        type: String,
        required: true
    },
    descservdois: {
        type: String,
        required: true
    },
    iconeservtres: {
        type: String,
        required: true
    },
    tituloservtres: {
        type: String,
        required: true
    },
    descservtres: {
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

mongoose.model("servicos", Servico)
//valor entre aspas é como vai ficar a tabela do Banco de Dados