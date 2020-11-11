const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Video = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    urlvideo: {
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

mongoose.model("video", Video)
//valor entre aspas é como vai ficar a tabela do Banco de Dados