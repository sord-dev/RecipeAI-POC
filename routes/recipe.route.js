const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

router.get('/random', async (req, res, next) => {
    try {
        const recipe = await ChatGPT.generateRecipe();

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

module.exports = router;