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
// import FlatList from 'react-native-gesture-handler';

class FavouriteLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      favLocations: [],
      location_name: '',
      location_town: '',
    };
  }

  componentDidMount() {
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.checkAuth();
    // });
    this.favLocations();
  }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // checkAuth = async () => {
  //   const value = await AsyncStorage.getItem('@session_token');
  //   if (value == null) {
  //     this.props.navigation.navigate('Login');
  //   }
  // };

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
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          favLocations: responseJson,
          // location_name: responseJson.location_name,
          // location_town: responseJson.location_town,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.Label}>Loading...</Text>
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <Text style={styles.Label}>
            Choose one of the following locations:
          </Text>
          <View style={styles.space} />
          <FlatList
            data={this.state.favLocations}
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
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('LocationMan')}>
            <Text style={styles.TouchText}>Back</Text>
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
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Label: {
    fontSize: 17,
    color: 'black',
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  Touch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // alignItems: s'center',
  },
  TouchText: {
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
