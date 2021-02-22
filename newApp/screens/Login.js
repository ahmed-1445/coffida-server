import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      token: '',
      id: '',
    };
  }

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (pass) => {
    this.setState({password: pass});
  };

  login = async () => {
    // Add some validation i.e. password strength
    let to_send = {
      email: this.state.email,
      password: this.state.password,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Invalid email or password, please try again!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@id', JSON.stringify(responseJson.id));
        this.props.navigation.navigate('AuthenticatedUser');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Email:</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.Input}
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <Text style={styles.Label}>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          style={styles.Input}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          secureTextEntry={true}
        />
        <View style={styles.space} />
        <TouchableOpacity style={styles.Touch} onPress={() => this.login()}>
          <Text style={styles.TouchText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Button}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.Register}>Need to register?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#73D2DC',
  },
  Label: {
    fontSize: 16,
    color: 'black',
  },
  Register: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  Button: {
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    // backgroundColor: '#f77c39',
    padding: 10,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  TouchText: {
    backgroundColor: '#f77c39',
    borderRadius: 10,
    fontSize: 20,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 138,
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default Login;
