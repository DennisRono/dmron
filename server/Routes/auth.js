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
        const phoneNumber = await user.exists({"email": validate.email});
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

router.post('/login', (req, res, next) => {
    res.json({msg:"hurray"})
})

module.exports = router