const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const userModel = require('../schemas/user.shema');

exports.getLoginPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
}

exports.login = async (req, res, next) => {
    try {      
        const { email, password } = req.body;
        if( !email || !password) {
            throw new Error('Email or password not provided')
        }
        const user = await userModel.findOne({email});
        if(!user) {
            res.status(404).json({err: "USER NOT FOUND!!"})
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if(isValid) {
            const obj = {
                userId: user._id,
            };
            const token = jwt.sign(obj, process.env.AUTH_SECRET);
            req.headers.authorization = token;
            res.status(200).json({token});
        } else {
            res.status(403).json({"err": "INVALID CREDS"});
        }
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

exports.signup =  async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password, "________");
    const saltRounds = 10;
    let hash="";
    await new Promise((res, rej) => {
        bcrypt.genSalt( saltRounds, async (err, salt) => {
            if(err) {
                rej(err);
            } else {
                hash = await bcrypt.hash(password, salt);
                res(hash);
            }
        })
    })
    const x = await userModel.create({
        name, email, password: hash
    })
    res.json({x})
}