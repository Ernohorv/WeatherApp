import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Button, TextInput } from 'react-native';
import styles from './style';
import { StackNavigator, } from 'react-navigation';

const API_KEY = "e779919406888af3f3e84022f6154886";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      humidity: 0,
      city: '',
      pressure: 0,
      clouds: 0,
      icon: '',
    }
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.state.city + "&units=metric&appid=" + API_KEY;

    return fetch(url)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          temp: res.main.temp,
          humidity: res.main.humidity,
          pressure: res.main.pressure,
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
          <TextInput style={styles.headerText}
            onChangeText={(city) => this.setState({ city })} />
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

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class weatherApp extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}