import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios'
export default class Youtube extends Component {
    constructor(props){
        super(props);
        this.state={
            YT_Apikey:'',
            YT_Username:'',
            Youtube_data:[],
            _id:'',
            YtUpdateUsername:'',
            YT_Channalid:'',
            YtUpdateChannal_id:'',
            YtUpdateApi_key:'',
        }
        this.YtChangehandler = this.YtChangehandler.bind(this)
        this.YoutubeUserDetails = this.YoutubeUserDetails.bind(this)
        this.YTgetdataforedit = this.YTgetdataforedit.bind(this)
        this.YTupdatedata = this.YTupdatedata.bind(this)
        this.deleteYTuser = this.deleteYTuser.bind(this)
    }

    YtChangehandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    YoutubeUserDetails(){
        const { YT_Username , YT_Apikey, YT_Channalid} = this.state
        console.log( YT_Username , YT_Apikey , YT_Channalid)
        const body = {
            Channal_id: YT_Channalid,
            Api_key:YT_Apikey,
            Username : YT_Username
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_Post`,body).then((res)=>{
            console.log(res)
            this.componentDidMount()
        }).catch(error=>{
            console.log(error)
        })
    }


    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_Getalldata`).then(response =>{
            console.log('Youtube Followers Fetching',response.data[0])
            this.setState({
                Youtube_data:response.data
            })
        })
        const token = localStorage.getItem('token')
        // console.log(token)
        if(token === null){
            this.props.history.push('/usmandpadmin')
        }
    }
    YTgetdataforedit(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_Getalldata`).then(response =>{
            console.log('Youtube Followers Fetching',response.data[0])
            this.componentDidMount()
            this.setState({
                _id: response.data[0]._id,
                YtUpdateChannal_id: response.data[0].Channal_id,
                YtUpdateApi_key: response.data[0].Api_key,
                YtUpdateUsername : response.data[0].Username
            })
           
        })
        this.componentDidMount()
    }
    YTupdatedata(){
        const {  YtUpdateUsername ,  YtUpdateChannal_id, YtUpdateApi_key, _id} = this.state
        console.log(  YtUpdateUsername , YtUpdateChannal_id , YtUpdateApi_key, _id)
        const data ={
            Channal_id: YtUpdateChannal_id,
            Api_key:YtUpdateApi_key,
            Username : YtUpdateUsername
        }
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_update/`+_id,data).then(response =>{
            console.log(response)
            this.componentDidMount()
        })
   
    }




    deleteYTuser(_id){
        console.log(_id)
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/youtube/YT_deletedata/`+_id).then(response =>{
         console.log(response)
         if(response){
             this.setState({
                Fb_data:[]
             })
             this.componentDidMount()
         }
     })
     
         }

    render() {
        const { YT_Username , YT_Apikey , YT_Channalid, Youtube_data, YtUpdateChannal_id,  YtUpdateUsername, YtUpdateApi_key} = this.state
        return (
            <>
<Navbar/>
<h1>Youtubee</h1>


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
                                        <th> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#YoutubeModal" style={{ backgroundColor: '#FF0000', fontSize: '13px' }} >+ Add User details</button> </th>

                                    </tr>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Channal ID</th>
                                        <th scope="col">Api_key</th>
                                        <th scope="col">Total Followers</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Youtube_data.length ?
                                   Youtube_data.map(YT =>
                                    <tr key={YT._id}>
                                        <th>{YT.Username}</th>
                                        <td>{YT.Channal_id}</td>
                                        <td>{YT.Api_key}</td>
                                        <td>{YT.Subscriber}</td>
                                        <td>
                                            <button 
                                            type="button" onClick={()=>this.YTgetdataforedit()} 
                                            data-toggle="modal" data-target="#UpdateYoutubeModal"
                                            className="btn btn-success" style={{ width: '50px', marginRight: '20px', marginLeft: '30px' }}><i className="fa fa-edit"></i></button>
                                            <button type="button" onClick={()=>this.deleteYTuser(YT._id)} className="btn btn-danger" style={{ width: '50px', marginRight: '20px' }}><i className="fa fa-trash-alt"></i></button>
                                        </td>
                                    </tr>):
                                    null
                                    }
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="YoutubeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Youtube User</h5>
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
                                         name="YT_Username"
                                         onChange={this.YtChangehandler}
                                         value ={YT_Username}  />
                                    <small id="emailHelp" className="form-text text-muted">Add YT Username like https://www.youtube.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div className="form-group">
                                        <label  htmlFor="exampleInputEmail1">Channel Id</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="YT_Channalid"
                                        onChange={this.YtChangehandler}
                                        value ={YT_Channalid} 
                                        />
                                          <small id="emailHelp" className="form-text text-muted">Add YT Channal Id like https://www.youtube.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div className="form-group">
                                        <label  htmlFor="exampleInputPassword1">API_Key</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                         placeholder="ADASDDHAHJNKNJ........"
                                         name="YT_Apikey"
                                         onChange={this.YtChangehandler}
                                         value ={YT_Apikey}  />
                                     <small id="emailHelp" className="form-text text-muted">Add YT Api key like https://www.console.google.com/<span style={{color:'red'}}>APIKey</span> </small>
                                    </div>

                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.YoutubeUserDetails}>Add User</button>
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
                                        <label  htmlFor="exampleInputPassword1">Username</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                         placeholder="Username"
                                         name="YtUpdateUsername"
                                         onChange={this.YtChangehandler}
                                         value ={YtUpdateUsername}  />
                                        <small id="emailHelp" className="form-text text-muted">Add YT Username like https://www.youtube.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div className="form-group">
                                        <label  htmlFor="exampleInputEmail1">Channel Id</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="YtUpdateChannal_id"
                                        onChange={this.YtChangehandler}
                                        value ={YtUpdateChannal_id} 
                                        />
                                          <small id="emailHelp" className="form-text text-muted">Add YT Channal Id like https://www.youtube.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div className="form-group">
                                        <label  htmlFor="exampleInputPassword1">API_Key</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                         placeholder="ADASDDHAHJNKNJ........"
                                         name="YtUpdateApi_key"
                                         onChange={this.YtChangehandler}
                                         value ={YtUpdateApi_key}  />
                                        <small id="emailHelp" className="form-text text-muted">Add YT Api key like https://www.console.google.com/<span style={{color:'red'}}>APIKey</span> </small>
                                    </div>

                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.YTupdatedata}>Update User</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}