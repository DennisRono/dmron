const mongoose = require('mongoose')

const conn = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(err){
        console.err(err)
    }
}

module.exports = conn