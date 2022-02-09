import React from 'react';
import axios from 'axios';
import YoutubeIcon from "./../../assests/YT.png";
import FacebookIcon from "./../../assests/FB.png";
import TikTokIcon from "./../../assests/TT.png";
import BrandLogo from "./../../assests/BB_logo.png";
import InstaIcon from "./../../assests/IN.png";
import './Content.css'
export default class Content extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            yt_followers :'',
            tk_followers :'',
            fb_followers :'',
            in_followers :'',
            t_followers:'',
        }
        this.YT_F = this.YT_F.bind(this)
        this.FB_F = this.FB_F.bind(this)
        this.TK_F = this.TK_F.bind(this)
        this.IN_F = this.IN_F.bind(this)
        this.Total_F = this.Total_F.bind(this)
        this.Yt_timer = this.Yt_timer.bind(this)
        this.IN_timer = this.IN_timer.bind(this)
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {

       /// Youtube timer function (9 minutes)
        setInterval(this.YT_F ,540000)
        /// Instagram timer function (12 minutes)
        setInterval(this.IN_F ,720000)

         /// Tiktok timer function (15 minutes)
        setInterval(this.TK_F ,900000)
         /// Facebook timer function (19 minutes)
        setInterval(this.FB_F ,1140000)
        /// Total followers counter timer (3 minute 30 sec)
        setInterval(this.Total_F , 198000)

        this.YT_F()
        this.FB_F()
        this.TK_F()
        this.IN_F()
        this.Total_F()

        /// Youtube timer function (8 minutes)
        setInterval(this.Yt_timer ,480000)

        /// Instagram timer function (11 minutes)
        setInterval(this.IN_timer ,660000)
        
        /// Tiktok timer function (14 minutes)
        setInterval(this.TT_timer ,840000)

        /// Facebook timer function (18 minutes)
        setInterval(this.Fb_timer ,1080000)
        
      }
    
     YT_F() {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_Getalldata`).then((response)=>{
            // console.log(parseInt( response.data[0].Subscriber))
            const yt_data = parseInt( response.data[0].Subscriber)
            if(yt_data){
                this.setState({ yt_followers:yt_data})
            }else{
            }
        })
      }

      FB_F() {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Getalldata`).then((response)=>{
   
            const fb_data = parseInt(response.data[0].Followers)
            if(fb_data){
                this.setState({ fb_followers : fb_data})
            }else{
            }
        })
      }

      TK_F(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Getalldata`).then((response)=>{
         
            const tk_data = parseInt(response.data[0].Followers)
            if(tk_data){
                this.setState({ tk_followers : parseInt(tk_data)})
            }else{
            }
        })
      }

      IN_F(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/instagram/In_Getalldata`).then((response)=>{
           
            const in_data = parseInt(response.data[0].Followers)
            if(in_data){
                this.setState({ in_followers : in_data})
            }else{
            }
        })
      }

      Total_F(){

        const {yt_followers,fb_followers , tk_followers , in_followers} = this.state

        const Total_followers = yt_followers + fb_followers + tk_followers +in_followers
        console.log(Total_followers)


        var units = ["Million","Billion","Trillion","Quintillion"]
        var unit = Math.floor((Total_followers / 1.0e+1).toFixed(0).toString().length)
        var r = unit%3
        var x =  Math.abs(Number(Total_followers))/Number('1.0e+'+(unit-r)).toFixed(2)
        this.setState({t_followers:x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]})
      }
    





      /////// Timer functions for a updates

      Yt_timer(){

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_Get`).then(response =>{
            console.log('Youtube Running')
        })

    }



    IN_timer(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/instagram/In_Get`).then(response =>{
            console.log('Running')
        })
    }



    TT_timer(){

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Get`).then(response =>{
          console.log('Running')
      })

  }


  Fb_timer(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Getdata`).then(response =>{
        console.log('Running')
    })
}


    render() {
        const {
            // yt_followers,fb_followers , tk_followers , in_followers,
            t_followers} = this.state
        return (
     

<div className="content_container">
      <div className="socialIconsSec">
        <a href="https://www.youtube.com/channel/UCUnmH8N8k4E7y3dKfCzDKKg" className="socialIconBox" target={'_blank'}>
          <img src={YoutubeIcon} className="yotubeIcon" alt="" />
        </a>
        <a href="https://www.facebook.com/brandnbaum?_rdc=2&_rdr" className="socialIconBox" target={'_blank'}>
          <img src={FacebookIcon} className="facebookIcon" alt="" />
        </a>
        <a href="https://www.tiktok.com/@brandonb" className="socialIconBox" target={'_blank'}>
          <img src={TikTokIcon} className="socialIcon" alt="" />
        </a>
        <a href="https://www.instagram.com/brandon_baum/" className="socialIconBox" target={'_blank'}>
          <img src={InstaIcon} className="instaIcon" alt="" />
        </a>
      </div>
      <div className="milionLogoSec">
        <p className="followers_count">{t_followers} Followers</p>
      </div>
      <div className="logoSec">
        <img src={BrandLogo} className="bblogo" alt="" />
      </div>
      <div className="mark">
        <a href="https://usmandeveloper.com/" target={'_blank'}><span className="U">?</span></a>
      </div>
    </div>


        )
    }
}