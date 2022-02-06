var youtubeData = require('youtubesubs-count-v1')
const youtubemodel = require('../model/YoutubeModel')

module.exports ={

    //<-------- /// Add data Api /////// --------->
    addData:async (req, res , next)=>{
        try{
            const channal_id = req.body.Channal_id
            const Apikey = req.body.Api_key
            const Username = req.body.Username
            console.log ("ID:"+channal_id,"Apikey:" + Apikey + Username)

      youtubeData.youtubeSubsFn(`${channal_id}`,`${Apikey}`).then((data)=>{
        
        const Subscribers = parseFloat(data.statistics.subscriberCount)
        console.log('Youtube :', Subscribers)
        if(data){
            youtubemodel.create({
                Channal_id : channal_id,
                Api_key : Apikey,
                Subscriber : Subscribers,
                Username : Username
            },(err , result)=>{
                if(err){
                    next(err)
                }else{
                    res.send ("DATA : Youtube Subscribers added successfully")
                }
            })

        }
    }).catch((error)=> {
        console.log(error)
    })
        }catch{
            console.log("ERROR")
        }

    },

 
   ///<-------- ///////////////////////////// --------->

   //<-------- /// Get data Api /////// --------->

    getData: async function(res, req, next){
        try{
            youtubemodel.find({},async function(err , result){
                try{
                    if(!err){
                        const _id = result[0]._id
                        const Channal_id = result[0].Channal_id
                        const Api_key = result[0].Api_key
                
                        youtubeData.youtubeSubsFn(`${Channal_id}`,`${Api_key}`).then(async (data)=>{
                            try{
                            const Subscriber = parseFloat( data.statistics.subscriberCount)
                            console.log('Youtube :', Subscriber)
                            const YTdata={ 
                                Subscriber : Subscriber
                            }
                            if(data.statistics.subscriberCount){
                                const YT_data = await youtubemodel.findByIdAndUpdate({
                                    _id:_id
                                },YTdata,{
                                    new:true
                                })
                                // res.send("updated data")
                                console.log('Data Inserted')

                            }else{
                                res.send("No channel found in Youtube")
                            }
                        }catch{res.send("Youtube Insert ddata Error")}
                        })

                    }

                }catch{res.send("Youtube Error")}
            })
        }catch{res.send("Outer Youtube Error")}

    },



 ///<-------- ///////////////////////////// --------->

 //<-------- /// Get updadated Api /////// --------->

    getupdateddata: function (req, res, next){
     youtubemodel.find({}, function (err, result){
         if(!err){
             res.send(result)
         }
         else {
             res.send(err, "ERROR OCCURE")
         }
     })
    },


///<-------- ///////////////////////////// --------->

//<-------- /// Update data Api /////// --------->


    YT_updatedata : async function(req , res, next){
        try{
            // console.log(req.params._id, req.body)
            const Username = req.body.Username
            const Channal_id = req.body.Channal_id
            const Api_key = req.body.Api_key
            
            // console.log(Username)

            youtubeData.youtubeSubsFn(`${Channal_id}`,`${Api_key}`).then(async (data)=>{
                try{
                 const Subscribers = parseFloat(data.statistics.subscriberCount)

                if(data.statistics.subscriberCount){
                    const data ={
                        Channal_id : Channal_id,
                        Api_key : Api_key,
                        Username : Username,
                        Subscriber : Subscribers,
                    }
                    const YT_data = await youtubemodel.findByIdAndUpdate({
                        _id:req.params._id
                    },data,{
                        new:true
                    })
                    // res.send("updated data"+YT_data)
                    console.log('Youtube:', data.Subscriber)

                }else{
                    res.send("No channel found in Youtube")
                }
            }catch{res.send("Youtube Innser ddata Error")}
            })
    
        }catch{
            res.send("Error")
        }
    },

///<-------- ///////////////////////////// --------->

//<-------- /// Delete data Api /////// --------->
    Deletedata: async function(req, res ,next){
        try{
            const Yt_user = await youtubemodel.findByIdAndRemove({
                _id: req.params._id
            });
            res.send('deleted successfully')

        }catch{

            res.send('Username able to delete')
        }
    }

///<-------- ///////////////////////////// --------->












}