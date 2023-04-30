const router = require('express').Router();
const User = require('../models/User.js');

router.get('/:userId/pantry', async (req, res, next) => { // partially implimented 
    let { params } = req;

    try {
        const user = User.find(params.userId);

        res.json({name: user.username, pantry: user.pantry});
    } catch (error) {
        res.status(404).json({ error: error.message })
    }

});

router.patch('/:userId/pantry', async (req, res, next) => { // partially implimented 
    let { body, params } = req;

    try {
        const user = User.find(params.userId);
        user.updatePantry(body.type, body.foodName) // {type: 'remove', foodName: 'rice'}
        res.json({name: user.username, pantry: user.pantry});
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});


module.exports = router;