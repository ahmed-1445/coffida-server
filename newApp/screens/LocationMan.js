import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class LocationMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Here you can see all location and your favourites:</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('GetLocation')}>
          <Text style={styles.TouchText}>View all Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('FavouriteLocations')}>
          <Text style={styles.TouchText}>Favourite Locations</Text>
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
    fontSize: 15,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    // alignItems: 'center',
    // borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 45,
  },
  TouchText: {
    fontSize: 15,
    color: 'white',
    // elevation: 8,
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 80,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default LocationMan;
