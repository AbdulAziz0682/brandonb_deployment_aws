const TiktokModel = require('../model/TiktokModel')
const TikTokScraper = require("tiktok-scraper");
const puppeteer = require("puppeteer");
module.exports= {
    //<-------- /// Adding Username and store followers in database /////// --------->
    // brandonb

    //<-------- /// Add data Api /////// --------->
    addData: async (req , res, next) => {
        try {

            const Username = req.body.Username
            let browser;
            const HEADLESS = true ;
            browser = await puppeteer.launch({headless : HEADLESS})
            const page = await browser.newPage();
            //  const url = `https://www.facebook.com/brandnbaum`
             const url = `https://www.tiktok.com/@${Username}`


             await page.goto(url)

             
             await page.waitFor("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']");
             const Arry_follower = await page.evaluate(()=>{
             const follower = Array.from(document.querySelectorAll("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']")).map(followers=>{
                return {
                   TT_follower : followers.querySelector("strong[title='Followers']") ? followers.querySelector("strong[title='Followers']").innerText:''
                       }
                 })
                return follower
               })

            const num1 = Arry_follower[1].TT_follower[0]
            const num2 = Arry_follower[1].TT_follower[1]
            const num3 = Arry_follower[1].TT_follower[2]
            const num4 = Arry_follower[1].TT_follower[3]
            const num5 = Arry_follower[1].TT_follower[4]
            const total = `${num1}${num2}${num3}${num4}`

            
            // console.log("Tiktok : " ,total)

            // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000
            if(total){

            if(num2.toString() === "K"){
                
                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }


            }else if (num2.toString() === "M"){

                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }
                
            } else if (num3.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }


            }else if(num3.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }
            }else if (num4.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }


            }else if(num4.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }
            }else if (num5.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }
            }else if(num5.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                if (numb){
                    TiktokModel.create({
                        Username : Username,
                        Followers : numb
                    },(err, result)=>{
                        if(err){
                            next(err)
                        }else{
                            res.send ("DATA : Tiktok Followers added Successfully")
                        }
                    })
                }
            }

        }else {
            console.log("There is error with tiktok server")
        }

        } catch (error) {
            console.log(error);
        }
    },


    ///<-------- ///////////////////////////// --------->

        //<-------- /// Get data Api /////// --------->

     getData : function (req, res, next){
         TiktokModel.find({},async function(err , result){
             if(!err){
                 const Followers_Update_id =result[0]._id

                 try {

                 const Username = result[0].Username
                 let browser;
                 const HEADLESS = true ;
                 browser = await puppeteer.launch({headless : HEADLESS})
                 const page = await browser.newPage();
                 //  const url = `https://www.facebook.com/brandnbaum`
                  const url = `https://www.tiktok.com/@${Username}`
     
                  await page.goto(url)                  
                  await page.waitFor("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']");
                  const Arry_follower = await page.evaluate(()=>{
                  const follower = Array.from(document.querySelectorAll("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']")).map(followers=>{
                     return {
                        TT_follower : followers.querySelector("strong[title='Followers']") ? followers.querySelector("strong[title='Followers']").innerText:''
                            }
                      })
                     return follower
                    })
     
                 const num1 = Arry_follower[1].TT_follower[0]
                 const num2 = Arry_follower[1].TT_follower[1]
                 const num3 = Arry_follower[1].TT_follower[2]
                 const num4 = Arry_follower[1].TT_follower[3]
                 const num5 = Arry_follower[1].TT_follower[4]
                 const total = `${num1}${num2}${num3}${num4}`
     
                 
                 // console.log(parseFloat(total) )
                //  console.log("Tiktok : " ,total)

             // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000

             if(num2.toString() === "K"){
                     
                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)

                const update_data ={
                    Username : Username,
                    Followers : numb

                }
                if (numb){
                   const data = await TiktokModel.findByIdAndUpdate({
                       _id:Followers_Update_id
                   },update_data,{
                       new :true 
                   }) 
   
                   res.send(data)
                }


            }else if (num2.toString() === "M"){

                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){
                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }

                
            } else if (num3.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){
                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }



            }else if(num3.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){


                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }

            }else if (num4.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){


                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }



            }else if(num4.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){
                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }

            }else if (num5.toString() === "K"){

                const numb = parseFloat(total) * 1000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb

               }
               if (numb){
                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }

            }else if(num5.toString() === "M"){
                const numb = parseFloat(total) * 1000000
                console.log("Tiktok : " , numb)
                const update_data ={
                   Username : Username,
                   Followers : numb
               }
               if (numb){
                  const data = await TiktokModel.findByIdAndUpdate({
                      _id:Followers_Update_id
                  },update_data,{
                      new :true 
                  }) 
  
                  res.send(data)
               }

            }}catch (error) {
                console.log(error);
            }
         }else{
             res.send(err , "Error occure")
         }
     })
 },


    ///<-------- ///////////////////////////// --------->

