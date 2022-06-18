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
conn.on('open', function() {
    // conn established
    new Admin(conn.db).listDatabases(function(err, result) {
        console.log('listDatabases succeeded');
        // database list stored in result.databases
        var allDatabases = result.databases; 
        console.log(allDatabases);  
    });
});

module.exports = conn