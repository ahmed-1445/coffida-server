import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  register = () => {
    let userDetails = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Fill in the form in full, please try again!';
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
      .then((responseJSON) => {
        console.log('User created with ID: ', responseJSON);
        ToastAndroid.show('Account created', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Please fill in the form to sign up</Text>
          <View style={styles.row} />
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            placeholder="Enter your first name"
            style={styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.first_name}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            placeholder="Enter your last name"
            style={styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.last_name}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder="Enter your Email Address"
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <View style={styles.row} />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.register()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontSize: 16,
    color: 'black',
    padding: 3,
    alignSelf: 'center',
  },
  label: {
    fontSize: 17,
    color: 'black',
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
    fontSize: 17,
    color: 'black',
  },
  space: {
    width: 15,
    height: 15,
  },
});

export default Register;
