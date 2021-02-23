import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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
      .then((responseJson) => {
        this.setState({
          loading: false,
          favLocations: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    if (this.state.loadingScreen) {
      return (
        <View style={styles.loading}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Choose one of the following locations:</Text>
          <View style={styles.row} />
          <View style={styles.space} />
          <FlatList
            data={this.state.favLocations}
            renderItem={({item}) => (
              <View>
                <View style={styles.space} />
                <Text style={styles.label}>{item.location_name}</Text>
                <Text style={styles.label}>{item.location_town}</Text>
                <View style={styles.space} />
                <View style={styles.row} />
              </View>
            )}
            keyExtractor={(item) => item.location_id.toString()}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.touch}
            onPress={() => navigation.navigate('LocationMan')}>
            <Text style={styles.touchText}>Back</Text>
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
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  touch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  touchText: {
    fontSize: 17,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 155,
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default FavouriteLocations;
