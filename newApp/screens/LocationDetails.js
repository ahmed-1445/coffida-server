import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Avatar} from 'react-native-elements';

class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      // locationData: [],
      location_name: '',
      location_town: '',
      latitude: '',
      longitude: '',
      photo_path: '',
      avg_overall_rating: '',
      avg_price_rating: '',
      avg_quality_rating: '',
      avg_clenliness_rating: '',
      reviewData: [],
      location_reviews: [],
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
    const loc_id = await AsyncStorage.getItem('@location_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id, {
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
          // locationData: responseJson,
          location_name: responseJson.location_name,
          location_town: responseJson.location_town,
          latitude: responseJson.latitude,
          longitude: responseJson.longitude,
          photo_path: responseJson.photo_path,
          avg_overall_rating: responseJson.avg_overall_rating,
          avg_price_rating: responseJson.avg_price_rating,
          avg_quality_rating: responseJson.avg_quality_rating,
          avg_clenliness_rating: responseJson.avg_clenliness_rating,
          reviewData: responseJson.location_reviews,
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
    const location_id = await AsyncStorage.getItem('@location_id');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then(() => {
        ToastAndroid.show('Favourited!', ToastAndroid.SHORT);
        console.log('Added to fav!');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  delFav = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const location_id = await AsyncStorage.getItem('@location_id');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then(() => {
        ToastAndroid.show('Unfavourited!', ToastAndroid.SHORT);
        console.log('Removed from fav!');
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
          <Text style={styles.Title}>
            {this.state.location_name} - {this.state.location_town}
          </Text>
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
              icon={{name: 'heart', type: 'font-awesome'}}
              onPress={() => this.delFav()}
              activeOpacity={0.7}
            />
          </View>
          {/*<View style={styles.rowSplit} />*/}
          {/*<Text style={styles.Label}>Latitude: {this.state.latitude}</Text>*/}
          {/*<Text style={styles.Label}>Longitude: {this.state.longitude}</Text>*/}
          {/*<Text style={styles.Label}>Photo Path: {this.state.photo_path}</Text>*/}
          <Text style={styles.rating}>Average Overall Rating:               {this.state.avg_overall_rating}/5</Text>
          <Text style={styles.rating}>Average Price Rating:                   {this.state.avg_price_rating}/5</Text>
          <Text style={styles.rating}>Average Quality Rating:                {this.state.avg_quality_rating}/5</Text>
          <Text style={styles.rating}>Average Cleanliness Rating:        {this.state.avg_clenliness_rating}/5</Text>
          <View style={styles.rowSplit} />
          <Text style={styles.revTitle}>Reviews:</Text>
          <FlatList
            data={this.state.reviewData}
            renderItem={({item}) => (
              <View style={styles.review}>
                <View style={styles.row} />
                <Text style={styles.Label}>Overall Rating: {item.overall_rating}</Text>
                <Text style={styles.Label}>Price Rating: {item.price_rating}</Text>
                <Text style={styles.Label}>Quality Rating: {item.quality_rating}</Text>
                <Text style={styles.Label}>Cleanliness Rating: {item.clenliness_rating}</Text>
                <Text style={styles.Label}>Comments: {item.review_body}</Text>
                <Text style={styles.Label}>Likes: {item.likes}</Text>
                <View style={styles.row} />
                <View style={styles.space} />
              </View>
            )}
            keyExtractor={(item, index) => item.review_id.toString()}
          />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('AddReview')}>
            <Text style={styles.TouchText}>Add a Review</Text>
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
    backgroundColor: 'lightseagreen',
  },
  fav: {
    alignSelf: 'flex-end',
    top: -25,
  },
  noFav: {
    alignSelf: 'flex-end',
    top: -35,
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
    // top: 0,
  },
  rating: {
    fontSize: 15,
    color: 'white',
    top: -25,
  },
  review: {
    fontSize: 15,
    color: 'white',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    // elevation: 8,
    // paddingHorizontal: 10,
  },
  revTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    top: -10,
  },
  Boarder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    // top: 0,
  },
  rowSplit: {
    padding: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    top: -25,
  },
  Touch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 14,
    color: 'white',
    elevation: 8,
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 95,
  },
  space: {
    width: 7,
    height: 7,
  },
  spaceList: {
    width: 15,
    height: 15,
  },
});

export default LocationDetails;
