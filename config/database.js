const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventsDB', {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log("Connected succefuly to database ...");
    }
});


