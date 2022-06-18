const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({'msg': 'welcome to Dmron'})
})
module.exports = router;