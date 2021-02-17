const express = require("express")
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const router = require('./routes/router');
const users = require('./routes/user-routes')
var PORT = process.env.PORT|| 3000
//bring ejs template
app.set('view engine','ejs');
app.use('/static', express.static('public'));

app.use(express.static('uploads'))
// bring body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// session and flash config .
app.use(session({
    secret: 'bacem',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2592000}
}))
app.use(flash())
// bring passport 
app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res)=> {
    res.render('user/login',
    {error:""})

})
app.use('/router',router);
app.use('/users',users);

//listen to port 3000

app.listen(PORT,()=>{
    console.log("app is working on port 3000 ...")
})
