const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    placa: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Car', carSchema);
