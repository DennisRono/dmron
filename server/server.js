require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {cors:{origin: 'http://localhost:3000'}})
const PORT = process.env.PORT||8000
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const conn = require('./db/conn')
const options = require('./config/corsOptions')
const chat = require('./data/messages.json')
const message = require('./schemas/mongoose/messages')

//connect to mongoDb
conn()

//socket connections
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('getchats', ()=>{
        socket.emit('chats', chat)
    })
    socket.on('chatmessage', async (msg)=>{
        await message.create(msg)
        socket.emit('message', msg)
    })
})

//routes
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');

//middlewares
app.use(cors(options))
app.use(morgan('combined'))
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);


app.use('/', homeRoute);
app.use('/auth', authRoute);


mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    server.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})
})