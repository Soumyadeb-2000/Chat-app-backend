const express = require('express');
const { getHomePage } = require('../controller/home.controller');
const { authenticate } = require('../utils/jwt.authenticate');
const router = express.Router();

router.get('/', authenticate, getHomePage);

module.exports = router;

