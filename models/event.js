const mongoose=require('mongoose');
const eventSchema= new mongoose.Schema({
    title:  {type:String,required:true}, // String is shorthand for {type: String}
    author: {type:String,required:false},
    user_id:{type:String,required:true},
    description: {type:String,required:true},
    phone:{type:Number,required:true},
    prix:{type:Number ,required:true},
    imageProduct:{type:String,required:false},
    date: { type: Date,required:false},
    location:{type:String,required:true},
    reagi: {
      type : Number,
      
    }
   
})

let event = mongoose.model('event',eventSchema,'events');
module.exports=event;