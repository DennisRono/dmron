require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT||8000
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const conn = require('./db/conn')
const options = require('./config/corsOptions')

//connect to mongoDb
conn()

//routes
const authRoute = require('./routes/auth');

//middlewares
app.use(cors(options))
app.use(morgan('combined'))
app.use(bodyParser.json())


app.use('/auth', authRoute);


mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})
})