const express = require("express")
const User = require('../models/User.js')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Secret_Key"

router.post("/signin",[
    body('username', 'username must be at least 5 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
          return res.status(400).json({ error: "User with this E-mail address already exists" })
        }
        var salt = await bcrypt.genSalt(10);
        var SecuredPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            username: req.body.username,
            // The following line overwrites the password with the plain text password instead of the hashed one
            // password: req.body.password,
            password: SecuredPassword, // Correctly using the hashed password
            email: req.body.email
          });
        const data = {
            user: {
              id: user.id
            }
          };

        const AuthToken = jwt.sign(data, JWT_SECRET);
        res.json({ AuthToken: AuthToken });   

    }catch(err){
        console.error(err.message)
        res.status(400).json({error:"Some unknown err occurred"})
    }
})

router.post("/login",[
    body('email', 'Your email is incorrect!').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Your email is incorrect!" })
    }
    const PswdCmpre = await bcrypt.compare(password, user.password)
    if (!PswdCmpre) {
      return res.status(400).json({ error: "Please enter correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    };
    const AuthToken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    res.json({ AuthToken: AuthToken });
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ error: "Some UnKnown Error occured" })
  }
})

router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
      // Gets user id from data of user passed from fetchuser middleware
      const user_id = req.user.id
      // All details of user except the password
      const user = await User.findById(user_id).select("-password")
      // const user = await User.findById(user_id)
      res.send(user);
    } catch (error) {
      console.error(error.message)
      res.status(400).send("Some UnKnown Error occured")
    }
  })


module.exports = router
