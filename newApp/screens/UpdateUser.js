import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

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
      .then((responseJson) => {
        this.setState({
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          email: responseJson.email,
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
          this.props.navigation.navigate('UserMan');
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
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.space} />
          <View>
            <Text style={styles.label}>Change First Name:</Text>
            <TextInput
              placeholder="Enter your first name"
              style={styles.input}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.label}>Change Last Name:</Text>
            <TextInput
              placeholder="Enter your last name"
              style={styles.input}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.label}>Change Email:</Text>
            <TextInput
              placeholder="Enter your Email Address"
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.label}>Change Password:</Text>
            <TextInput
              placeholder="Enter your password (required)"
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.updateInfo()}>
              <Text style={styles.touchText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.space} />
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
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  touch: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  touchText: {
    fontSize: 17,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 142,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default UpdateUser;
