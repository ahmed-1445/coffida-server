import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  register = () => {
    // Needs validation
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Fill in the form in full, please try again!';
        } else {
          throw 'Something went wrong...';
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
    // const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Please fill in the form:</Text>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>First Name:</Text>
            <TextInput
              placeholder="Enter your first name"
              style={styles.Input}
              onChangeText={(first_name) => this.setState({first_name})}
              value={this.state.first_name}
            />
          </View>
          <View>
            <Text style={styles.Label}>Last Name:</Text>
            <TextInput
              placeholder="Enter your last name"
              style={styles.Input}
              onChangeText={(last_name) => this.setState({last_name})}
              value={this.state.last_name}
            />
          </View>
          <View>
            <Text style={styles.Label}>Email:</Text>
            <TextInput
              placeholder="Enter your Email Address"
              style={styles.Input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View>
            <Text style={styles.Label}>Password:</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.Input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.space} />
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.register()}>
              <Text style={styles.TouchText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  title: {
    fontSize: 17,
    color: 'black',
    padding: 3,
  },
  Label: {
    fontSize: 16,
    color: 'black',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    // backgroundColor: '#f77c39',
    // padding: 10,
    alignItems: 'center',
    // borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
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
    width: 10,
    height: 10,
  },
});

export default Register;
