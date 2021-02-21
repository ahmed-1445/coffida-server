import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';

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
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
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
      .then(() => {
        ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
        console.log('Deleted Review!');
        this.getReviews();
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
      .then(() => {
        ToastAndroid.show('Liked!', ToastAndroid.SHORT);
        console.log('Added to likes!');
        this.getReviews();
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
      .then(() => {
        ToastAndroid.show('Unliked!', ToastAndroid.SHORT);
        console.log('Removed from likes!');
        this.getReviews();
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
          <FlatList
            data={this.state.reviewData.reviews}
            // numColumns={1.5}
            renderItem={({item}) => (
              <View style={styles.review}>
                <View style={styles.row} />
                <FlatList
                  data={this.state.locationData.reviews}
                  renderItem={({item}) => (
                    <View style={styles.review}>
                      <TouchableOpacity style={styles.image}
                        onPress={() => like(item.review.review_id, item.location.location_id)}>
                        <Image style={styles.image} source={require('./../icons/like.png')} />
                      </TouchableOpacity>
                      <View style={styles.space} />
                      <TouchableOpacity style={styles.image}
                        onPress={() => removeReview(item.review.review_id, item.location.location_id)}>
                        <Image style={styles.image} source={require('./../icons/delete.png')} />
                      </TouchableOpacity>
                      {/*<Text style={styles.Label}>Loc ID: {item.location.location_id}</Text>*/}
                      <Text style={styles.Title}>{item.location.location_name} - {item.location.location_town}</Text>
                      {/*<Text style={styles.Label}>Rev ID: {item.review.review_id}</Text>*/}
                      <Text style={styles.Label}>Overall Rating: {item.review.overall_rating}</Text>
                      <Text style={styles.Label}>Price Rating: {item.review.price_rating}</Text>
                      <Text style={styles.Label}>Quality Rating: {item.review.quality_rating}</Text>
                      <Text style={styles.Label}>Cleanliness Rating: {item.review.clenliness_rating}</Text>
                      <Text style={styles.Label}>Comments: {item.review.review_body}</Text>
                      <Text style={styles.Label}>Likes: {item.review.likes}</Text>
                      <Button
                        // style={styles.Touch}
                        small
                        icon={{name: 'edit'}}
                        title="Edit"
                        onPress={() => updateReview(item.review.review_id, item.location.location_id)}
                      />
                      <View style={styles.space} />
                      <Button
                        small
                        title="See photo"
                        onPress={() => getPhoto(item.review.review_id, item.location.location_id)}
                      />
                      <View style={styles.space} />
                      <Button
                        small
                        title="Unlike"
                        onPress={() => unlike(item.review.review_id, item.location.location_id)}
                      />
                      <View style={styles.row} />
                    </View>
                  )}
                  keyExtractor={(item) => item.location.location_id.toString()}
                />
                <View style={styles.space} />
              </View>
            )}
            keyExtractor={(item) => item.review.review_id.toString()}
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
    // top: -90,
  },
  review: {
    fontSize: 17,
    color: 'black',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    // top: -90,
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

export default UserReviews;