//<-------- /// Only Update data Apis /////// --------->

updatedata:async function (req, res, next){

try{
    
    const Username = req.body.Username
    let browser;
    const HEADLESS = true ;
    browser = await puppeteer.launch({headless : HEADLESS})
    const page = await browser.newPage();
    //  const url = `https://www.facebook.com/brandnbaum`
     const url = `https://www.tiktok.com/@${Username}`


     await page.goto(url)

     
     await page.waitFor("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']");
     const Arry_follower = await page.evaluate(()=>{
     const follower = Array.from(document.querySelectorAll("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']")).map(followers=>{
        return {
           TT_follower : followers.querySelector("strong[title='Followers']") ? followers.querySelector("strong[title='Followers']").innerText:''
               }
         })
        return follower
       })

    const num1 = Arry_follower[1].TT_follower[0]
    const num2 = Arry_follower[1].TT_follower[1]
    const num3 = Arry_follower[1].TT_follower[2]
    const num4 = Arry_follower[1].TT_follower[3]
    const num5 = Arry_follower[1].TT_follower[4]
    const total = `${num1}${num2}${num3}${num4}`

    
    // console.log(parseFloat(total) )
    // console.log("Tiktok : " ,total)

     // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000

    if(num2.toString() === "K"){
                     
        const numb = parseFloat(total) * 1000
        console.log("Tiktok : " , numb)

        const update_data ={
            Username : Username,
            Followers : numb

        }
        if (numb){

           const data = await TiktokModel.findByIdAndUpdate({
               _id:req.params._id
           },update_data,{
               new :true 
           }) 

           res.send(data)
        }


    }else if (num2.toString() === "M"){

        const numb = parseFloat(total) * 1000000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb
       }
       if (numb){

          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }
        
    } else if (num3.toString() === "K"){

        const numb = parseFloat(total) * 1000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb

       }
       if (numb){
          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 
          res.send(data)
       }

    }else if(num3.toString() === "M"){
        const numb = parseFloat(total) * 1000000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb
       }
       if (numb){
          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }

    }else if (num4.toString() === "K"){

        const numb = parseFloat(total) * 1000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb

       }
       if (numb){

          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }

    }else if(num4.toString() === "M"){
        const numb = parseFloat(total) * 1000000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb

       }
       if (numb){
          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }

    }else if (num5.toString() === "K"){

        const numb = parseFloat(total) * 1000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb

       }
       if (numb){
          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }

    }else if(num5.toString() === "M"){
        const numb = parseFloat(total) * 1000000
        console.log("Tiktok : " , numb)
        const update_data ={
           Username : Username,
           Followers : numb

       }
       if (numb){
          const data = await TiktokModel.findByIdAndUpdate({
              _id:req.params._id
          },update_data,{
              new :true 
          }) 

          res.send(data)
       }}

}catch{
    console.log('error on outer tiktoker')
}
},



///<-------- ///////////////////////////// --------->

//<-------- /// Get Updated data API /////// --------->

         getupdateddata: function (req, res, next) {
            TiktokModel.find({}, function (err, result) {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err, "ERROR OCCURE")
                }
            })
        },

        ///<-------- ///////////////////////////// --------->

//<-------- /// Delete data done /////// --------->

        Deletedata: async function(req, res ,next){
            try{
                const tiktok_user = await TiktokModel.findByIdAndRemove({
                    _id: req.params._id
                });
                res.send(tiktok_user)
    
            }catch{
    
                res.send('Username unable to delete')
            }
        }

///<-------- ///////////////////////////// --------->
    
}