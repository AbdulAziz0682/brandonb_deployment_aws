const mongoose = require('mongoose')

mongoose.pluralize(null)

mongoose.connect('mongodb://localhost:27017/followers',{useNewUrlParser: true, useUnifiedTopology: true},function(err){
    if(!err){
        console.log("DB connection created Successfully")
    }
    else{
        console.log("DB connection Failed")
    }
});

module.exports = mongoose