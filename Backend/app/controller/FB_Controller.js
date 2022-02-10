const puppeteer = require("puppeteer");
const FacebookModel = require('../model/FacebookModel')

module.exports={

    // Add data API 
    addData:async (req , res, next)=>{
        try{
            const Username = req.body.Username
            let browser;
            const HEADLESS = true ;
            browser = await puppeteer.launch({headless : HEADLESS})
            const page = await browser.newPage();
             const url = `https://www.facebook.com/${Username}`


             await page.goto(url)

             await page.waitFor("div[class='qzhwtbm6 knvmm38d']");
             const Arry_follower = await page.evaluate(()=>{
             const follower = Array.from(document.querySelectorAll("div[class='qzhwtbm6 knvmm38d']")).map(followers=>{
                return {
                   TT_follower : followers.querySelector("span") ? followers.querySelector("span").innerText:''
                       }
                 })
                return follower
               })

               const num1 = Arry_follower[1].TT_follower[0]
               const num2 = Arry_follower[1].TT_follower[1]
               const num3 = Arry_follower[1].TT_follower[2]
               const num4 = Arry_follower[1].TT_follower[3]
               const total = `${num1}${num2}${num3}`

                   // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000
               if (num3.toString() === "K"){
                     const numb = parseFloat(total) * 1000          
                     if (numb){
                         FacebookModel.create({
                             Username : Username,
                             Followers : numb
                         },(err, result)=>{
                             if(err){
                                 next(err)
                             }else{
                                 res.send ("DATA : Facebook Followers added Successfully")
                             }
                         })
                     }
                    console.log("Facebook",numb)
                   }
               else if (num3.toString() === "M") {
                     const numb = parseFloat(total) * 1000000
                     if (numb){
                        FacebookModel.create({
                            Username : Username,
                            Followers : numb
                        },(err, result)=>{
                            if(err){
                                next(err)
                            }else{
                                res.send ("DATA : Facebook Followers added Successfully")
                            }
                        })
                    }
                   console.log("Facebook :",numb)
                   }
              else if(num3 === 0||1||2||3||4||5||6||7||8||9){
                   if (num4.toString() === "K"){
                       const numb = parseFloat(total) * 1000
                  
                       if (numb){
                        FacebookModel.create({
                            Username : Username,
                            Followers : numb
                        },(err, result)=>{
                            if(err){
                                next(err)
                            }else{
                                res.send ("DATA : Facebook Followers added Successfully")
                            }
                        })
                    }
                   console.log("Facebook :",numb)
                    } 
              else if (num4.toString() === "M"){
                       const numb = parseFloat(total) * 1000000
                       if (numb){
                        FacebookModel.create({
                            Username : Username,
                            Followers : numb
                        },(err, result)=>{
                            if(err){
                                next(err)
                            }else{
                                res.send ("DATA : Facebook Followers added Successfully")
                            }
                        })
                    }
                   console.log("Facebook :",numb)
                    }
                                             }

        }catch{
            console.log("Fb Adddata error")
        }
    },





// Get data API 

    getData : async function(req , res , next){
        try{
            FacebookModel.find({},async function (err, result){
                try{
                    if(!err){
                        const Followers = result[0].Followers
                        const Username = result[0].Username
                        const _id = result[0]._id

                        let browser;
                        const HEADLESS = true ;
                        browser = await puppeteer.launch({headless : HEADLESS})
                        const page = await browser.newPage();                      
                        const url = `https://www.facebook.com/${Username}`
                  

                     await page.goto(url)

                     await page.waitFor("div[class='qzhwtbm6 knvmm38d']");
                     const Arry_follower = await page.evaluate(()=>{
                     const follower = Array.from(document.querySelectorAll("div[class='qzhwtbm6 knvmm38d']")).map(followers=>{
                        return {
                           TT_follower : followers.querySelector("span") ? followers.querySelector("span").innerText:''
                               }
                         })
                        return follower
                       })
        
                       const num1 = Arry_follower[1].TT_follower[0]
                       const num2 = Arry_follower[1].TT_follower[1]
                       const num3 = Arry_follower[1].TT_follower[2]
                       const num4 = Arry_follower[1].TT_follower[3]
                       const total = `${num1}${num2}${num3}`

                   // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000
                   if (num3.toString() === "K"){
                    const numb = parseFloat(total) * 1000
                    const UpdatedF ={
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : _id
                        },UpdatedF ,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                   console.log("Facebook :",numb)
                  }
              else if (num3.toString() === "M") {
                    const numb = parseFloat(total) * 1000000
                    const UpdatedF ={
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : _id
                        },UpdatedF ,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                  console.log("Facebook :",numb)
                  }
             else if(num3 === 0||1||2||3||4||5||6||7||8||9){
                  if (num4.toString() === "K"){
                      const numb = parseFloat(total) * 1000    
                      const UpdatedF ={
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : _id
                        },UpdatedF ,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                  console.log("Facebook :",numb)
                   } 
             else if (num4.toString() === "M"){
                      const numb = parseFloat(total) * 1000000
                      const UpdatedF ={
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : _id
                        },UpdatedF ,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                  console.log("Facebook :",numb)
                   }
                       
                    }}

                }catch {
                    res.send("Facebook Getdata Inner Error")
                }
            })

        }catch{
            res.send("Facebook Getdata Error")
        }
    },




// Only Update data API 

Fb_Updatedata: async function( req , res , next){
    try{

        const Username = req.body.Username
        const _id = req.params._id
        let browser;
        const HEADLESS = true ;
        browser = await puppeteer.launch({headless : HEADLESS})
        const page = await browser.newPage();
        const url = `https://www.facebook.com/${Username}`

     await page.goto(url)

     await page.waitFor("div[class='qzhwtbm6 knvmm38d']");
     const Arry_follower = await page.evaluate(()=>{
     const follower = Array.from(document.querySelectorAll("div[class='qzhwtbm6 knvmm38d']")).map(followers=>{
        return {
           TT_follower : followers.querySelector("span") ? followers.querySelector("span").innerText:''
               }
         })
        return follower
       })

       const num1 = Arry_follower[1].TT_follower[0]
       const num2 = Arry_follower[1].TT_follower[1]
       const num3 = Arry_follower[1].TT_follower[2]
       const num4 = Arry_follower[1].TT_follower[3]
       const total = `${num1}${num2}${num3}`

                   // if there is M  followers then multiple by 1000000 and if there is K then multiple by 1000
                   if (num3.toString() === "K"){
                    const numb = parseFloat(total) * 1000
                    const updatedata ={
                        Username : Username,
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : req.params._id
                        },updatedata,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                   console.log("Facebook :",numb)
                  }              
                  
                  else if (num3.toString() === "M") {
                    const numb = parseFloat(total) * 1000000
                    const updatedata ={
                        Username : Username,
                        Followers : numb
                    }
                    if (numb){
                        const FB_Data = await FacebookModel.findByIdAndUpdate({
                          _id : req.params._id
                        },updatedata,{
                            new:true
                        })
                        res.send("Updated data"+FB_Data)
                    }
                  console.log("Facebook :",numb)
                  }

                  else if(num3 === 0||1||2||3||4||5||6||7||8||9){
                    if (num4.toString() === "K"){
                        const numb = parseFloat(total) * 1000
                        const updatedata ={
                            Username : Username,
                            Followers : numb
                        }
                        if (numb){
                            const FB_Data = await FacebookModel.findByIdAndUpdate({
                              _id : req.params._id
                            },updatedata,{
                                new:true
                            })
                            res.send("Updated data"+FB_Data)
                        }
                    console.log("Facebook :",numb)
                     } 
               else if (num4.toString() === "M"){
                        const numb = parseFloat(total) * 1000000
                        const updatedata ={
                            Username : Username,
                            Followers : numb
                        }
                        if (numb){
                            const FB_Data = await FacebookModel.findByIdAndUpdate({
                              _id : req.params._id
                            },updatedata,{
                                new:true
                            })
                            res.send("Updated data"+FB_Data)
                        }
                    console.log("Facebook :",numb)
                     }
                         
                      }



    }catch{
        console.log(error)
    }
},



// Delete data API 

Fb_Deletedata: async function(req, res ,next){
    try{
        const Fb_user = await FacebookModel.findByIdAndRemove({
            _id: req.params._id
        });
        res.send(Fb_user)

    }catch{

        res.send('Username able to delete')
    }
},

// Get updated data API 

    getupdateddata: function (req, res, next) {
        FacebookModel.find({}, function (err, result) {
            if (!err) {
                res.send(result)
            }
            else {
                res.send(err, "ERROR OCCURE")
            }
        })
    },
}