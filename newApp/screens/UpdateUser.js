import React, {Component} from 'react';
import {View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // This function is used to pre-populate the User Details input fields.
  getInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not Found!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJSON) => {
        this.setState({
          loading: false,
          firstName: responseJSON.first_name,
          lastName: responseJSON.last_name,
          email: responseJSON.email,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  updateInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');
    let userDetails = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Account Details Updated!', ToastAndroid.SHORT);
          this.props.navigation.navigate('MyAccount');
        } else if (response.status === 400) {
          throw 'Invalid details, please try again!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not Found!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Details</Text>
            <View style={styles.row} />
            <View style={styles.space} />
            <Text style={styles.label}>Change First Name:</Text>
            <TextInput
              placeholder="Enter your first name"
              style={styles.input}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
            <View style={styles.space} />
            <Text style={styles.label}>Change Last Name:</Text>
            <TextInput
              placeholder="Enter your last name"
              style={styles.input}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
            <View style={styles.space} />
            <Text style={styles.label}>Change Email:</Text>
            <TextInput
              placeholder="Enter your Email Address"
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <View style={styles.space} />
            <Text style={styles.label}>Change Password:</Text>
            <TextInput
              placeholder="Enter your password (required)"
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
            <View style={styles.row} />
            <View style={styles.space} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.updateInfo()}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: 'black',
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
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default UpdateUser;
