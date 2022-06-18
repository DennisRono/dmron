const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/', (req, res) => {
    res.json({msg:"Welcome to Dmron Authentication"})
})

router.post('/register', (req, res, next) => {
    res.json({msg:"hurray"})
})

router.post('/login', (req, res, next) => {
    res.json({msg:"hurray"})
})

module.exports = router