import React, { Component } from 'react';
import {View, Text, FlatList, TextInput, Modal, Button, StyleSheet, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';
import DialogComponent from 'react-native-dialog-component/dist/DialogComponent';
import MyListItem from './MyListItem';
import styles from './style';

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
        modalVisible: false,
        temporary: ''
      };
    }
    static navigationOptions = {
      title: 'Home',
    };
  
    openModal() {
      this.setState({modalVisible:true});
    }
  
    closeModal() {
      this.setState({modalVisible:false});
    }

    renderSeparator = () => {
      return (
        <View
          style={styles.separatorStyle}
        />
      );
    };

    submitHandle(){
      this.closeModal();
      this.setState({refresh: !this.state.refresh});
      this.state.data.push({key : this.state.temporary});
    }
    
    render() { 
      return (
        <View style={{ flex: 1 }}>

          <FlatList
            data={this.state.data}
            extraData={this.state.refresh}
            renderItem={({ item }) => <MyListItem name={item.key} />}
            keyExtractor={this.key}
            ItemSeparatorComponent={this.renderSeparator}/>
          
           <Modal
              visible={this.state.modalVisible}
              animationType={'fade'}
              onRequestClose={() => this.closeModal()}>

            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>Enter the name of the city</Text>        
                <TextInput
                  underlineColorAndroid='transparent'
                  onChangeText={(temporary) => this.setState({ temporary })}/>                
                <Button
                    onPress={() => this.submitHandle()}
                    title="Ok">
                </Button>
              </View>            
            </View>           
          </Modal>

          <ActionButton 
             buttonColor="rgba(200,20,20,0.8)"
             onPress={() =>{
              this.openModal()}}>  
          </ActionButton>

        </View>
      );
    }
}