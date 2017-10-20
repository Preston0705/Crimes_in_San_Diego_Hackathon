import React, { Component } from "react";
import "./App.css";
import Iframe from "react-iframe";
const axios = require("axios");

var backgroundStyle = {
  background: "linear-gradient(to right,  #007991, #78ffd6)",
  width: "99.99987654321%"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badStuff: [],
      bool: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8484/crimes")
      .then(response => response.data)
      .then(badStuff => this.setState({ badStuff }))
      .then(() => this.setState({ bool: true }))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.bool === true) {
      var latLon = "";
      var rest = "&size=@2x&key=v4qwZ5pC9NQJCLgtUGK83kpwV5Tar6gh";
      var url = "";
      for (var i = 0; i < this.state.badStuff.crimes.length; i++) {
        latLon +=
          this.state.badStuff.crimes[i].lat +
          "," +
          this.state.badStuff.crimes[i].lon +
          "||";
      }
      url =  "https://open.mapquestapi.com/staticmap/v5/map?locations=" + latLon + rest;;
      console.log(latLon + "   latLon");
      console.log(url + "   2");
    } else {
      url =
        "https://open.mapquestapi.com/staticmap/v5/map?locations=32.7157,-117.1611&size=@2x&key=v4qwZ5pC9NQJCLgtUGK83kpwV5Tar6gh";
      console.log(url + "    3");
    }

    return (
      <div className="App container" style={backgroundStyle}>
        <div className="jumbotron text-center" style={backgroundStyle}>
          <h1>
            <strong>
              <u>Crime Maps</u>
            </strong>
          </h1>
          <h2>Break-ins in October</h2>
        </div>
        <br />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-default">
            {console.log("here")}
            {console.log(url)}
            <Iframe
              url={url}
              width="800"
              height="800"
              display="initial"
              position="center"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

