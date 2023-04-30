const router = require('express').Router();
const authRoutes = require('./auth.route.js')
const userRoutes = require('./user.route.js')
const recipeRoutes = require('./recipe.route.js')

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;
