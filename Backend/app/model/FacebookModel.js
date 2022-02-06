const mongoose = require('mongoose')
const schema = mongoose.Schema

const FacebookSchema = new schema ({
    Username : {type: String},
    Followers : {type: String}
})

const facebookmodel = mongoose.model('facebook_follower', FacebookSchema)

module.exports = facebookmodel