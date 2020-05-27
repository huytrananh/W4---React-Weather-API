import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Loading from './Loading'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      weatherResult : null
    }
  }

  convertToC = (F) => {
    return ((F - 32) * 5 / 9)
  }

  getCurrentWeather = async(lon, lat) => {
    // let apiKey = "242179772c9104148eac38dc4a7d71f0"
    let apiKey = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    let data = await fetch(url)
    let result = await data.json()
    console.log("The result is: ", result)
    this.setState({weatherResult : result})
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  getCity = async(city) => {
    let apiKey = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    let data = await fetch(url)
    let result = await data.json()
    console.log("The result is: ", result)
    this.setState({weatherResult : result})
  }

  componentDidMount(){
    console.log("Open your app already")
    this.getLocation()
  }

  render() {
    if(this.state.weatherResult == null){
      return (<Loading type="spin" color="red"></Loading>)
    }
    return (
      <div className="body-page">
        <div className="row nav-bar">
          <div className="col-1 text-center"><h3>Weather</h3></div>
          <div className="col-10 text-center">
            <input type="text" placeholder="Search City" className="mr-sm-2 input-box"/>
          </div>
          <div className="col-1 text-center"><a href="#features">Setting</a></div>
        </div>
        <div className="container">
          <div className="row top-section">
            <p className="text-center">Welcome to Weather. News Here you can find the best weather's news uploaded by our community. Support us by sharing the content, upvoting news on the page or sending your own weather location.</p>
            <a href="#">See more</a>
          </div>
          <div className="row middle-section">
              <div className="col-3 LRcolumn" >
                <button className="button" onClick={() => this.getCity("Vietnam")}>Viet Nam</button>
                <button className="button" onClick={() => this.getCity("Laos")}>Laos</button>
                <button className="button" onClick={() => this.getCity("Thailand")}>Thailand</button>
                <button className="button" onClick={() => this.getCity("Cambodia")}>Cambodia</button>
                <button className="button" onClick={() => this.getCity("Indonesia")}>Indonesia</button>
                <button className="button" onClick={() => this.getCity("Korea")}>Korea</button>
                <button className="button" onClick={() => this.getCity("China")}>China</button>
                <button className="button" onClick={() => this.getCity("Japan")}>Japan</button>
                <button className="button" onClick={() => this.getCity("India")}>India</button>
                <button className="button" onClick={() => this.getCity("Australia")}>Australia</button>
                <button className="button" onClick={() => this.getCity("Myanmar")}>Myanmar</button>
                <button className="button" onClick={() => this.getCity("Manila")}>Manila</button>
                <button className="button" onClick={() => this.getCity("Pakistan")}>Pakistan</button>
                <button className="button" onClick={() => this.getCity("Iran")}>Iran</button>   
              </div>   
              <div className="col-6 middle-column">
                <h1>Weather APP</h1>
                <h2>{this.state.weatherResult.name}</h2>
                <h4>{Math.floor(this.state.weatherResult.main.temp)}ºF / {Math.floor(this.convertToC(this.state.weatherResult.main.temp))} ºC </h4>
                <h4>{this.state.weatherResult.weather[0].description}</h4>
                {/* <Button variant="primary"> Primary</Button>{' '} */}
              </div>
              <div className="col-3 LRcolumn" >
                <button className="button" onClick={() => this.getCity("America")}>US</button>
                <button className="button" onClick={() => this.getCity("England")}>UK</button>
                <button className="button" onClick={() => this.getCity("Mexico")}>Mexico</button>
                <button className="button" onClick={() => this.getCity("Miami")}>Miami</button>
                <button className="button" onClick={() => this.getCity("Brazil")}>Brazil</button>
                <button className="button" onClick={() => this.getCity("Greece")}>Greece</button>
                <button className="button" onClick={() => this.getCity("Spain")}>Spain</button>
                <button className="button" onClick={() => this.getCity("France")}>France</button>
                <button className="button" onClick={() => this.getCity("Turkey")}>Turkey</button>
                <button className="button" onClick={() => this.getCity("Italy")}>Italy</button>
                <button className="button" onClick={() => this.getCity("Libya")}>Libya</button>
                <button className="button" onClick={() => this.getCity("Romania")}>Romania</button>
                <button className="button" onClick={() => this.getCity("Ukraine")}>Ukraine</button>
                <button className="button" onClick={() => this.getCity("Belarus")}>Belarus</button>  
              </div>
          </div>
          <div className="row bottom-section">
            <p className="bottom-text">Made by COVID-19</p>
          </div>
        </div>
      </div>
    )
  }
}
