const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
let User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'please enter password with 3 or more').isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const hashpass = await bcrypt.hash(req.body.password, 12);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
