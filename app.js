const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route');
const chatRoute = require('./routes/chat.route');
const homeRoute = require('./routes/home.route');
const bodyParser = require('body-parser');
const Chat = require('./schemas/chat.schema');
const cors = require('cors');
const { InitializeSocket } = require('./socket.server');
require('dotenv').config();

const app = express();

const server = http.createServer(app)
InitializeSocket(server);

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(authRoute);
app.use(chatRoute);
// app.use(homeRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("listening");
    server.listen(4000);
})