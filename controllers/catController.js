const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const catService = require('../services/catService');
const { getErrorMessage } = require('../utils/errorUtils');
const Breed = require('../models/Breed');


router.get('/add-breed', isAuth, (req, res) => {
   res.render('cat/addBreed');
});

router.post('/add-breed', async (req, res) => {
   const { breed } = req.body;
   try {
      await Breed.create({ name: breed });
      res.redirect('/');
   } catch (error) {
      console.error('Error adding breed:', error);
      res.status(500).send('Error adding breed');
   }
});

router.get('/add-cat', isAuth, async (req, res) => {
   try {
      const breeds = await Breed.find({}).lean();
      console.log(breeds);
      res.render('cat/addCat', { breeds });
   } catch (error) {
      console.error('Error fetching breeds:', error);
      res.status(500).send('Error fetching breeds');
   }
});


router.post('/add-cat', isAuth, async (req, res) => {
   const catData = req.body;
   try {
      await catService.create(req.user._id, catData);
   } catch (error) {
      return res.status(400).render('cat/addCat', { ...catData, error: getErrorMessage(error) });
   }
   res.redirect('/');
});


router.get('/:catId/edit', async (req, res) => {
   try {
      const cat = await catService.getOne(req.params.catId);
      const breeds = await Breed.find({}).lean();
      const isOwner = cat.owner == req.user?._id;

      res.render('cat/editCat', { ...cat, breeds, isOwner });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});


router.post('/:catId/edit', async (req, res) => {
   const catId = req.params.catId;
   const catData = req.body;

   try {
      // Access the selected breed from req.body


      // Now you have the selected breed ID, you can use it as needed
      // For example, you can update the cat with this selected breed
      await catService.edit(catId, { ...catData });

      res.redirect(`/`);

   } catch (error) {
      return res.render('cat/editCat', { ...catData, error: getErrorMessage(error) });
   }

});


router.get('/:catId/new-home', async (req, res) => {
   try {
      const cat = await catService.getOne(req.params.catId);
      const isBuyer = cat.shelters?.some(id => id == req.user._id);
      res.render('cat/catShelter', { isBuyer, cat })
   } catch (error) {
      console.error(error);
   }
});


router.get('/:catId/shelter-cat', isAuth, async (req, res) => {

   try {
      await catService.shelter(req.user._id, req.params.catId);
  
   } catch (error) {
      return res.status(400).render('404', { error: getErrorMessage(error) });
   }

   res.redirect(`/cats/${req.params.catId}/new-home`);
});

router.get('/:catId/delete', isAuth, async (req, res) => {
   await catService.delete(req.params.catId);

   res.redirect('/')
})


router.get('/search', async (req, res) => {

   try {
      const name = req.query.name; 
      const cat = await catService.search(name); 
      
      res.render('cat/search', { name, cat });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
