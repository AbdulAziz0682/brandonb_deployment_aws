import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios'

export default class instagram extends Component {

    constructor(props){
        super(props);
        this.state={
            Username:'',
            Insta_data:[],
            _id:'',
            UpdateUsername:''
        }
        this.Changehandler = this.Changehandler.bind(this)
        this.InstaUserDetails = this.InstaUserDetails.bind(this)
        this.getdataforedit = this.getdataforedit.bind(this)
        this.updatedata = this.updatedata.bind(this)
    }

    Changehandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    InstaUserDetails(){
        const {Username} = this.state
        console.log(Username)
        const body = {
            Username:Username
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/Instagram/In_Post`,body).then((res)=>{
            console.log('Data:',res)
            this.componentDidMount()
        }).catch(error=>{
            console.log(error)
        })
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/Instagram/In_Getalldata`).then(response =>{
            console.log("Instagram Followers Fetching",response.data[0])
            this.setState({
                Insta_data:response.data
            })
        })

        const token = localStorage.getItem('token')
        // console.log(token)
        if(token === null){
            this.props.history.push('/usmandpadmin')
        }

  

    }

    getdataforedit(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/Instagram/In_Getalldata`).then(response =>{
            // console.log(response.data[0])
            console.log("Instagram Followers Fetching",response.data[0])
            this.setState({
                _id: response.data[0]._id,
                UpdateUsername :response.data[0].Username
            })
        })
    }

    updatedata(){
        const {UpdateUsername , _id} = this.state
        // console.log(UpdateUsername , _id)
        const data ={
            Username : UpdateUsername
        }
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/Instagram/In_update/`+_id,data).then(response =>{
            console.log(response)
            this.componentDidMount()
        })

    }

    deleteinstauser(_id){
//    console.log(_id)
   axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Instagram/In_delete/`+_id).then(response =>{
    console.log('Data Deleted')
    if(response){
        this.setState({
            Insta_data:[]
        })
    }
})

    }



    render() {

        const {Username,Insta_data, UpdateUsername}=this.state
        return (
            <>
<Navbar/>
<h1>Instagram</h1>

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
                                        <th> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#InstagramModal" style={{ backgroundColor: '#8a3ab9', fontSize: '13px' }} >+ Add User details</button> </th>

                                    </tr>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Followers</th>
                                        <th scope="col">Likes</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Insta_data.length ?
                                    Insta_data.map(insta =>
                                    <tr key={insta._id}>
                                        <th>{insta.Username}</th>
                                        <td>{insta.Followers}</td>
                                        <td></td>
                                        <td>
                                            <button 
                                            type="button" onClick={()=>this.getdataforedit()} 
                                            data-toggle="modal" data-target="#UpdateInstagramModal"
                                            className="btn btn-success" style={{ width: '50px', marginRight: '20px', marginLeft: '30px' }}><i className="fa fa-edit"></i></button>
                                            <button type="button" onClick={()=>this.deleteinstauser(insta._id)} className="btn btn-danger" style={{ width: '50px', marginRight: '20px' }}><i className="fa fa-trash-alt"></i></button>
                                        </td>
                                    </tr>):
                                    null
                                    }
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="InstagramModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Instagram User</h5>
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
                                        name="Username"
                                        onChange={this.Changehandler}
                                        value ={Username} />
                                        <small id="emailHelp" className="form-text text-muted">Add tiktok Username like https://www.instagram.com/<span style={{color:'red'}}>developerusman</span> </small>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.InstaUserDetails}>Add User</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* for edit modal  */}

                <div className="modal fade" id="UpdateInstagramModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Instagram user data</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{width:70}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Instagram Username</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="UpdateUsername"
                                        onChange={this.Changehandler}
                                        value ={UpdateUsername} />
                                        <small id="emailHelp" className="form-text text-muted">Add tiktok Username like https://www.instagram.com/<span style={{color:'red'}}>developerusman</span> </small>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div> */}
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.updatedata}>Update User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}