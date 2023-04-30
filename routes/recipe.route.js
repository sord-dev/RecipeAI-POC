const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT');
const User = require('../models/User');


router.patch('/recommended', async (req, res, next) => { // partially implimented 
    let { body } = req;

    try {
        const user = User.find(body.userId);

        const recommended = await ChatGPT.generateRecipeU(user);

        res.json({ pantry: user.pantry, recommended });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

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