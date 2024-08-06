const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { authenticateSocket } = require('./utils/jwt.authenticate');
const { saveChat, getChats } = require('./controller/chat.controller');

exports.InitializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins for testing purposes
            methods: ["GET", "POST"]
        }
    });

    io.use(authenticateSocket);

    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        })
        socket.on('chat message', async (message) => {
            console.log(message, socket.user);
            const data = await saveChat(socket, message);
            io.emit("MESSAGE", data);
        })
    })
}