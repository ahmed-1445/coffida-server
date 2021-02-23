import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

class LocationMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('GetLocation')}>
          <Text style={styles.touchText}>View all Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('FavouriteLocations')}>
          <Text style={styles.touchText}>Favourite Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.touchText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('LocationMap')}>
          <Text style={styles.touchText}>Coffee Shops Near Me</Text>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./../icons/locationSketch.png')}
        />
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
    width: 150,
    height: 150,
    top: 55,
  },
  touch: {
    paddingVertical: 15,
    paddingHorizontal: 45,
  },
  touchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 100,
  },
  space: {
    width: 15,
    height: 15,
  },
});

export default LocationMan;
