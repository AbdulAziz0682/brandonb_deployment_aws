
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const Tiktok = require('./routes/Tiktok')
const Instagram = require('./routes/Instagram')
const Youtube = require('./routes/Youtube')
const Facebook = require ('./routes/Facebook')


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Configure DB

require('./db/dbconfig')

// Calling Routes

app.use('/tiktok',Tiktok)
app.use('/Instagram',Instagram)
app.use('/youtube',Youtube)
app.use('/facebook',Facebook)

// PORT identification

const PORT = process.env.PORT || 7777

// PORT Confirmation
app.listen(PORT,function(err,res){

    console.log(`Server is running on port ${PORT}`);
})
