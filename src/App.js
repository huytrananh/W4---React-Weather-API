import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      weatherResult : null
    }
  }

  getCurrentWeather = async(lon, lat) => {
    // let apiKey = "242179772c9104148eac38dc4a7d71f0"
    let apiKey = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
      return (<div>Loading</div>)
    }
    return (
      <div className="">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Weather</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        
        <Container>
          <Row>
            <Col-2 >
              <div className="left">
                  <button onClick={() => this.getCity("Vietnam")}>Ho chi minh</button>
                  <button onClick={() => this.getCity("Paris")}>Paris</button>
                  <button onClick={() => this.getCity("New York")}>New York</button>
                  <button onClick={() => this.getCity("Miami")}>Miami</button>
                  <button onClick={() => this.getCity("San Francisco")}>San Francisco</button>
                  <button onClick={() => this.getCity("Moscow")}>Moscow</button>
                  <button onClick={() => this.getCity("Tokyo")}>Tokyo</button>`
                </div>
            </Col-2>
            <Col-10>
              <div className="right">
                <h1>Weather APP</h1>
                <h1>{this.state.weatherResult.name}</h1>
                <h1>{this.state.weatherResult.main.temp}C</h1>
                <h1>{this.state.weatherResult.weather[0].description}</h1>
                <Button variant="primary"> Primary</Button>{' '}
              </div>
            </Col-10>
          </Row>
        </Container>

        
        
      </div>
    )
  }
}
