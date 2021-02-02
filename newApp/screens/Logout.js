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
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout/', {
      method: 'post',
      headers: {
        'X-Authorization': token,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Successfully logged out!', ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
        } else if (response.status === 201) {
          ToastAndroid.show('Logged out!', ToastAndroid.SHORT);
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
        <ScrollView>
          <Text style={styles.Label}>Are you sure you want to logout?</Text>
          <View style={styles.space} />
          <TouchableOpacity style={styles.Touch} onPress={() => this.logout()}>
            <Text style={styles.TouchText}>Yes</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.props.navigation.navigate('AuthenticatedUser')}>
            <Text style={styles.TouchText}>No</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: 20,
    height: 20,
  },
});

export default AuthenticatedUser;
