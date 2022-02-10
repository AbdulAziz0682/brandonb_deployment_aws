import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.logout=this.logout.bind(this)
  }

  logout(){
    localStorage.removeItem("token");
  }
    render() {

        return (
            <>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="https://usmandeveloper.com/">Usman developer </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto ">
      <li className="nav-item">
      <NavLink to="/instragram" activeClassName="selected" className="nav-link" >Instagram</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/tiktok" activeClassName="selected" className="nav-link">Tiktok</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/facebook" activeClassName="selected" className="nav-link">Facebook</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/youtube" activeClassName="selected" className="nav-link">Youtube</NavLink>
      </li>
      <li className="nav-item">
      <button className="nav-link btn btn-danger" style={{width:'100px'}} onClick={this.logout} >LOGOUT</button>
      </li>
    </ul>
  </div>
</nav>


            </>
        )
    }
}