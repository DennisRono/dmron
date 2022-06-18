const mongoose = require('mongoose')
const Admin = mongoose.mongo.Admin

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

//create database if it does not exist
mongoose.connection.once('open', function() {
    new Admin(mongoose.connection.db).listDatabases(function(err, result) {
        console.log(result.databases);
    });
});

module.exports = conn