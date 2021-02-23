import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./../icons/coffeeCup.png')}
        />
        <Text style={styles.title}>Welcome to CoffiDa!</Text>
        <View style={styles.row} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#73D2DC',
  },
  image: {
    alignSelf: 'center',
    width: 165,
    height: 240,
    top: -85,
    left: 5,
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    top: -80,
  },
  row: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    top: -75,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
  },
  space: {
    width: 30,
    height: 30,
  },
});

export default Home;
