const express = require('express');
const router = express.Router();
const Event =require('../models/event');
var bodyParser = require('body-parser');
const session= require('express-session')
const flash = require('connect-flash');
const { check, validationResult } = require('express-validator/check');
const userdb= require('../models/user')
const multer = require("multer");
const { update, where } = require('../models/user');



//config flash 
router.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: 2592000}
}))
router.use(flash())

 //bring body parser

 router.use(bodyParser.urlencoded({extended:false}));
 router.use(bodyParser.json());
 // configure multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + file.fieldname+'.png') 
    }
  })

var upload = multer({ storage: storage })


//show add new article
router.get('/show/addpost',(req,res)=>{
    var a=typeof(req.user)
    if(a!=="object"){
        res.redirect('/users/login')}
        else {
    var a=typeof(req.user)
    res.render('createEvent',
    { errors: req.flash('errors'),
        a:a}
)}})

//bring post event
router.post('/show/addpost' ,upload.single('avatar') , [
    check('title').isLength({min:1}).withMessage('Titre ne doit pas être vide'),
    check('description').isLength({min:2}).withMessage('Minimum 2 caractéres describe votre produit'),
    check('prix').isLength({min:1,max:10}).withMessage('Entrez prix en DinarTn'),
    //check('avatar').isEmpty().withMessage('Ajoutez photo de votre article'),
    check('phone').isLength({min:8,max:8}).withMessage('Entrez numéro de téléphone valide')]
 
,(req, res) => {
     const errors = validationResult(req)
   if(!errors.isEmpty()){
       req.flash('errors',errors.array())
       res.redirect('/router/show/addpost')
   }
    else { 
         
        //console.log(req.user)
       
        let newEvent= new Event({
            title:req.body.title,
            author:req.user.email,
            user_id: req.user.id,
            description:req.body.description,
            prix:req.body.prix,
           imageProduct:req.file.filename,

            date:Date.now(),
             phone:req.body.phone,
            location: req.body.location,
            
        })
      
        console.log(newEvent) 
        newEvent.save((err)=>{
            if(!err){
                console.log("added succesfuly to DB")
                req.flash('info', " L'article a été ajouté avec succès")
                res.redirect('/router')
            }
            else {
               
            console.log(err)
                
               
            } })
       
    
        }
})

//show a single event
router.get('/show/:id',(req,res)=>{
    Event.find({_id:req.params.id},(err,event)=>{
        if(!err){
            //console.log(event)
            var a=typeof(req.user)
            res.render('singleEvent',{
                event:event,
                a:a
            })
        }
        else {
            console.log(err)
        }
    })
    
})


// profile 
router.get('/profile', (req,res)=> {
    var a=typeof(req.user)
    if(a!=="object"){
        res.redirect('/users/login')
    } else{Event.find({user_id:req.user.id},(err,event)=>{
        if(!err){//console.log(event)
            var a=typeof(req.user)
         res.render('user/profile',{
        name: req.user.email,
        event:event,
        a:a} )}
        else{console.log(err)}
    })
   }
    

})


//show events in acceuil
router.get('/:pageNo?',(req,res)=>{ let pageNo = 1

    if ( req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo == 0)   {
        pageNo = 1
    }
    
    let q = {
        skip: 6 * (pageNo - 1),
        limit: 6
    }
    //find totoal documents
    let totalDocs = 0 

    Event.countDocuments({}, (err,total)=> {

    }).then( (response)=> {
        totalDocs = parseInt(response)
        Event.find({},{},q, (err,events)=> {
            //     res.json(events)
                 let chunk = []
                 let chunkSize = 3
                 for (let i =0 ; i < events.length ; i+=chunkSize) {
                     chunk.push(events.slice( i, chunkSize + i))
                 }
                 var a=typeof(req.user)
                 
                  res.render('indexEvents', {
                      chunk : chunk,
                      message: req.flash('info'),
                      total: parseInt(totalDocs),
                      pageNo: pageNo,
                      a:a
                      
                  })
             })
    })

  
})
//delete event

router.delete('/profile/delete/:id',(req,res)=>{
    let query = {_id:req.params.id}
    Event.deleteOne(query,(err)=>{
        if(!err){res.status(200).json("deleted")}
        else{res.status(404).json("error 404")}
    })

})
//search event





module.exports=router;