const db = require('../config/database');
const event = require('../models/event');

let newEvents= [new event({
    title:'shoes addids',
    author:'ousserma abdeli',
    description:'this prodect to sell for moms',
    comments:['behi yeser',Date.now()],
    location:'sfax',
    date:Date.now(),
    reagi:5
}),
new event({
    title:'Nike jordan',
    author:'ali abdeli',
    description:'this prodect to sell for dads',
    comments:['prix svp',Date.now()],
    location:'ariana',
    date:Date.now(),
    reagi:0
}),
new event({
    title:'pantallon',
    author:'Med rebaii',
    description:'this prodect to sell for moms',
    comments:['svp b9adeeeeh!!',Date.now()],
    location:'sfax',
    date:Date.now(),
    reagi:2
}),
new event({
    title:'maillot',
    author:'bacem khlifi',
    description:'this prodect to sell for sons',
    comments:['behi yeser',Date.now()],
    location:'mahdia',
    date:Date.now(),
    reagi:2
}),new event({
    title:'neme title',
    author:'ousserma sallemi',
    description:'this prodect to sell for moms',
    comments:['behi yeser',Date.now()],
    location:'tunis',
    date:Date.now(),
    reagi:2
}),
new event({
    title:'no title',
    author:'ousserma abdlhedi',
    description:'this prodect to sell ',
    comments:['behi yeser',Date.now()],
    location:'sfax',
    date:Date.now(),
    reagi:2
}),new event({
    title:'maillot',
    author:'bacem khlifi',
    description:'this prodect to sell for sons',
    comments:['behi yeser',Date.now()],
    location:'mahdia',
    date:Date.now(),
    reagi:44
}),new event({
    title:'neme title',
    author:'ousserma sallemi',
    description:'this prodect to sell for moms',
    comments:['behi yeser',Date.now()],
    location:'tunis',
    date:Date.now(),
    reagi:29
}),
new event({
    title:'no title',
    author:'ousserma abdlhedi',
    description:'this prodect to sell ',
    comments:['behi yeser',Date.now()],
    location:'sfax',
    date:Date.now(),
    reagi:9
})
]
newEvents.forEach((event)=>{event.save((err)=>{
    if(!err){
        console.log("added to database")
    }
    else {
        console.log(err)
    }
})})

