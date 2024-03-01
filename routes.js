const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const catController = require('./controllers/catController');

router.use(homeController);
router.use('/auth', authController);
router.use('/cats', catController);

module.exports = router;