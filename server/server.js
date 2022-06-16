const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT||8000
const app = express()

var whitelist = ['https://dmron.nullchemy.com', 'http://localhost:3000']
var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(options))
app.use(morgan('combined'))
app.use(bodyParser.json())



app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})