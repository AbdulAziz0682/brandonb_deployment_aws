import React from 'react';
import Content from './Components/Userscreens/content/Content';
import {BrowserRouter ,Route,Switch} from 'react-router-dom'
import login from './Components/Adminscreens/login';
import All_scraper from './Components/Adminscreens/Dashboard/Dashboard';
import facebook from './Components/Adminscreens/Facebook/Facebook';
import instagram from './Components/Adminscreens/Instagram/Instagram';
import Youtube from './Components/Adminscreens/Youtube/Youtube';
import tiktok from './Components/Adminscreens/Tiktok/Tiktok';

function App() {
  return (


      <BrowserRouter>    

       <Switch>
         <Route path="/" exact component={Content}/>

         <Route path="/usmandpadmin" component={login}/>
         <Route path="/dashboard" component={All_scraper}/>
         <Route path="/facebook" component={facebook}/>
         <Route path="/instragram" component={instagram}/>
         <Route path="/youtube" component={Youtube}/>
         <Route path="/tiktok" component={tiktok}/>
       </Switch>
      </BrowserRouter>
  );
}

export default App;
