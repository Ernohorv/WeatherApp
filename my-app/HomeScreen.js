import React, { Component, PureComponent } from 'react';
import {View, Text, FlatList, TextInput, Modal, Button, StyleSheet, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from './style';

class MyListItem extends PureComponent {
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
      this.setState({temporary : ''});
      this.props.navigation.navigate('Details');
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