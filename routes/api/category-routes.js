const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({ include: [Product] })
    .then(dbCategory => res.json(dbCategory))
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }


  }).
    then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })

});
;

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
    { where: { id: req.params.id } })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(400).json({ message: 'no category with that id' })
      }
      res.status(200).json(dbCategoryData)
    }).catch(err => {
      res.status(500).json(err)
    })
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
