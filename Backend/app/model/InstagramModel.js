const mongoose = require('mongoose')
const schema = mongoose.Schema

const InstagramSchema = new schema({
    Username :{type:String},
    Followers : {type:String}
})
const instagrammodel = mongoose.model('instagram_follower',InstagramSchema)

module.exports = instagrammodel