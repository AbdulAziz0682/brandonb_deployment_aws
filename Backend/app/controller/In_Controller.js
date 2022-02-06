const Insta = require('scraper-instagram');
const InstaClient = new Insta();
const instagramModel = require('../model/instagramModel')

module.exports= {

    // Add data Api

    addData:async (req , res, next) => {
        try{

            const Username = req.body.Username
            // console.log(Username)
            InstaClient.getProfile(Username).then(profile =>{
                if (profile.followers) {
                    instagramModel.create({
                        Username : req.body.Username,
                        Followers : profile.followers
                    },(err , result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Instagram Followers added Successfully")
                        }
                    })
                }
                console.log("Instagram : " + profile.followers)
            }).catch(err => console.log(err))
        }catch{
            console.log("ERROR")
        }
    },

     // Get data Api

    getData : async function(req, res, next){
        try {
        instagramModel.find({},async function (err , result){
            try{
            if(!err){
                const Username = result[0].Username
                const _id =result[0]._id
                // console.log(Username,result[0]._id)

                InstaClient.getProfile(Username).then(async (profile) =>{
                    if(profile.followers){
                        const Followers = { 
                            Followers:profile.followers}
                        console.log( "Instagram : ", Followers)
                        const In_data = await instagramModel.findByIdAndUpdate({
                            _id:_id
                        },Followers,{
                            new:true
                        })
                        res.send( In_data)
                    }else{
                        res.send("No user found in Instagram")
                    }
                })
            }
        }catch{
            res.send("ERROR")
        }    
        })
    }catch{
        res.send('ERROR')
    }
    },

// Get Update data Api

    getupdateddata: function (req, res, next) {
        instagramModel.find({}, function (err, result) {
            if (!err) {
                res.send(result)
            }
            else {
                res.send(err, "ERROR OCCURE")
            }
        })
    },


// Update data Api

    updatedata : async function(req , res, next){
        try{
            console.log(req.params._id, req.body.Username)
            const Username = req.body.Username
            InstaClient.getProfile(Username).then(async (profile) =>{
                if (profile.followers) {
                    const data ={
                        Username : req.body.Username,
                        Followers : profile.followers
                    }
                     await instagramModel.findByIdAndUpdate({
                        _id:req.params._id
                    },data,{
                        new : true,
                    });
                }
                console.log(profile.followers)
            }).catch(err => console.log(err))



        }catch{
            res.send("Error")
        }
    },
// Delete data Api

    Deletedata: async function(req, res ,next){
        try{
            const Insta_user = await instagramModel.findByIdAndRemove({
                _id: req.params._id
            });
            res.send(Insta_user)

        }catch{

            res.send('Username able to delete')
        }
    }

}

//<-------- ///////////////////////////// --------->