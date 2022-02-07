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

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="https://usmandeveloper.com/">Usman developer </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item">
      <NavLink to="/instragram" activeClassName="selected" class="nav-link">Instagram</NavLink>
      </li>
      <li class="nav-item">
      <NavLink to="/tiktok" activeClassName="selected" class="nav-link">Tiktok</NavLink>
      </li>
      <li class="nav-item">
      <NavLink to="/facebook" activeClassName="selected" class="nav-link">Facebook</NavLink>
      </li>
      <li class="nav-item">
      <NavLink to="/youtube" activeClassName="selected" class="nav-link">Youtube</NavLink>
      </li>
      <li class="nav-item">
      <button class="nav-link btn btn-danger" style={{width:'100px'}} onClick={this.logout} >LOGOUT</button>
      </li>
    </ul>
  </div>
</nav>


            </>
        )
    }
}