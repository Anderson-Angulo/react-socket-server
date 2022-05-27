const express=require("express")
const http=require("http");
const path = require("path");
const socketio=require('socket.io')
const Sockets=require("./Sockets")

class Server{
  constructor(){
    this.app=express();
    this.port=process.env.PORT;
    this.server=http.createServer(this.app)
    this.io=socketio(this.server,{
      // configuraciones
    })
  }

  configurations(){
    new Sockets(this.io)
  }

  middlewares(){
    this.app.use(express.static(path.resolve(__dirname,"../public")))
  }

  execute(){
    // Middlewares
    this.middlewares()

    this.configurations()
    //Initialization of server
    this.server.listen(this.port,()=>{
      console.log("Server connected on port ",this.port)
    })
  }
}

module.exports=Server