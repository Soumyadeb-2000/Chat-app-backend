const path = require('path');

exports.getHomePage = (req, res) => {
    console.log("IN HOME PAGE", req.user);
    res.sendFile(path.join(__dirname, '../',`views/home.html`));
}