const mongoose = require('mongoose')
const schema = mongoose.Schema

const YoutubeSchema = new schema ({
    Channal_id : {type:String},
    Api_key : {type:String},
    Subscriber : {type:String},
    Username :{type:String}
})

const YoutubeModel = mongoose.model('youtube_follower', YoutubeSchema)

module.exports = YoutubeModel