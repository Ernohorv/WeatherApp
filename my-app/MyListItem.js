import React, { Component, PureComponent } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class MyListItem extends PureComponent {
    _onPress = () => {
      Alert.alert(this.props.name);
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