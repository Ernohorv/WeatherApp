import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import axios from 'axios';
import  styles from './style';
import fetchWeather from './api'

const API_KEY = "6aa351323e5575ba4f0dc69f03dbd235";

export default class weatherApp extends React.Component {

  constructor() {
    super();
    this.state = {
      temp : 0,
      humidity: 0,
      city: 'Budapest',
      pressure: 0,
      windSpeed: '',
      clouds: '',
      icon: '',
      days: []
    }
  }

  getWeather(){

    //const url ="http://api.openweathermap.org/data/2.5/weather?q=Budapest,mode=json&units=metric&appid="+API_KEY;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=Budapest,mode=json&units=metric&appid=" + API_KEY;
  
    axios.get(url).then((response) => {

      if(response.status == 200){
     // console.log(JSON.stringify(response.data));
      
     
      var weather = [];
      weather['temp'] = JSON.stringify(response.data.main.temp);

        this.setState({
          temp: weather['temp'],
          humidity: JSON.stringify(response.data.main.humidity),
          pressure: JSON.stringify(response.data.main.pressure),
          windSpeed: JSON.stringify(response.data.wind.speed),
          clouds: JSON.stringify(response.data.clouds.all),
          icon: JSON.stringify(response.data.weather.icon)
        });
      }
    });
     
          
  }
  render() {
    if(this.state.days.length <=0)
      this.getWeather(this.state.city);
    
    return (
      <ImageBackground 
        source={require('./maxresdefault.jpg')}
        style={styles.container}>
    
     <View style={styles.header}>
        <Text style={styles.headerText}>Budapest</Text>
     </View>

     <View style={styles.viewStyle}>  
       <Text style={styles.viewText}>Temperature: </Text>
       <Text style={styles.viewText}>{this.state.temp} °</Text>
      </View>

      <View style={styles.viewStyle}>
      <Text style={styles.viewText}>Humidity: </Text>
      <Text style={styles.viewText}>{this.state.humidity}</Text> 
      </View>

      <View style={styles.viewStyle}>
      <Text style={styles.viewText}>Pressure: </Text>
      <Text style={styles.viewText}>{this.state.pressure}</Text> 
      </View>

      <View style={styles.viewStyle}>
      <Text style={styles.viewText}>Wind speed: </Text>
      <Text style={styles.viewText}>{this.state.windSpeed} km/h</Text> 
      </View>

      <View style={styles.viewStyle}>
      <Text style={styles.viewText}>Clouds: </Text>
      <Text style={styles.viewText}>{this.state.clouds} %</Text> 
      </View>

       </ImageBackground>
    );
  }
}