const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')

app.use(cors());
console.log("hellowo")

const server = http.createServer(app);

const io = new Server(server, {
    // established the connection between the client and the server
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    }
})

//detecting if the client is connected to the socket.io server and
//what action is being performed
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User joined ${data} with ${socket.id}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    //listening for the event from the client
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`)
    })
})



server.listen(8080, () => {
    console.log('Server is running on port 8080');
})