import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class GetUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: '',
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      token: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const user_id = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then(async (responseJson) => {
        this.setState({
          user_id: responseJson.user_id,
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          email: responseJson.email,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Your details...</Text>
        <View style={styles.space} />
        <Text style={styles.Label}>Account ID: {this.state.user_id}</Text>
        <Text style={styles.Label}>First Name: {this.state.first_name}</Text>
        <Text style={styles.Label}>Last Name: {this.state.last_name}</Text>
        <Text style={styles.Label}>Email: {this.state.email}</Text>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UpdateUser')}>
          <Text style={styles.TouchText}>Update Details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'lightseagreen',
  },
  Label: {
    fontSize: 15,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    backgroundColor: 'darkorchid',
    padding: 10,
    alignItems: 'center',
  },
  TouchText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default GetUser;
