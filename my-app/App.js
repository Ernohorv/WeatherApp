import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import axios from 'axios';
import  styles from './style';
const API_KEY = "4aa93ae05f4ec9a99aaea662e565bd86";

export default class weatherApp extends React.Component {

  constructor() {
    super();
    this.state = {
      temp : 0,
      days : [],
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
    
    weather = [];
    //weather['temp'] = this.state.wet;
    //weather['temp'] = JSON.stringify(response.data.main.temp);
    return (
     <View style={styles.container}>
       <StatusBar hidden/>
       <Text>{this.state.temp}</Text>
       <Text>{this.state.humidity}</Text>
       </View>
    );
  }
}