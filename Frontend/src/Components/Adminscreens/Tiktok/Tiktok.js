import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios'
import './Tiktok.css'

export default class tiktok extends Component {
    constructor(props){
        super(props);
        this.state={
            Username:'',
            tiktok_data:[],
            TTUpdateUsername:'',
            _id:''
        }
        this.Changehandler = this.Changehandler.bind(this)
        this.TTgetdataforedit = this.TTgetdataforedit.bind(this)
        this.sendUserDetails = this.sendUserDetails.bind(this)
        this.deleteTTuser = this.deleteTTuser.bind(this)
        this.TTupdatedata = this.TTupdatedata.bind(this)
        this.TT_timer = this.TT_timer.bind(this)
    }

    Changehandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    sendUserDetails(){
        const {Username} = this.state
        console.log(Username)
        const body = {
            Username:Username
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Post`,body).then((res)=>{
            console.log('Tiktok Data',res)
            if(res){
                this.componentDidMount()
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Getalldata`).then(response =>{
            // console.log(response.data[0])
            console.log("Tiktok Followers Fetching",response.data[0])
            this.setState({
                tiktok_data:response.data
            })
        })
        const token = localStorage.getItem('token')
        // console.log(token)
        if(token === null){
            this.props.history.push('/usmandpadmin')
        }

        setInterval(this.TT_timer ,125000)
    }

    TTgetdataforedit(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Getalldata`).then(response =>{
            // console.log(response.data[0])
            console.log("Tiktok Followers Fetching",response.data[0])
            this.setState({
                _id: response.data[0]._id,
                TTUpdateUsername : response.data[0].Username
            })
           
        })
        this.componentDidMount()
    }





    TTupdatedata(){
        const { TTUpdateUsername , _id} = this.state
        console.log( TTUpdateUsername, _id)
        const data ={
            Username :  TTUpdateUsername
        }
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Updatedata/`+_id,data).then(response =>{
            console.log(response)
        })
    }
    


    TT_timer(){

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Get`).then(response =>{
            console.log('Running')
        })

    }

    deleteTTuser(_id){
        console.log(_id)
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tiktok/TT_Deletedata/`+_id).then(response =>{
         console.log(response)
         if(response){
             this.setState({
                tiktok_data:[]
             })
             this.componentDidMount()
         }
     })






    }



    render() {
        const {Username, tiktok_data, TTUpdateUsername}=this.state
        return (
            <>
                <Navbar />
                <h1>TIKTOK</h1>


                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#TiktokeModal" style={{ backgroundColor: '#FF0000', fontSize: '13px' }} >+ Add User details</button> </th>

                                    </tr>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Followers</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tiktok_data.length ?
                                   tiktok_data.map(TT =>
                                    <tr key={TT._id}>
                                        <th>{TT.Username}</th>
                                        <td>{TT.Followers}</td>
                                        <td>
                                            <button 
                                            type="button" onClick={()=>this.TTgetdataforedit()} 
                                            data-toggle="modal" data-target="#UpdateYoutubeModal"
                                            className="btn btn-success" style={{ width: '50px', marginRight: '20px', marginLeft: '30px' }}><i className="fa fa-edit"></i></button>
                                            <button type="button" onClick={()=>this.deleteTTuser(TT._id)} className="btn btn-danger" style={{ width: '50px', marginRight: '20px' }}><i className="fa fa-trash-alt"></i></button>
                                        </td>
                                    </tr>):
                                    null
                                    }
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="TiktokeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Tiktok User</h5>
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
                                        <small id="emailHelp" className="form-text text-muted">Add tiktok Username like https://tiktok.com/@<span style={{color:'red'}}>Usmandeveloper</span> </small>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div> */}
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.sendUserDetails}>Add User</button>
                            </div>
                        </div>
                    </div>
                </div>




                {/* for edit modal  */}

                <div className="modal fade" id="UpdateYoutubeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                        <label htmlFor="exampleInputPassword1">Username</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                         placeholder="Username"
                                         name="TTUpdateUsername"
                                         onChange={this.Changehandler}
                                         value ={TTUpdateUsername}  
                                         />
                                        <small id="emailHelp" className="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.TTupdatedata}>Update User</button>
                            </div>
                        </div>
                    </div>
                </div>






















            </>
        )
    }
}