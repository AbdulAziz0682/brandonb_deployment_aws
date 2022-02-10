const mongoose = require('mongoose')
const schema = mongoose.Schema

const TiktokSchema = new schema({
    Username :{type:String},
    Followers : {type:String}
})
const TiktokModel = mongoose.model('tiktok_follower',TiktokSchema)

module.exports = TiktokModel