const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = 'IamIronMan';
router.post('/createUser', [
    body('email', 'Enter a valid name').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({min:5})

], async (req, res) => {
  let success = false;
    // let obj = {
    //     name: 'Thor',
    //     phn: 978698698689
    // }

    // we can also use this function but below function is return promise
    // const user = User(req.body);
    // user.save();

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success , error : result.array()});
    }

    // this method should return promise
    let user = await User.findOne({email : req.body.email})
    if (user) {
        return res.status(400).json({success : success , error: 'Please Enter unique Email id'})
    }

    const salt = await bcrypt.genSalt(10);
    const confidentialPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password: confidentialPassword
    })

    const data = {
        user : {
            id : user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // Note: then and catch we will use in promise and async and await we use in normal
    // .then(user => res.json(user))
    // .catch(error => res.status(400).json({error : 'Please Enter a unique value', responseCode : '403', "message" : error.message}))

    // above we are doing this same
    res.json( {"statusCode" : 0, "success" : true, "authToken" : authToken} );
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
}
)

router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })


module.exports = router