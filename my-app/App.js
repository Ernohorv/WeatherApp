import React, { Component, PureComponent } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, StatusBar, ImageBackground, TextInput, Modal, DeviceEventEmitter, NativeModules, Button } from 'react-native';
import styles from './style';
import { StackNavigator, } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import MyListItem from './MyListItem';
import HomeScreen from './HomeScreen';
import { Container, Header, Input, Text, Content, Card, CardItem, Body } from 'native-base';

const API_KEY = "e779919406888af3f3e84022f6154886";
var mSensorManager = require('NativeModules').SensorManager;

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
      icon: '',
      city: '',
      description: ''
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
          city: res.name,
          icon: res.weather[0].icon,
          description: res.weather[0].description
        })
      }
      );
  }

  render() {
    return (
     
        <Container>
          <Header>
             <Text>{this.state.city}</Text>       
          </Header>

            <Content>

            <Card>
              <CardItem>
                   <Text>Temperature: </Text>
                   <Text>{this.state.temp} °</Text>               
              </CardItem>
              </Card>

              <Card>
              <CardItem>                
                   <Text>Humidity: </Text>
                   <Text>{this.state.humidity} </Text>              
              </CardItem>
            </Card>

            <Card>
              <CardItem>                
                <Text>Pressure: </Text>
                <Text>{this.state.pressure} Pa</Text>             
              </CardItem>
            </Card>

            <Card>
              <CardItem>                
                <Text>Description: </Text>
                <Text>{this.state.description} </Text>           
              </CardItem>
            </Card>
            
            <Button
            onPress={this.getWeather
            } title="Refresh">
           
          </Button>

            </Content>          
        </Container>
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