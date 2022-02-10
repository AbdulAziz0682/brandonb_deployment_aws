const mongoose = require('mongoose')
const schema = mongoose.Schema

const FacebookSchema = new schema ({
    Username : {type: String},
    Followers : {type: String}
})

const FacebookModel = mongoose.model('facebook_follower', FacebookSchema)

module.exports = FacebookModel