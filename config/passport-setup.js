const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

// saving user object in the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
// register user
passport.use('local.signup', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,username,password, done)=> {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Les mots de passe ne correspondent pas'))
    } else {
        User.findOne({email: username}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                return done(null, false, req.flash('error', 'Nom utlisateur  déjà utilisée'))
            }

            if (!user) {
                //create user
                let newUser = new User()
                newUser.email = req.body.email.toLowerCase()
                newUser.password = newUser.hashPassword(req.body.password),
                //newUser.avatar = "profile.png"
                newUser.name=req.body.name,
                newUser.save ((err,user)=> {
                    if(!err) {
                        return done(null, user, req.flash('success', 'User Added'))
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    }
}))

//login strategy

passport.use('local.login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,username,password, done)=> {

    //find user
    User.findOne({email: username.toLowerCase()}, (err,user)=> {

        if (err) {
            return done(null, false, req.flash('error', "Quelque chose s'est mal passé"))
        } 
        if(!user) {
            return done(null, false, req.flash('error', "L'utilisateur n'a pas  trouvé"))
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user, req.flash('success', ' Bienvenu(e)'))

            } else {
                return done(null,false, req.flash('error', 'Le mot de passe est incorrect'))

            }
        }
    })
}))