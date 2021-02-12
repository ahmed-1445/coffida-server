import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class UserMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>The following options are available:</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('FindUser')}>
          <Text style={styles.TouchText}>View your Information</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UpdateUser')}>
          <Text style={styles.TouchText}>Update your Information</Text>
        </TouchableOpacity>
        <View style={styles.space} />
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
    fontSize: 13,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
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

export default UserMan;
