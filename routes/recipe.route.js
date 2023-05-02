const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT');
const User = require('../models/User');

router.post('/recommended', async (req, res, next) => {
    let { body } = req;

    try {
        const user = User.find(body.userId);

        const recommended = await ChatGPT.generateRecipeU(user);

        res.json({ pantry: user.pantry, recommended });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/f/recommended', async (req, res, next) => {
    let { body } = req;

    try {
        if (body.pantry.length) {
            let pantryString = body.pantry.map(l => l.toString()).join(' ') // convert the pantry array into a string
            let dislikedString = body.dislikes.map(d => d.toString()).join(' ') // convert the disliked array into a string
            let preferences = `Excluding ${dislikedString} as i dont like them, I have ${pantryString}`

            const recommended = await ChatGPT.generateRecipe(preferences);
            res.json({ pantry: body.pantry, recommended });
        } else {
            const recommended = await ChatGPT.generateRecipe();

            res.json({ pantry: body.pantry, recommended });
        }

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