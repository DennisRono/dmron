const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { registerDataSchema, loginDataSchema, regDataSchema, logDataSchema } = require("../schemas/joi/user");
const user = require('../schemas/mongoose/user')

router.get('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/register', async (req, res, next) => {
    try {
        const validate = await registerDataSchema.validateAsync(req.body);
        //check if email is already registered
        const User = await user.exists({"email": validate.email});
        if (User) return res.status(400).json({ msg: "email already in use please login" });
        //check if number is already in use
        const phoneNumber = await user.exists({"phone": parseInt(validate.phone)});
        if (phoneNumber) return res.status(400).json({ msg: "phone number already in use" });
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(422).send(err.message);
            }
            bcrypt.hash(validate.password, salt, async (err, hash) => {
                if (err) {
                    return res.status(422).send(err.message);
                }
                let userID = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
                try {
                    //save user to database
                    await user.create({
                        ID: userID,
                        email: validate.email,
                        phone: validate.phone,
                        password: hash
                    })                    
                    res.json({'msg': 'success'})
                } catch (err) { res.status(500).send(err); }
            });
        });
    } catch (error) {
        if (error.isJoi === true) {
            res.status(422).send(error.details[0].message);
        } else {
            res.status(500).send(error);
        }
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const validate = await loginDataSchema.validateAsync(req.body);
        let User;
        //check if user used email or phone number to login
        if(validate.email){
            //check if email is registered
            const member = await user.exists({"email": validate.email});
            if (!member) return res.status(400).json({ msg: "email is not registered" });
            User = await user.findOne({ email: validate.email }).exec();
        } else {
            //check if number is registered in use
            const phoneNumber = await user.exists({"phone": parseInt(validate.phone)});
            if (!phoneNumber) return res.status(400).json({ msg: "phone number is not registered" });
            User = await user.findOne({ phone: validate.phone }).exec();
        }
        // check user's password
        bcrypt.compare(validate.password, User.password, function(err, result) {
            if (err) {
                return res.status(422).send({ "wrong password!": err });
            }
            if (result) {
                const token = jwt.sign({ data: User.ID }, process.env.TOKEN_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ data: User.ID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
                return res.set({ 'auth-token': token, 'refreshToken': refreshToken }).json({ 'auth-token': token, 'refresh-token': refreshToken });
            } else {
                return res.json({ success: false, message: 'password did not match our records' });
            }
        });
    } catch (error) {
        res.status(500).send({ "There has been an error: ": error });
    }
})

router.get('/token', async(req, res, next) => {
    try {
        const verified = jwt.verify(req.body.refresh_token, process.env.REFRESH_TOKEN_SECRET);
        const memb = await user.findOne({ ID: verified.data }, 'ID').exec();
        console.log(memb);
        if (!memb) return res.status(400).json({ msg: "user does not exist" });
        const token = jwt.sign({ data: memb.ID }, process.env.TOKEN_SECRET, { expiresIn: '15m' });
        res.header('auth-token', token).json({ 'auth-token': token });
    } catch (error) {
        res.status(400).send({ "invalid refreshToken": error });
    }
});

module.exports = router