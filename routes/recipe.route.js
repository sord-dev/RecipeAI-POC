const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

router.get('/random', async (req, res, next) => {
    try {
        const recipe = await ChatGPT.generateRecipe();

        res.json(recipe);
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
});

router.get('/random/:region', async (req, res, next) => {
    try {
        const recipe = await ChatGPT.generateRegionalRecipe(req.params.region);

        res.json(recipe);
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
});

module.exports = router;