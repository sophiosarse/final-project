const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('register', {
        title: 'Sign Up'
    });
});

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser =
            await User.findOne({email});
        if (existingUser) {
            return res.render('register', {
                title: 'Sign Up',
                error: 'User already exists'
            });
        }
        const user = new User({
            email,
            password
        });
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('register', {
            title: 'Sign Up',
            error: 'Something went wrong'
        });
    }
});

module.exports = router;