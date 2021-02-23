import React, {Component} from 'react';
import {View, Text, PermissionsAndroid, Alert, StyleSheet, ToastAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';

// Request Location permissions function
async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission Request',
        message: 'This app requires access to your current location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location access granted!');
      return true;
    } else {
      console.log('Location access denied!');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}
class LocationMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      location: null,
      locationPerm: false,
      latitude: '',
      longitude: '',
      listLocations: [],
    };
  }

  componentDidMount() {
    this.findCoordinates();
    this.allLocations();
  }

  // Get Latitude and Longitude function
  allLocations = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad request, please try again!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listLocations: responseJson,
        });
        this.state.listLocations.toString();
        console.log('Data:', this.state.listLocations);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  findCoordinates() {
    // Check if permission are granted
    if (!this.state.locationPerm) {
      console.log('Requesting location permission');
      this.state.locationPerm = requestLocationPermission();
    }

    this.setState({
      location: {
        longitude: -2.242631,
        latitude: 53.480759,
      },
      isLoading: false,
    });
    // Get current device location
    Geolocation.getCurrentPosition(
      (position) => {
        const location = position;
        this.setState({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
        this.setState({isLoading: false});
      },
      (error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingScreen}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapView}
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}>
            <Marker
              coordinate={this.state.location}
              title="Current Location"
              description="You here are!"
            />
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingScreen: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
});
export default LocationMap;
