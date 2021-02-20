import React, {Component} from 'react';
import {View, Text, PermissionsAndroid, Alert, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
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
      locationPermission: false,
    };
  }
  findCoordinates() {
    console.log('state', this.state);
    if (!this.state.locationPermission) {
      console.log('asking for permission...');
      this.state.locationPermission = requestLocationPermission();
    }

    this.setState({
      location: {
        longitude: -2.242631,
        latitude: 53.480759,
      },
      isLoading: false,
    });
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     //const location = JSON.stringify(position);
    //     const location = position;
    //     console.log('LOCATION 1: ', location.coords);
    //     this.setState({
    //       location: {
    //         longitude: location.coords.longitude,
    //         latitude: location.coords.latitude,
    //       },
    //     });
    //     this.setState({isLoading: false});
    //   },
    //   (error) => {
    //     Alert.alert(error.message);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //   },
    // );
  }

  componentDidMount() {
    this.findCoordinates();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      console.log('LOCATION 2: ', this.state.location);
      return (
        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}>
            <Marker
              coordinate={this.state.location}
              title="My location"
              description="Here I am"
            />
          </MapView>
        </View>
      );
    }
  }
}

export default LocationMap;
