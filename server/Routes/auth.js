const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
    res.json({"request": req})
}

module.exports = router