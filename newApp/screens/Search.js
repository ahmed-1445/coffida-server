/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listLocations: [],
      // location_name: '',
      // location_town: '',
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
    })
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
      return (
        <View style={styles.container}>
          <View style={styles.space} />
          <View>
            <TextInput
              placeholder="Search for a location"
              style={styles.input}
              onChangeText={(searchQuery) => this.setState({searchQuery})}
              value={this.state.searchQuery}
            />
          </View>
          <TouchableOpacity
              style={styles.touch}
              onPress={() => this.searchLocations()}>
              <Text style={styles.touchText}>Search</Text>
            </TouchableOpacity>
          <View style={styles.space} />
          <Text style={styles.label}>Locations</Text>
          <View style={styles.row} />
          <View style={styles.space} />
          <FlatList
            data={this.state.listLocations}
            renderItem={({item}) => (
              <View>
                <View style={styles.space} />
                <Text style={styles.label}>{item.location_name}</Text>
                <Text style={styles.label}>{item.location_town}</Text>
                <View style={styles.space} />
                <View style={styles.row} />
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
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
  label: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  touch: {
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  touchText: {
    fontSize: 17,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 115,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default Search;
