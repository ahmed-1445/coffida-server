import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
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

  checkAuth = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value !== null) {
      this.setState({token: value});
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  logout = async () => {
    let token = await AsyncStorage.getItem('@session_token');
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
          this.props.navigation.navigate('Login');
        } else {
          throw 'Something went wrong';
        }
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
        <View style={styles.space} />
        <Text style={styles.Label}>Are you sure you want to logout?</Text>
        <View style={styles.space} />
        <TouchableOpacity style={styles.Touch} onPress={() => this.logout()}>
          <Text style={styles.TouchText}>Yes</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => this.props.navigation.navigate('AuthenticatedUser')}>
          <Text style={styles.TouchText}>No</Text>
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
    alignSelf: 'center',
  },
  Touch: {
    // backgroundColor: 'darkorchid',
    // padding: 10,
    // alignItems: 'center',
    // borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 160,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default AuthenticatedUser;
