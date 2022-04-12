const express = require('express');
const router = express.Router();

router.get('/getTest', (req, res) => {
    const str = [{
        "title": "test",
        "msg": "Hello!"
    }];
    res.end(JSON.stringify(str));
});

router.post('/postTest', (req, res) => {
    res.end('NA');
});

module.exports = router;