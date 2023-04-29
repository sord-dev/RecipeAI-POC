const router = require('express').Router();
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const recipeRoutes = require('./recipe.route')

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);


module.exports = router;
