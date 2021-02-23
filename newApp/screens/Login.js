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
    };
  }

  // Email & Password input handling
  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (pass) => {
    this.setState({password: pass});
  };

  login = async () => {
    // Add some validation i.e. password strength
    let creds = {
      email: this.state.email,
      password: this.state.password,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
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
      .then(async (responseJSON) => {
        console.log(responseJSON);
        await AsyncStorage.setItem('@session_token', responseJSON.token);
        await AsyncStorage.setItem('@id', JSON.stringify(responseJSON.id));
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
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          secureTextEntry={true}
        />
        <View style={styles.space} />
        <TouchableOpacity style={styles.touch} onPress={() => this.login()}>
          <Text style={styles.touchText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.register}>Need to register?</Text>
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
  label: {
    fontSize: 16,
    color: 'black',
  },
  register: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  button: {
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  touch: {
    padding: 10,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  touchText: {
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
