import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, AirbnbRating} from 'react-native-elements';

class UserReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviewData: [],
      locationData: [],
      loc_id: '',
      rev_id: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    this.getReviews();
    console.disableYellowBox = true;
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

  getReviews = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const user_id = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
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
          throw 'Server Error!';
        } else {
          throw 'Please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          reviewData: responseJson,
          locationData: responseJson,
        });
        console.log('Review: ', this.state.reviewData);
        console.log('Location: ', this.state.locationData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  deleteReview = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const loc_id = await AsyncStorage.getItem('@location_id');
    const rev_id = await AsyncStorage.getItem('@review_id');
    console.log(loc_id);
    console.log(rev_id);
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
          console.log('Deleted Review!');
          this.getReviews();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
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
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  addLike = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const location_id = await AsyncStorage.getItem('@location_id');
    const review_id = await AsyncStorage.getItem('@review_id');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        location_id +
        '/review/' +
        review_id +
        '/like',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Liked!', ToastAndroid.SHORT);
          console.log('Added to likes!');
          this.getReviews();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
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
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  deleteLike = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const location_id = await AsyncStorage.getItem('@location_id');
    const review_id = await AsyncStorage.getItem('@review_id');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        location_id +
        '/review/' +
        review_id +
        '/like',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Unliked!', ToastAndroid.SHORT);
          console.log('Removed from likes!');
          this.getReviews();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
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
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const removeReview = async (review_id, location_id) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      console.log('Review ID: ', review_id);
      console.log('Location ID: ', location_id);
      this.deleteReview();
    };
    const updateReview = async (review_id, location_id) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      this.setState({
        location_id: this.state.loc_id,
        review_id: this.state.rev_id,
      });
      console.log('Review ID:', review_id);
      console.log('Location ID:', location_id);
      this.props.navigation.navigate('UpdateReview');
    };
    const like = async (review_id, location_id) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      console.log('Review ID:', review_id);
      console.log('Location ID:', location_id);
      this.addLike();
    };
    const unlike = async (review_id, location_id) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      console.log('Location ID:', location_id);
      console.log('Review ID:', review_id);
      this.deleteLike();
    };
    const getPhoto = async (review_id, location_id) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      this.setState({
        location_id: this.state.loc_id,
        review_id: this.state.rev_id,
      });
      console.log('Review ID:', review_id);
      console.log('Location ID:', location_id);
      this.props.navigation.navigate('GetPhoto');
    };
    // const navigation = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.Label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.Label}>Reviews created by me:</Text>
          {/*Not in order*/}
          <View style={styles.row} />
          <FlatList
            data={this.state.locationData.reviews}
            keyExtractor={(item) => item.location.location_id.toString()}
            renderItem={({item}) => (
              <View style={styles.review}>
                <TouchableOpacity
                  style={styles.image}
                  onPress={() =>
                    like(item.review.review_id, item.location.location_id)
                  }>
                  <Image
                    style={styles.image}
                    source={require('./../icons/like.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.image}
                  onPress={() =>
                    unlike(item.review.review_id, item.location.location_id)
                  }>
                  <Image
                    style={styles.dislike}
                    source={require('./../icons/dislike.png')}
                  />
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity
                  style={styles.image}
                  onPress={() =>
                    removeReview(
                      item.review.review_id,
                      item.location.location_id,
                    )
                  }>
                  <Image
                    style={styles.image}
                    source={require('./../icons/delete.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.image}
                  onPress={() =>
                    getPhoto(item.review.review_id, item.location.location_id)
                  }>
                  <Image
                    style={styles.pic}
                    source={require('./../icons/picture.png')}
                  />
                </TouchableOpacity>
                {/*<Text style={styles.Label}>Loc ID: {item.location.location_id}</Text>*/}
                <Text style={styles.Title}>
                  {item.location.location_name} - {item.location.location_town}
                </Text>
                {/*<Text style={styles.Label}>Rev ID: {item.review.review_id}</Text>*/}
                <View style={styles.Ratings}>
                  <Text style={styles.Label}>Overall Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.overall_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.Label}>Price Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.price_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.Label}>Quality Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.quality_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.Label}>Cleanliness Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.clenliness_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.Label}>
                    Comments: {item.review.review_body}
                  </Text>
                  <Text style={styles.Label}>Likes: {item.review.likes}</Text>
                  <View style={styles.space} />
                  <TouchableOpacity
                    style={styles.TouchText}
                    onPress={() => updateReview(item.review.review_id, item.location.location_id)}>
                    <Text style={styles.Label}>Edit</Text>
                  </TouchableOpacity>
                  <View style={styles.space} />
                </View>
                <View style={styles.row} />
              </View>
            )}
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
  image: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    top: 10,
  },
  dislike: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    top: 15,
  },
  pic: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    top: 15,
  },
  delete: {
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
    top: -45,
  },
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Label: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    // top: ,
  },
  Ratings: {
    alignSelf: 'center',
    top: -90,
  },
  review: {
    fontSize: 17,
    color: 'black',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
    top: -90,
    // paddingHorizontal: 10,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  Touch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 17,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignSelf: 'center',
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

export default UserReviews;
