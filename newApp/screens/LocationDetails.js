import React, {Component} from 'react';
import {View, StyleSheet, Text, ToastAndroid, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Avatar, AirbnbRating} from 'react-native-elements';

class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      locationID: '',
      locationName: '',
      locationTown: '',
      avgPriceRating: '',
      avgQualityRating: '',
      avgCleanlinessRating: '',
      reviewData: [],
      locationReviews: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    this.locationInfo();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  locationInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locID = await AsyncStorage.getItem('@location_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad request!';
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
          locationID: responseJSON.location_id,
          locationName: responseJSON.location_name,
          locationTown: responseJSON.location_town,
          avgPriceRating: responseJSON.avg_price_rating,
          avgQualityRating: responseJSON.avg_quality_rating,
          avgCleanlinessRating: responseJSON.avg_clenliness_rating,
          reviewData: responseJSON.location_reviews,
        });
        console.log(this.state.reviewData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  addFav = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locID = await AsyncStorage.getItem('@location_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/favourite', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Favourited!', ToastAndroid.SHORT);
          console.log('Added to fav!');
        } else if (response.status === 400) {
          throw 'Bad request, please login again!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server error!';
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  delFav = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locID = await AsyncStorage.getItem('@location_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/favourite', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Unfavourited!', ToastAndroid.SHORT);
          console.log('Removed from fav!');
        } else if (response.status === 400) {
          throw 'Bad request, please login again!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server error!';
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
    if (this.state.loading) {
      return (
        <View style={styles.loadingScreen}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.state.locationName} - {this.state.locationTown}</Text>
          <View style={styles.row} />
          <View style={styles.fav}>
            <Avatar
              size="small"
              icon={{name: 'heart', type: 'font-awesome'}}
              onPress={() => this.addFav()}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.noFav}>
            <Avatar
              size="small"
              icon={{name: 'favorite-border', type: 'Ionicons'}}
              onPress={() => this.delFav()}
              activeOpacity={0.7}
            />
          </View>
          <Text style={styles.rating}>Avg Price Rating: {this.state.avgPriceRating} / 5</Text>
          <Text style={styles.rating}>Avg Quality Rating: {this.state.avgQualityRating} / 5</Text>
          <Text style={styles.rating}>Avg Cleanliness Rating: {this.state.avgCleanlinessRating} / 5</Text>
          <View style={styles.rowSplit} />
          <Text style={styles.revTitle}>Reviews</Text>
          <View style={styles.row} />
          <FlatList
            data={this.state.reviewData}
            keyExtractor={(item) => item.review_id.toString()}
            renderItem={({item}) => (
              <View style={styles.review}>
                <Text style={styles.label}>Comment: {item.review_body}</Text>
                <View style={styles.space} />
                <Text style={styles.label}>Overall Rating:</Text>
                <AirbnbRating
                  count={5}
                  reviews={['1', '2', '3', '4', '5']}
                  defaultRating={item.overall_rating}
                  size={20}
                  isDisabled={true}
                />
                <View style={styles.space} />
                <Text style={styles.label}>Price Rating:</Text>
                <AirbnbRating
                  count={5}
                  reviews={['1', '2', '3', '4', '5']}
                  defaultRating={item.price_rating}
                  size={20}
                  isDisabled={true}
                />
                <View style={styles.space} />
                <Text style={styles.label}>Quality Rating:</Text>
                <AirbnbRating
                  count={5}
                  reviews={['1', '2', '3', '4', '5']}
                  defaultRating={item.quality_rating}
                  size={20}
                  isDisabled={true}
                />
                <View style={styles.space} />
                <Text style={styles.label}>Cleanliness Rating:</Text>
                <AirbnbRating
                  count={5}
                  reviews={['1', '2', '3', '4', '5']}
                  defaultRating={item.clenliness_rating}
                  size={20}
                  isDisabled={true}
                />
                <View style={styles.space} />
                <Text style={styles.label}>Likes: {item.likes}</Text>
                <View style={styles.space} />
                <View style={styles.row} />
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddReview')}>
            <Text style={styles.buttonText}>Add a Review</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  fav: {
    alignSelf: 'flex-end',
    top: -35,
  },
  noFav: {
    alignSelf: 'flex-end',
    top: -35,
  },
  loadingScreen: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  rating: {
    fontSize: 17,
    color: 'black',
    top: -25,
    alignSelf: 'center',
  },
  review: {
    fontSize: 17,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  revTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    top: -10,
    alignSelf: 'center',
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  rowSplit: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    top: -25,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 7,
    height: 7,
  },
});

export default LocationDetails;
