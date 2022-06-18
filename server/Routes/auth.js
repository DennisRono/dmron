const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
    res.json({msg:"hurray"})
})

module.exports = router