import React, {Component} from 'react';
import {View, Text, StyleSheet,ToastAndroid, FlatList, Image, TouchableOpacity} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
class UserReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reviewData: [],
      locationData: [],
      locationID: '',
      reviewID: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    this.getReviews();
    console.disableYellowBox = true;
  }
  // Disabled YellowBox due to warning about potential duplicate items for the FlatList
  // on Line 252, after testing extensively no such issues have been produced.

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    if (userToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  // This function is an attempt to get the review details from the selected review
  // to pre-populate the Ratings & Review comment however, this was not accomplished.
  // The JSON object was retrived but not passed correctly into the rating defaultValue.
  getReviews = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
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
      .then((responseJSON) => {
        this.setState({
          loading: false,
          reviewData: responseJSON,
          locationData: responseJSON,
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
    const locID = await AsyncStorage.getItem('@location_id');
    const revID = await AsyncStorage.getItem('@review_id');
    console.log(locID);
    console.log(revID);
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + revID, {
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
    const locID = await AsyncStorage.getItem('@location_id');
    const revID = await AsyncStorage.getItem('@review_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + revID + '/like', {
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
    const locID = await AsyncStorage.getItem('@location_id');
    const revID = await AsyncStorage.getItem('@review_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + revID + '/like', {
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
    // These functions pass the Review & Location IDs to the specified endpoint
    // to ensure the correct IDs are used on the next following screen.
    const removeReview = async (revID, locID) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(revID));
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      console.log('Review ID: ', revID);
      console.log('Location ID: ', locID);
      this.deleteReview();
    };
    const updateReview = async (revID, locID) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(revID));
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      this.setState({
        revID: this.state.reviewID,
        locID: this.state.locationID,
      });
      console.log('Review ID:', revID);
      console.log('Location ID:', locID);
      this.props.navigation.navigate('UpdateReview');
    };
    const like = async (revID, locID) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(revID));
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      console.log('Review ID:', revID);
      console.log('Location ID:', locID);
      this.addLike();
    };
    const unlike = async (revID, locID) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(revID));
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      console.log('Review ID:', revID);
      console.log('Location ID:', locID);
      this.deleteLike();
    };
    const getPhoto = async (revID, locID) => {
      await AsyncStorage.setItem('@review_id', JSON.stringify(revID));
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
      this.setState({
        revID: this.state.reviewID,
        locID: this.state.locationID,
      });
      console.log('Review ID:', revID);
      console.log('Location ID:', locID);
      this.props.navigation.navigate('GetPhoto');
    };
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Reviews created by me:</Text>
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
                    style={styles.picture}
                    source={require('./../icons/picture.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{item.location.location_name} - {item.location.location_town}</Text>
                <View style={styles.ratings}>
                  <Text style={styles.label}>Overall Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.overall_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.label}>Price Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.price_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.label}>Quality Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.quality_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.label}>Cleanliness Rating:</Text>
                  <AirbnbRating
                    count={5}
                    reviews={['1', '2', '3', '4', '5']}
                    defaultRating={item.review.clenliness_rating}
                    size={20}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.label}>Comments: {item.review.review_body}</Text>
                  <Text style={styles.label}>Likes: {item.review.likes}</Text>
                  <View style={styles.space} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => updateReview(item.review.review_id, item.location.location_id)}>
                    <Text style={styles.label}>Edit</Text>
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
    padding: 8,
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
  picture: {
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
  label: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  ratings: {
    alignSelf: 'center',
    top: -90,
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
    top: -90,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  button: {
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
