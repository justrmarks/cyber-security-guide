// component to find client IP address and associated
// identifiable information

import React, { Component } from 'react'
import axios from 'axios'

class IpFinder extends Component {
  constructor () {
  super();

//
    this.state = {
      isMobile: true,
      publicIP: '',
      geoCoordinates: {},
      isp: '',
      proxy: false
       }


     }

     componentDidMount() {

       this.setState({isMobile: typeof window.orientation !== "undefined"});


       var ipInfo = {};
       if (!this.isMobile){
         axios.get("http://ip-api.com/json")
            .then(  (response) => {
              console.log(ipInfo);
              ipInfo.publicIP = response.data.query;
              ipInfo.geoCoordinates = {lat: response.data.lat, lon: response.data.lon};
              ipInfo.isp = response.data.isp;
              ipInfo.proxy = response.data.proxy;
            });
            console.log(ipInfo);
            this.setState({ ipInfo })

          }

          }


     render() {
        var template;
       if (this.state.isMobile) {

         template = (
           <h3>
           "You're browsing on a mobile device.."
           </h3>
           // <p> This site and others can only see location data if you approve</p>
         )
       }

       else if (this.state.proxy) {
         template = (

           <h3> You are using a proxy or VPN service </h3>
          // <p> This means your browsing data is more private</p>

         )

       }

       else {
         template = (

         <h3> Your IP addresses exposes information from your Browser</h3> )
       }
       console.log(this.state);

       return <div className=""> {template} </div>;

       }


     }


export default IpFinder;
