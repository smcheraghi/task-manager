const express = require('express')
const router = new express.Router()

router.get('/test', (req, res) => {
    res.send('This is the routing test')
})

module.exports = router