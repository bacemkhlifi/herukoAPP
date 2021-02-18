const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL||'mongodb+srv://bacem:khlifi21762608@cluster0.jdx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log("Connected succefuly to database ...");
    }
});