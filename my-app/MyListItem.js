import React, { Component, PureComponent } from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {StackNavigator, } from 'react-navigation'; 
import weatherApp from "./HomeScreen";
export default class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.navigation.navigate('Details');
    };
  
    render() {
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text style={{ fontSize: 30 }}>
              {this.props.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }