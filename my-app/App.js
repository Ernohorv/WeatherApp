import React, { Component, PureComponent } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, Text, View, StatusBar, ImageBackground, Button, TextInput, Modal } from 'react-native';
import styles from './style';
import { StackNavigator, } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import MyListItem from './MyListItem';
import HomeScreen from './HomeScreen';

const API_KEY = "e779919406888af3f3e84022f6154886";

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      humidity: 0,
      pressure: 0,
      clouds: 0,
      icon: '',
    }
    this.getWeather = this.getWeather.bind(this);
    this.getWeather();
  }

  getWeather() {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.props.navigation.state.params.cityName + "&units=metric&appid=" + API_KEY;

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