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
        <Text style={styles.title}>CoffiDa Sign In</Text>
        <View style={styles.row} />
        <View style={styles.space} />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <View style={styles.space} />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          secureTextEntry={true}
        />
        <View style={styles.row} />
        <View style={styles.space} />
        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.textRegister}>Need to register?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  title: {
    fontSize: 17,
    color: 'black',
    padding: 3,
    alignSelf: 'center',
  },
  label: {
    fontSize: 17,
    color: 'black',
  },
  registerButton: {
    height: 42,
    width: '60%',
    left: 80,
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textRegister: {
    fontSize: 16,
    color: 'black',
    top: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  space: {
    width: 15,
    height: 15,
  },
});

export default Login;
