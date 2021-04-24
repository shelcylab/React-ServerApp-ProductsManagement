const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Product = require('../../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  auth,
  [
    check('name', 'name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty(),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newProduct = new Product({
        user:req.user.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        date: req.body.date,
     
       
      });

      const result = await newProduct.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    const result = await Product.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.date = req.body.date;
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
