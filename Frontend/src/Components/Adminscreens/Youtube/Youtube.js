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
        axios.post("http://localhost:7777/youtube/YT_Post",body).then((res)=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }


    componentDidMount(){
        axios.get("http://localhost:7777/youtube/YT_Getalldata").then(response =>{
            console.log(response.data[0])
            this.setState({
                Youtube_data:response.data
            })
        })
        const token = localStorage.getItem('token')
        console.log(token)
        if(token === null){
            this.props.history.push('/usmandpadmin')
        }
    }
    YTgetdataforedit(){
        axios.get("http://localhost:7777/youtube/YT_Getalldata").then(response =>{
            console.log(response.data[0])
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
        axios.put("http://localhost:7777/youtube/YT_update/"+_id,data).then(response =>{
            console.log(response)
            
        })
        this.componentDidMount()
   
    }




    deleteYTuser(_id){
        console.log(_id)
        axios.delete("http://localhost:7777/youtube/YT_deletedata/"+_id).then(response =>{
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

<div class="container">
                    <div class="row">
                        <div class="col-12">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#YoutubeModal" style={{ backgroundColor: '#FF0000', fontSize: '13px' }} >+ Add User details</button> </th>

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
                                            class="btn btn-success" style={{ width: '50px', marginRight: '20px', marginLeft: '30px' }}><i class="fa fa-edit"></i></button>
                                            <button type="button" onClick={()=>this.deleteYTuser(YT._id)} class="btn btn-danger" style={{ width: '50px', marginRight: '20px' }}><i class="fa fa-trash-alt"></i></button>
                                        </td>
                                    </tr>):
                                    null
                                    }
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="YoutubeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Add Youtube User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{width:70}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                <div class="form-group">
                                        <label for="exampleInputPassword1">Username</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1"
                                         placeholder="Username"
                                         name="YT_Username"
                                         onChange={this.YtChangehandler}
                                         value ={YT_Username}  />
                                        <small id="emailHelp" class="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Channel Id</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="YT_Channalid"
                                        onChange={this.YtChangehandler}
                                        value ={YT_Channalid} 
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">API_Key</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1"
                                         placeholder="ADASDDHAHJNKNJ........"
                                         name="YT_Apikey"
                                         onChange={this.YtChangehandler}
                                         value ={YT_Apikey}  />
                                        <small id="emailHelp" class="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>

                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.YoutubeUserDetails}>Add User</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* for edit modal  */}

                <div class="modal fade" id="UpdateYoutubeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Update Facebook user</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{width:70}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">



                            <form>
                                <div class="form-group">
                                        <label for="exampleInputPassword1">Username</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1"
                                         placeholder="Username"
                                         name="YtUpdateUsername"
                                         onChange={this.YtChangehandler}
                                         value ={YtUpdateUsername}  />
                                        <small id="emailHelp" class="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Channel Id</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="YtUpdateChannal_id"
                                        onChange={this.YtChangehandler}
                                        value ={YtUpdateChannal_id} 
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">API_Key</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1"
                                         placeholder="ADASDDHAHJNKNJ........"
                                         name="YtUpdateApi_key"
                                         onChange={this.YtChangehandler}
                                         value ={YtUpdateApi_key}  />
                                        <small id="emailHelp" class="form-text text-muted">Add FB Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>

                                </form>

                                {/* <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Facebook Username</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1"  
                                        aria-describedby="emailHelp" placeholder="Usmandeveloper.com"
                                        name="FB_UpdateUsername"
                                        // onChange={this.FbChangehandler}
                                        // value ={YtUpdateUsername} 
                                        />
                                        <small id="emailHelp" class="form-text text-muted">Add tiktok Username like https://www.facebook.com/<span style={{color:'red'}}>thedeveloperusman</span> </small>
                                    </div>
                                    {/* <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div> */}
                                {/* </form> */} 

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.YTupdatedata}>Update User</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}