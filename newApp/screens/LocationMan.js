import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

class LocationMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AllLocations')}>
          <Text style={styles.buttonText}>View all Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FavouriteLocations')}>
          <Text style={styles.buttonText}>Favourite Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationSearch')}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocationMap')}>
          <Text style={styles.buttonText}>Coffee Shops Near Me</Text>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./../icons/locationSketch.png')}
        />
        <Text style={styles.label}>Looking for the best coffee?</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('AuthenticatedUser')}>
          <Text style={styles.buttonText}>Back</Text>
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
    width: 140,
    height: 140,
    top: 70,
  },
  label: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
    top: 75,
  },
  backButton: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 208,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default LocationMan;
