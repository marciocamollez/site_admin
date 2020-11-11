const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rodape = new Schema({
    titulopg: {
        type: String,
        required: true
    },
    titulopgum: {
        type: String,
        required: true
    },
    urlpgum: {
        type: String,
        required: true
    },
    titulopgdois: {
        type: String,
        required: true
    },
    urlpgdois: {
        type: String,
        required: true
    },
    titulopgtres: {
        type: String,
        required: true
    },
    urlpgtres: {
        type: String,
        required: true
    },
    tituloend: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    tituloredsoc: {
        type: String,
        required: true
    },
    titulorsum: {
        type: String,
        required: true
    },
    urlrdum: {
        type: String,
        required: true
    },
    titulorsdois: {
        type: String,
        required: true
    },
    urlrddois: {
        type: String,
        required: true
    },
    titulorstres: {
        type: String,
        required: true
    },
    urlrdtres: {
        type: String,
        required: true
    },
    titulorsquatro: {
        type: String,
        required: true
    },
    urlrdquatro: {
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
    }
})

mongoose.model("rodape", Rodape)