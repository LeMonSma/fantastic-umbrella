const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({ include: Product })
    .then((tagData) => {
      res.json(tagData)
    })
  // find all tags
  // be sure to include its associated Product data
});



router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findOne({
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



router.post('/', async (req, res) => {
  // create a new tag

  try {
    const tagData = await Tag.create(req.body)
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
    { where: { id: req.params.id } })
    .then(dbtagData => {
      if (!dbtagData) {
        res.status(400).json({ message: 'no tag with that id' })
      }
      res.status(200).json(dbtagData)

    }).catch(err => {
      res.status(500).json(err)
    })

  // update a tag's name by its `id` value

});
router.delete('/:id', async (req, res) => {

  Tag.destroy({ where: { id: req.params.id } })
    .then(dbTagdata => {
      if (!dbTagdata) {
        res.status(400).json({ message: "no tag with that idea!" })
      }
      res.json({ message: 'Tag Deleted!' })
    }).catch((err) => {
      res.status(400).json(err)
    })

});
module.exports = router;
