import React, {Component} from 'react';
// eslint-disable-next-line prettier/prettier
import {View, Text, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthenticatedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // Checking if the user the authenticated
  checkAuth = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    if (userToken !== null) {
      this.setState({token: userToken});
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  logout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'X-Authorization': token,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Successfully logged out!', ToastAndroid.SHORT);
          await AsyncStorage.removeItem('@session_token');
          this.props.navigation.navigate('Home');
        } else if (response.status === 400) {
          throw 'Bad request!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Please try again!';
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
        <View style={styles.logoutContainer}>
          <View style={styles.space} />
          <Text style={styles.label}>Are you sure you want to logout?</Text>
          <View style={styles.space} />
          <TouchableOpacity style={styles.touch} onPress={() => this.logout()}>
            <Text style={styles.touchText}>Yes</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.touch}
            onPress={() => this.props.navigation.navigate('AuthenticatedUser')}>
            <Text style={styles.touchText}>No</Text>
          </TouchableOpacity>
        </View>
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
  logoutContainer: {
    top: 247,
  },
  label: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  touch: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  touchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 160,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AuthenticatedUser;
