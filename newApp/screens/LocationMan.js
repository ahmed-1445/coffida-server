import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class LocationMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Select one of the following options:</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('AllLocations')}>
          <Text style={styles.TouchText}>View all Locations & Reviews</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('FavLocation')}>
          <Text style={styles.TouchText}>View Favourite Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('DeleteUser')}>
          <Text style={styles.TouchText}>Delete a Review</Text>
        </TouchableOpacity>
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
    color: 'white',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default LocationMan;
