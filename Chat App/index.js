const express=require('express')
const http=require('http')
const app=express()
const {Server} =require("socket.io")
const path=require('path')
const server=http.createServer(app)

app.use(express.static(path.resolve('./public')))

const io=new Server(server)
io.on('connection',(socket)=>{
    socket.on('user-message',(message)=>{
        io.emit("message",message)
    })
})

app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(9000,()=>{
    console.log(`server started at PORT 9000`)
})