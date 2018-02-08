import React, { Component, PureComponent } from 'react';
import { AsyncStorage, View, Text, FlatList, TextInput, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from './style';
import { Fab, Icon } from 'native-base';

class MyListItem extends PureComponent {
  _onPress = () => {
    this.props.navigation.navigate('Details', { cityName: this.props.name });
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
      data: [],
      refresh: false,
      modalVisible: false,
      temporary: ''
    };
  }

  componentDidMount() {
    try {
      const myArray = AsyncStorage.getItem('WeatherApp@names');
      if (myArray !== null) {
        this.setState({
          data: JSON.parse(myArray),
        });
        console.log("aww yiss");
      }
    } catch (error) {
      console.log("baj van");
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separatorStyle}
      />
    );
  };

  submitHandle() {
    this.closeModal();
    if (this.state.temporary !== '') {
      this.state.data.push({ key: this.state.temporary });
      this.setState({ data: Array.from(new Set(this.state.data.map(JSON.stringify))).map(JSON.parse) });
      this.setState({ refresh: !this.state.refresh });

      AsyncStorage.setItem('WeatherApp@names', JSON.stringify(this.state.data))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!'));
      this.props.navigation.navigate('Details', { cityName: this.state.temporary });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
       
        <FlatList
          data={this.state.data}
          extraData={this.state.refresh}
          renderItem={({ item }) => <MyListItem name={item.key} navigation={this.props.navigation} />}
          keyExtractor={this.key}
          ItemSeparatorComponent={this.renderSeparator} />

        <Modal
          visible={this.state.modalVisible}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
          transparent>

          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>Enter the name of the city</Text>
              <TextInput
                onChangeText={(temporary) => this.setState({ temporary })} />
              <Button
                onPress={() => this.submitHandle()}
                title="Ok">
              </Button>
            </View>
          </View>
        </Modal>
      
        <ActionButton
          buttonColor="rgba(200,20,20,0.8)"
          onPress={() => {
            this.openModal()
          }}>
        </ActionButton>

      </View>
    );
  }
}