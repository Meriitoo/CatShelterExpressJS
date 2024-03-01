const router = require('express').Router();
const catService = require('../services/catService');


router.get('/', async (req, res) => {
    const cats = await catService.getAll();
    

    console.log(req.user);
    res.render('home', { cats });
});

module.exports = router;