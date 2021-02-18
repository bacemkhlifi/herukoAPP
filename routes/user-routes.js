const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')


// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
//  login user view 
router.get('/login', (req,res)=> {
    res.render('user/login', {
        error: req.flash('error')
    })
})

// login post request 
router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/router',
      failureRedirect: '/users/login',
      failureFlash: true })
      )


// sign up form 
router.get('/register', (req,res)=> {
    res.render('user/register', {
        error: req.flash('error')
    })
})

// sign up post request

router.post('/register',
  passport.authenticate('local.signup', {
    successRedirect: '/router',
      failureRedirect: '/users/register',
      failureFlash: true })
      )

// profile 
router.get(isAuthenticated, (req,res)=> {

res.redirect('/router', {
    success: req.flash('success')
})
})


// logout user

router.get('/logout', (req,res)=> {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router