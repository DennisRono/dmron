var whitelist = ['https://dmron.nullchemy.com', 'http://localhost:3000', 'http://192.168.0.101:3000']
var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}