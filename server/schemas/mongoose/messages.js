const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    messageid: String,
    state: String,
    message: String,
    time: String
})

module.exports = mongoose.model('message', messageSchema)