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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyAccount')}>
          <Text style={styles.buttonText}>My Account</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationMan')}>
          <Text style={styles.buttonText}>Locations</Text>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./../icons/coffeeDessert.png')}
        />
        <Text style={styles.imageTitle}>Feeling a coffee?</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.buttonText}>Logout</Text>
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
    width: 240,
    height: 240,
    top: 90,
  },
  imageTitle: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    top: 60,
  },
  logoutButton: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 223,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 25,
    height: 25,
  },
});

export default AuthenticatedUser;
