//<-------- /// Youtube scraper done /////// --------->

// var youtubeData = require('youtubesubs-count-v1')

//     youtubeData.youtubeSubsFn('UCUnmH8N8k4E7y3dKfCzDKKg','AIzaSyCkwYerfSCo8euUFuTjU6aveIu6E4tFx8c').then((data)=>{
//         console.log(data)
//     }).catch((error)=> {
//         console.log(error)
//     })

//<-------- ///////////////////////////// --------->



//<-------- /// Facebook scraper done /////// --------->

// const puppeteer = require("puppeteer");

// let browser;

// const HEADLESS = true ;

// async function main(){
//     browser = await puppeteer.launch({headless : HEADLESS})
//     const page = await browser.newPage();
//     const url = 'https://www.facebook.com/brandnbaum'
//     //  const url = ' https://www.facebook.com/WoodyandKleiny'

   
//     await page.goto(url)

//     await page.waitFor("div[class='qzhwtbm6 knvmm38d']");
//     const Arry_follower = await page.evaluate(()=>{
//         const follower = Array.from(document.querySelectorAll("div[class='qzhwtbm6 knvmm38d']")).map(followers=>{
//             return {
//                 TT_follower : followers.querySelector("span") ? followers.querySelector("span").innerText:''
//             }
//         })
//         return follower
//     })

//     const num1 = Arry_follower[1].TT_follower[0]
//     const num2 = Arry_follower[1].TT_follower[1]
//     const num3 = Arry_follower[1].TT_follower[2]
//     const num4 = Arry_follower[1].TT_follower[3]
//     const total = `${num1}${num2}${num3}`

//     // if there is M followers then multiple by 1000000 and if there is K then multiple by 1000
//     if (num3.toString() === "K"){
//         const numb = parseFloat(total) * 1000
//         console.log(numb)
//     }else if (num3.toString() === "M") {
//         const numb = parseFloat(total) * 1000000
//         console.log(numb)
//     }else if(num3 === 0||1||2||3||4||5||6||7||8||9){
         
//           if (num4.toString() === "K"){
//             const numb = parseFloat(total) * 1000
//             console.log(numb)
//           } else if (num4.toString() === "M"){
//             const numb = parseFloat(total) * 1000000
//             console.log(numb)
//           }
//     }


// }
// main()


//<-------- ///////////////////////////// --------->


// downloading scrapers packages



//<-------- /// Tiktok scraper done /////// --------->

// const Username = req.body.Username
// let browser;
// const HEADLESS = true ;
// browser = await puppeteer.launch({headless : HEADLESS})
// const page = await browser.newPage();
// //  const url = `https://www.facebook.com/brandnbaum`
//  const url = `https://www.tiktok.com/@${Username}`
// //  const url = ' https://www.facebook.com/WoodyandKleiny'


//  await page.goto(url)

 
//  await page.waitFor("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']");
//  const Arry_follower = await page.evaluate(()=>{
//  const follower = Array.from(document.querySelectorAll("div[class='tiktok-xeexlu-DivNumber e1awr0pt1']")).map(followers=>{
//     return {
//        TT_follower : followers.querySelector("strong[title='Followers']") ? followers.querySelector("strong[title='Followers']").innerText:''
//            }
//      })
//     return follower
//    })




// const num1 = Arry_follower[1].TT_follower[0]
// const num2 = Arry_follower[1].TT_follower[1]
// const num3 = Arry_follower[1].TT_follower[2]
// const num4 = Arry_follower[1].TT_follower[3]
// const num5 = Arry_follower[1].TT_follower[4]
// const total = `${num1}${num2}${num3}${num4}`

// console.log(total)

//<-------- ///////////////////////////// --------->

// AIzaSyCkwYerfSCo8euUFuTjU6aveIu6E4tFx8c

//<-------- /// Youtube scraper done /////// --------->

// var youtubeData = require('youtubesubs-count-v1')

//     youtubeData.youtubeSubsFn('UCUnmH8N8k4E7y3dKfCzDKKg','AIzaSyCkwYerfSCo8euUFuTjU6aveIu6E4tFx8c').then((data)=>{
//         console.log(data)
//     }).catch((error)=> {
//         console.log(error)
//     })

//<-------- ///////////////////////////// --------->


//<-------- /// Instagram scraper done /////// --------->

// const Insta = require('scraper-instagram');
// const InstaClient = new Insta();


// const username = 'brandon_baum'
// InstaClient.getProfile(username)
// 	.then(profile => console.log(profile))
// 	.catch(err => console.error(err));

//<-------- ///////////////////////////// --------->

