import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import axios from 'axios';

const API_KEY = "2da3b95e31415153dedfffbce6d34349";

export default class weatherApp extends React.Component {

  constructor() {
    super();
    this.state = {
      zipcode: 2351,
      days: [],
    }
  }

  getForecast(zipcode){

    const url ="http://api.openweathermap.org/data/2.5/weather?q=Budapest,mode=json&units=metric&appid="+API_KEY;
  
    axios.get(url).then((response) => {
        if(response.status==200){
          console.log(response.data);
        }
    });
  }
  render() {
    if( this.state.days.length <= 0 ){
      this.getForecast(this.state.zipcode);
    }
    return (
     <View style={styles.container}>
       <StatusBar hidden/>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
