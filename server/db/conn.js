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
// mongoose.connection.once('open', function() {
//     new Admin(mongoose.connection.db).listDatabases(function(err, result) {
//         let exists = result.databases.filter(function (o) {
//             return o.hasOwnProperty('dmron');
//         }).length > 0;
//         if (!exists) {
//             console.log('Creating database...');
//         }
//     });
// });

module.exports = conn