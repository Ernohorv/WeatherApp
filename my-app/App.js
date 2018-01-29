import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Button } from 'react-native';
import axios from 'axios';
import  styles from './style';

const API_KEY = "80daae3f0da767e7a33825538591a636";

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

    let url = "http://api.openweathermap.org/data/2.5/weather?q=Budapest,mode=json&units=metric&appid=" + API_KEY;

    axios.get(url).then(function (response) {

      if(response.status == 200){
    console.log(response.data.main.temp);
    this.setState({
       temp:JSON.stringify(result.data.main.temp),
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

      <View style={styles.viewStyle}>
      <Button
      onPress={this.getWeather}
      title = 'Refresh'>
      </Button>
      </View>

       </ImageBackground>
    );
  }
}