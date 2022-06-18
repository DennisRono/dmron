const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ID: String,
    email: String
})

module.exports = mongoose.model('user', userSchema)