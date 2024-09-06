const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "villan@123";
const fetchuser = require('../midlewers/fetchuser');
const User = require('../models/user');
const router = Router();


// create user 
router.post('/add-user', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     
    const {name, email ,  password}= req.body ;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create the user
        user = await User.create({
            name,
            email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        };

        // Generate JWT token
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
});


// login user
router.post('/login', [

    body('email', 'Enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
 ], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
       return res.status(400).json({ sucsess, errors: result.array() });
    }
 
    const { email, password } = req.body;
    try {
       let user = await User.findOne({ email });
       if (!user) {
          return res.status(400).json({ sucsess:"false", errors: 'plese enter the correct information' });
       }
 
       const passwordcode = await bcrypt.compare(password, user.password);
       if (!passwordcode) {
          return res.status(400).json({ sucsess, errors: 'plese enter the correct information' });
       }
 
       const data = {
          user: {
             id: user.id
          }
       }
 
       const authToken = jwt.sign(data, JWT_SECRET);
   
       res.json({ success:true, authToken })
 
    } catch (error) {
       console.error(error.message);
       res.status(500).send("internal server error");
    }
 
 })
 
 //  get user detail information, login required
 router.post('/getuser', fetchuser, async (req, res) => {
 
    try {
       let userid = req.user.id;
       const user = await User.findById(userid).select("-password");
       res.send(user);
    } catch (error) {
       console.error(error.message);
       res.status(500).send("internal server error");
    }
 })
 



module.exports = router;