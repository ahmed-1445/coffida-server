import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listData: [],
      locationID: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    this.allLocations();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    if (userToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  allLocations = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?limit=5', {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad request, please reload!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login!';
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
          listData: responseJson,
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
    if (this.state.loading) {
      return (
        <View style={styles.loadingScreen}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Select one of the following locations:</Text>
          <View style={styles.row} />
          <View style={styles.space} />
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => singleLocation(item.location_id)}>
                <View style={styles.space} />
                <View>
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
                </View>
                <View style={styles.row} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
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
  title: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
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
  space: {
    width: 10,
    height: 10,
  },
});

export default GetLocation;
