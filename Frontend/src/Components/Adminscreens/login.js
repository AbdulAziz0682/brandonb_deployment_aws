import React, { Component } from 'react';
import './login.css'

export default  class login extends Component{
  constructor(props){
    super(props)
    this.state ={
      token : 'Usmandeveloper.com+923322080808+923365999000usmanfullstackdeveloperanddesigner',
      Email:'',
      Password :''
    }
    this.loginsubmit = this.loginsubmit.bind(this)
    this.changehandler = this.changehandler.bind(this)

  }


  changehandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginsubmit(){
    const {Email,Password,token} = this.state
    // console.log(Email,Password)
    if(Email === 'Thedeveloperusman@gmail.com' && Password === 'PHonesty1998'){
      localStorage.setItem ('token',token)
      const checking = localStorage.getItem('token')
      console.log(checking)
      if (checking === token){
        this.props.history.push("/instragram")

 
      }
    }else {
      alert('*WARNING* *WARNING* *WARNING* *WARNING* *WARNING* Please add correct information otherwise your system will be crashed after 10 minutes if you have no information please close this window otherwise your system will be crash and we will release the viruses Thanks')
    }
  }

    
render(){

const {Email,Password} = this.state

    return (
    <>
    <div className="roto">
      <div className="mainlogin">
        <img src={'Green and black logo.png'} className="logo" alt="Business view - Reports" />
        <p>www.usmandeveloper.com</p>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="Email" value={Email} placeholder="nome@email.com.br" onChange={this.changehandler}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="Password" name="Password" value={Password} onChange={this.changehandler}/>
          </div>
          <button className="primary" onClick={this.loginsubmit}>Login</button>

      </div>
      </div>
    </>
    )
}
}
