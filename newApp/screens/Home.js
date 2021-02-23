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
        <Text style={styles.label}>Welcome to CoffiDa!</Text>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.touchText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.touchText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#73D2DC',
  },
  image: {
    alignSelf: 'center',
    width: 165,
    height: 240,
    top: -110,
  },
  label: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    top: -90,
  },
  touchText: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 138,
  },
  touch: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  space: {
    width: 30,
    height: 30,
  },
});

export default Home;
