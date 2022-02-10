import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios'

export default class facebook extends Component {
    constructor(props){
        super(props);
        this.state={
            FB_Username:'',
            Fb_data:[],
            _id:'',
            FB_UpdateUsername:''
        }
        this.FbChangehandler = this.FbChangehandler.bind(this)
        this.FbUserDetails = this.FbUserDetails.bind(this)
        this.Fbgetdataforedit = this.Fbgetdataforedit.bind(this)
        this.Fbupdatedata = this.Fbupdatedata.bind(this)
        this.Fb_timer = this.Fb_timer.bind(this)
    }

FbChangehandler(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

componentDidMount(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Getalldata`).then(response =>{
        console.log('Facebook Followers Fetching',response.data[0])
        this.setState({
           Fb_data:response.data
        })
    })
    setInterval(this.Fb_timer ,180000)

    const token = localStorage.getItem('token')
    // console.log(token)
    if(token === null){
        this.props.history.push('/usmandpadmin')
    }

}
FbUserDetails(){

    const {FB_Username} = this.state
    console.log(FB_Username)
    const body = {
        Username:FB_Username
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Post`,body).then((res)=>{
        console.log(res)
        this.componentDidMount()
    }).catch(error=>{
        console.log(error)
    })

}

Fbgetdataforedit(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Getalldata`).then(response =>{
        console.log(response.data[0])
        this.setState({
            _id: response.data[0]._id,
            FB_UpdateUsername : response.data[0].Username
        })
    })

}
Fbupdatedata(){
    const { FB_UpdateUsername , _id} = this.state
    console.log( FB_UpdateUsername, _id)
    const data ={
        Username :  FB_UpdateUsername
    }
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_update/`+_id,data).then(response =>{
        console.log(response)
    })
}




deletefbuser(_id){
    console.log(_id)
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_delete/`+_id).then(response =>{
     console.log(response)
     if(response){
         this.setState({
            Fb_data:[]
         })
     }
 })
 
     }





    //  /Fb_Getdata
Fb_timer(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/facebook/Fb_Getdata`).then(response =>{
        console.log('Running')
    })
}
    render() {
        const {Fb_data ,FB_Username , FB_UpdateUsername} = this.state
        return (
            <>
<Navbar/>
<h1>Facebook</h1>


{/* usmandeveloper.com */}

<div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#FacebookModal" style={{ backgroundColor: 'lightblue', fontSize: '13px' }} >+ Add User details</button> </th>

                                    </tr>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Followers</th>
                                        <th scope="col">Likes</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fb_data.length ?
                                    Fb_data.map(FB =>
                                    <tr key={FB._id}>
                                        <th>{FB.Username}</th>
                                        <td>{FB.Followers}</td>
                                        <td></td>
                                        <td>
                                            <button 
                                            type="button" onClick={()=>this.Fbgetdataforedit()} 
                                            data-toggle="modal" data-target="#UpdateFacebookModal"
                                            className="btn btn-success" style={{ width: '50px', marginRight: '20px', marginLeft: '30px' }}><i className="fa fa-edit"></i></button>
                                            <button type="button" onClick={()=>this.deletefbuser(FB._id)} className="btn btn-danger" style={{ width: '50px', marginRight: '20px' }}><i className="fa fa-trash-alt"></i></button>
                                        </td>
                                    </tr>):
                                    null
                                    }
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="FacebookModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Facebook User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{width:70}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Username</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="FB_Username"
                                        onChange={this.FbChangehandler}
                                        value ={FB_Username} 
                                        
                                        />
                                        <small id="emailHelp" className="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div> */}
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.FbUserDetails}>Add User</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* for edit modal  */}

                <div className="modal fade" id="UpdateFacebookModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Facebook user</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{width:70}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Facebook Username</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1"  
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="FB_UpdateUsername"
                                        onChange={this.FbChangehandler}
                                        value ={FB_UpdateUsername} 
                                        />
                                        <small id="emailHelp" className="form-text text-muted">Add tiktok Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div> */}
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.Fbupdatedata}>Update User</button>
                            </div>
                        </div>
                    </div>
                </div>













            </>
        )
    }
}