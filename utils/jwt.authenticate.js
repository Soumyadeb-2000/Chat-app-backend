const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers.authentication;
    console.log("token in authentiaction", token);
    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ "msg": "ERROR IN VERIFYING TOKEN" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ mgs: "INVALID AUTH HEADER" });
    }
}

exports.authenticateSocket = (socket, next) => {
    const token = socket.handshake.headers.authentication;
    console.log("token in authentication", token);
    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
            if (err) {
                return next(new Error('Invalid token'));
            }
            socket.user = user;
            next();
        });
    } else {
        return next(new Error('Access token not found'));
    }
}