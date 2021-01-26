import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

class Home extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.TouchText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.TouchText}>Login</Text>
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
    backgroundColor: 'lightseagreen',
  },
  TouchText: {
    color: 'white',
    fontSize: 20,
  },
  Touch: {
    backgroundColor: 'darkorchid',
    padding: 3.5,
    alignItems: 'center',
  },
  space: {
    width: 30,
    height: 30,
  },
});

export default Home;
