import React, {Component} from 'react';
import {View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      reviewBody: '',
      reviewData: [],
      locationReviews: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    this.getReview();
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

  getReview = async () => {
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
          throw 'Forbidden!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJSON) => {
        this.setState({
          locationReviews: responseJSON.reviews,
        });
        console.log(this.state.locationReviews);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  updateReview = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    let details = {
      overall_rating: parseInt(this.state.overallRating),
      price_rating: parseInt(this.state.priceRating),
      quality_rating: parseInt(this.state.qualityRating),
      clenliness_rating: parseInt(this.state.cleanlinessRating),
      review_body: this.state.reviewBody,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID, {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: JSON.stringify(details),
      },
      console.log(details),
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Updated!', ToastAndroid.SHORT);
          this.props.navigation.navigate('UserReviews');
        } else if (response.status === 400) {
          throw 'Invalid ratings/comment, please try again!';
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
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Ratings</Text>
          <View style={styles.row} />
          <Text style={styles.label}>Overall Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={this.state.locationReviews.overall_rating}
            size={20}
            onFinishRating={(overallRating) => this.setState({overallRating})}
          />
          <View style={styles.row} />
          <Text style={styles.label}>Price Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={this.state.locationReviews.price_rating}
            size={20}
            onFinishRating={(priceRating) => this.setState({priceRating})}
          />
          <View style={styles.row} />
          <Text style={styles.label}>Quality Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={this.state.locationReviews.quality_rating}
            size={20}
            onFinishRating={(qualityRating) => this.setState({qualityRating})}
          />
          <View style={styles.row} />
          <Text style={styles.label}>Cleanliness Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={this.state.locationReviews.cleanlinessRating}
            size={20}
            onFinishRating={(cleanlinessRating) => this.setState({cleanlinessRating})}
          />
          <View style={styles.row} />
          <View style={styles.space} />
          <Text style={styles.label}>Comments:</Text>
          <TextInput
            placeholder="Anything to add?"
            style={styles.input}
            onChangeText={(reviewBody) => this.setState({reviewBody})}
            value={this.state.reviewBody}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddPhoto')}>
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.updateReview()}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  label: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  title: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
  },
  space: {
    width: 12,
    height: 12,
  },
});

export default UpdateReview;
