/* eslint-disable prettier/prettier */
// Disabled eslint for this file due to buggy lining errors.
import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listLocations: [],
      searchQuery: '',
    };
  }

  searchLocations = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?q=' + this.state.searchQuery + '&limit=5', {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad Request!';
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
          listLocations: responseJSON,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const singleLocation = async (locID) => {
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      console.log('Location ID: ', locID);
      this.setState({
        locID: this.state.locationID,
      });
      this.props.navigation.navigate('LocationDetails');
    };
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search for a location"
          style={styles.input}
          onChangeText={(searchQuery) => this.setState({searchQuery})}
          value={this.state.searchQuery}
        />
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.searchLocations()}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <View style={styles.space} />
        <Text style={styles.label}>Locations</Text>
        <View style={styles.row} />
        <View style={styles.space} />
        <FlatList
          data={this.state.listLocations}
          keyExtractor={(item) => item.location_id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => singleLocation(item.location_id)}>
              <View style={styles.space} />
              <Text style={styles.label}>{item.location_name}</Text>
              <Text style={styles.label}>{item.location_town}</Text>
              <AirbnbRating
                count={5}
                reviews={['1', '2', '3', '4', '5']}
                defaultRating={item.avg_overall_rating}
                size={18}
                showRating={false}
                isDisabled={true}
              />
              <View style={styles.row} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  label: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
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
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default Search;
