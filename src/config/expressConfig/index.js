const http = require('http')
const { Server } = require("socket.io")
const express = require('express')
const body = require('body-parser')
const consign = require('consign')
const cors = require('cors')

const app = express()

app.use(cors())

const serverHttp = http.createServer(app)

const io = new Server(serverHttp,{
    cors: {
        origin: "*",
    },
});

io.on("connection", socket => {
    console.log(`Usuário conectado no socket Id:${socket.id}`)
});

//app.use(express.json());

app.use(body.json())
app.use(body.urlencoded({extended:true}))

consign()
    .then('./src/models')
    .include('./src/controller')
    .into(app,io);

module.exports = { serverHttp,io } 

