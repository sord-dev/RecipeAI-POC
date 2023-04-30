const router = require('express').Router();
const User = require('../models/User.js');

router.post('/login', async (req, res, next) => { // not implimented 
    let { body } = req;

    try {
        const user = User.findByUsername(body.username);
        if (user.password == body.password) res.json(user);

    } catch (error) {
        res.status(404).json({ error: error.message })
    }

});

router.post('/register', async (req, res, next) => { // not implimented 
    let { body } = req;
    try {
        res.json(body);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.get('/logout', async (req, res, next) => { // not implimented 
    try {
        res.json({message:'Succesfully logged out.'});
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

module.exports = router;