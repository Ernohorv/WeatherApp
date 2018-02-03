import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Button, TextInput } from 'react-native';
import axios from 'axios';
import  styles from './style';

const API_KEY = "e779919406888af3f3e84022f6154886";
const url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=" + API_KEY;

export default class weatherApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temp : 0,
      humidity: 0,
      city: '',
      pressure: 0,
      clouds: 0,
      icon: '',
    }
    this.getWeather = this.getWeather.bind(this); 
  }
  
  getWeather(){

    return fetch(url)
      .then((response) => response.json()) 
        .then((res) => {
          this.setState({
            temp: res.main.temp,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            city: res.name,
            clouds: res.clouds.all,
        })
      }
    );
   }

  render() {

    return (
      <ImageBackground 
        source={require('./maxresdefault.jpg')}
        style={styles.container}>
    
     <View style={styles.header}>
        <Text style={styles.headerText}>{this.state.city}</Text>
     </View>

     <View style={styles.viewStyle}>  
       <Text style={styles.viewText}>Temperature: </Text>
       <Text style={styles.viewText}>{this.state.temp} °</Text>
      </View>

      <View style={styles.viewStyle}>
        <Text style={styles.viewText}>Humidity: </Text>
        <Text style={styles.viewText}>{this.state.humidity} </Text>
      </View>

      <View style={styles.viewStyle}>
        <Text style={styles.viewText}>Pressure: </Text>
        <Text style={styles.viewText}>{this.state.pressure} Pa</Text>
      </View>

      <View style={styles.viewStyle}>
        <Text style={styles.viewText}>Clouds: </Text>
        <Text style={styles.viewText}>{this.state.clouds} </Text>
      </View>
      
      <View style={styles.viewStyle}>
        <Button 
          style={styles.buttonStyle} 
          title='Refresh'
          onPress={this.getWeather}>
          </Button>
      </View>

       </ImageBackground>
    );
  }
}