const userSchema = require('../Models/UserFiles')
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const user2022 = require('../Models/User.js')
const auth = async (req, res, next) => {
    try {
        console.log("SECRET_KEY:", `${process.env.SECRET_KEY}`)
        console.log("auth reached");
        const token = await req.cookies.jwt
        const verifyUser = jwt.verify(token, `${process.env.SECRET_KEY}`);
        console.log(verifyUser);
        
        const user = await userSchema.findOne({ _id: verifyUser._id, "tokens.token": token });
        const user2 = await user2022.findOne({ _id: verifyUser._id, "tokens.token": token });
        if (!user && !user2) { throw new Error('User Not Found') }
        else if (user) {
            req.token = token;
            req.user = user;
            req.userID = user._id;
            console.log(user.Name)
            next();
        }
        else if (user2) {
            req.token = token;
            req.user = user2;
            req.userID = user2._id;
            console.log(user2.Name)
            next();
        }
    }
    catch (error) {
        res.status(401).send("No token provded");
        console.log(error);
    }
}

module.exports = auth;