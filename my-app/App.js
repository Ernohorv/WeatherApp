import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import axios from 'axios';
import  styles from './style';
const API_KEY = "f1779fbd5b8a64760a48bcc2a9137295";

export default class weatherApp extends React.Component {

  constructor() {
    super();
    this.state = {
      days : [],
      temp : 0,
      humidity: 0
      
    }
  }

  getForecast(zipcode){

    const url ="http://api.openweathermap.org/data/2.5/weather?q=Budapest,mode=json&units=metric&appid="+API_KEY;
  
    axios.get(url).then((response) => {
        if(response.status==200){
          //console.log(response.data);
          var weather = [];
          weather['temp'] = JSON.stringify(response.data.main.temp);
          weather['humidity'] = JSON.stringify(response.data.main.humidity);
          console.log(weather['temp']);
          //alert(weather['temp']);
         this.setState({temp: weather['temp']});
         this.setState({humidity: weather['humidity']});
        }
    });
  }
  render() {
    if(this.state.days.length <= 0){
      this.getForecast(this.state.days);
    }

    return (
      <ImageBackground 
        source={require('./maxresdefault.jpg')}
        style={styles.container}>
    
     <View style={styles.header}>
        <Text style={styles.headerText}>Budapest</Text>
     </View>

     <View style={styles.viewStyle}>  
       <Text style={styles.viewText}>Temperature: </Text>
       <Text style={styles.viewText}>{this.state.temp}</Text>
      </View>

      <View style={styles.viewStyle}>
      <Text style={styles.viewText}>Humidity: </Text>
      <Text style={styles.viewText}>{this.state.humidity}</Text> 
      </View>

       </ImageBackground>
    );
  }
}