/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listLocations: [],
      location_name: '',
      location_town: '',
      searchQuery: '',
    };
  }

//   componentDidMount() {
//     this.searchLocations();
//   }

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
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listLocations: responseJson,
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
              style={styles.Input}
              onChangeText={(searchQuery) => this.setState({searchQuery})}
              value={this.state.searchQuery}
            />
          </View>
          <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.searchLocations()}>
              <Text style={styles.TouchText}>Search</Text>
            </TouchableOpacity>
          <View style={styles.space} />
          <View style={styles.row} />
          <View style={styles.space} />
          <Text style={styles.Label}>Locations:</Text>
          <FlatList
            data={this.state.listLocations}
            renderItem={({item}) => (
              <View>
                <View style={styles.row} />
                <View style={styles.space} />
                <Text style={styles.Label}>{item.location_name}</Text>
                <Text style={styles.Label}>{item.location_town}</Text>
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
    backgroundColor: 'lightseagreen',
  },
  loading: {
    backgroundColor: 'lightseagreen',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  Boarder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Touch: {
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  TouchText: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 120,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default Search;
