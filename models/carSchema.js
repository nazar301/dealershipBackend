const mongoose = require('../db/connection')

const carSchema = new mongoose.Schema({

    make: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
    bodyStyle: {type: String, required: true},
    year: {type: Number, required: true},
    milage: {type: Number, required: true},
    description: {type: String, default: ""},
}, { timestamps: true })

const Car = mongoose.model('car', carSchema)

module.exports = Car