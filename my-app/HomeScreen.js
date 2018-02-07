import React, { Component } from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import ActionButton from 'react-native-action-button';
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';
import DialogComponent from 'react-native-dialog-component/dist/DialogComponent';
import MyListItem from './MyListItem';

export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [
          { key: 'Budapest' },
          { key: 'Los Angeles' },
          { key: 'New York' },
          { key: 'Szeged' },
          { key: 'Sydney' },
          { key: 'San Francisco' },
          { key: 'Tokyo' },
          { key: 'Shanghai' },
        ],
        refresh: false,
      };
    }
    static navigationOptions = {
      title: 'Home',
    };
  
    renderSeparator = () => {
      return (
        <View
          style={{
            height: 0.5,
            width: "100%",
            backgroundColor: "#555"
          }}
        />
      );
    };
    
    render() { 
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            extraData={this.state.refresh}
            renderItem={({ item }) => <MyListItem name={item.key} />}
            keyExtractor={this.key}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <ActionButton 
             buttonColor="rgba(200,20,20,0.8)"
             onPress={() =>{
                DialogManager.show({
                  title: 'Enter the name of the city',
                  titleAlign: 'center',
                  animationDuration: 200,
                  ScaleAnimation: new ScaleAnimation(),
                  children: (
                    <DialogContent>
                      <View>
                        <TextInput 
                          underlineColorAndroid='transparent'
                          style={{color:'red'}}
                          onEndEditing={(key) => this.state.data.push({key})}
                           //this.setState({refresh: !this.state.refresh})
                        />                                                                
                        </View>                   
                    </DialogContent>
                  ),
                }, () => {
                  console.log('callback - show');
                });
              }}>  
          </ActionButton>
        </View>
      );
    }
}