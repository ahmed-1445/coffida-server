import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthenticatedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*<Text style={styles.Title}>What would you like to do?</Text>*/}
        <View style={styles.space} />
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UserMan')}>
          <Text style={styles.TouchText}>My Account</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('LocationMan')}>
          <Text style={styles.TouchText}>Locations</Text>
        </TouchableOpacity>
        <Image
          style={styles.Image}
          source={require('./../icons/coffeeDessert.png')}
        />
        <Text style={styles.Label}>Feeling a coffee?</Text>
        <TouchableOpacity
          style={styles.Logout}
          onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.TouchText}>Logout</Text>
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
  Title: {
    fontSize: 16,
    color: 'black',
  },
  Image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    top: 30,
  },
  Touch: {
    // alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 132,
  },
  Label: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    top: 5,
  },
  Logout: {
    paddingVertical: 5,
    paddingHorizontal: 37,
    top: 200,
  },
  LogoutText: {
    fontSize: 16,
    color: 'white',
    // backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 132,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AuthenticatedUser;
