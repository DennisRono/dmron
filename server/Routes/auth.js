const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { registerDataSchema, loginDataSchema, regDataSchema, logDataSchema } = require("../schemas/user");

router.get('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/register', async (req, res, next) => {
    try {
        const validate = await registerDataSchema.validateAsync(req.body);
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