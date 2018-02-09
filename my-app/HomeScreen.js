import React, { Component, PureComponent } from 'react';
import { AsyncStorage, View, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from './style';
import { Fab, Icon, Container, Header, Input, Text, Content, Card, CardItem, Body, Button, Form, Item, Label } from 'native-base';

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
      temporary: '',
      active: 'true'
    };
  }

  async componentDidMount() {
    try {
      const myArray = await AsyncStorage.getItem('WeatherApp@names');
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
      <Container>
        <FlatList
          data={this.state.data}
          extraData={this.state.refresh}
          renderItem={({ item }) => <MyListItem name={item.key} navigation={this.props.navigation} />}
          keyExtractor={this.key}
          ItemSeparatorComponent={this.renderSeparator} />

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
          >
         
          <Container>
            <Header />
            <Content>
              <Form>

                <Item floatingLabel>
                  <Label>City</Label>
                  <Input onChangeText={(temporary) => this.setState({ temporary })} />
                </Item>
              </Form>
                
              <Button full succes onPress={() => this.submitHandle()}></Button>
                     
            </Content>
          </Container>
        </Modal>

        <View style={{ flex: 1 }}>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="search" />

            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => {this.openModal()}}>
              <Icon name="add" />
            </Button>

            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="remove" />
            </Button>

          </Fab>
        </View>
      </Container>
    );
  }
}