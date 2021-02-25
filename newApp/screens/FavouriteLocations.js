import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList, TouchableOpacity} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class FavouriteLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      favLocations: [],
    };
  }

  componentDidMount() {
    this.favLocations();
  }

  favLocations = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?search_in=favourite', {
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
      .then((responseJSON) => {
        this.setState({
          loading: false,
          favLocations: responseJSON,
        });
        console.log(this.state.favLocations);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
    const singleLocation = async (locID) => {
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      console.log('Location ID: ', locID);
      this.setState({
        locID: this.state.locationID,
      });
      this.props.navigation.navigate('LocationDetails');
    };
    if (this.state.loading) {
      return (
        <View style={styles.loadingScreen}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Tap a Location</Text>
          <View style={styles.space} />
          <View style={styles.row} />
          <View style={styles.space} />
          <FlatList
            data={this.state.favLocations}
            keyExtractor={(item) => item.location_id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => singleLocation(item.location_id)}>
                <View style={styles.space} />
                <Text style={styles.title}>{item.location_name}</Text>
                <Text style={styles.subTitle}>{item.location_town}</Text>
                <View style={styles.space} />
                <Text style={styles.rating}>Avg Rating:</Text>
                <AirbnbRating
                  count={5}
                  reviews={['1', '2', '3', '4', '5']}
                  defaultRating={item.avg_overall_rating}
                  size={18}
                  showRating={false}
                  isDisabled={true}
                />
                <View style={styles.space} />
                <View style={styles.row} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LocationMan')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#73D2DC',
  },
  loadingScreen: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
  title: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  rating: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default FavouriteLocations;
