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
    const userToken = await AsyncStorage.getItem('@session_token');
    if (userToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.space} />
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('UserMan')}>
          <Text style={styles.touchText}>My Account</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('LocationMan')}>
          <Text style={styles.touchText}>Locations</Text>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./../icons/coffeeDessert.png')}
        />
        <Text style={styles.label}>Feeling a coffee?</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.touchText}>Logout</Text>
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
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    top: 50,
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
    paddingHorizontal: 132,
  },
  label: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    top: 25,
  },
  logout: {
    paddingVertical: 5,
    paddingHorizontal: 37,
    top: 215,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AuthenticatedUser;
