const express = require('express');
const router = express.Router();
const chatController = require("../controller/chat.controller");
const { authenticate } = require('../utils/jwt.authenticate');

router.get('/chat', authenticate, chatController.getChats);
router.post('/chat', authenticate, chatController.postChat);

module.exports = router;