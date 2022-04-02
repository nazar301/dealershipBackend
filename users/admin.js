const mongoose = require('../db/connection')

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin