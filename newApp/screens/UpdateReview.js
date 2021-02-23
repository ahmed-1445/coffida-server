import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
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
      location_reviews: [],
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
      .then((responseJson) => {
        this.setState({
          location_reviews: responseJson.reviews,
        });
        console.log(this.state.location_reviews);
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
          <Text style={styles.label}>Ratings</Text>
          <View style={styles.row} />
          <View style={styles.space} />
          <Text style={styles.label}>Overall Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            // defaultRating={this.state.location_reviews.overallRating}
            size={20}
            onFinishRating={(overallRating) => this.setState({overallRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Price Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            // defaultRating={this.state.location_reviews.priceRating}
            size={20}
            onFinishRating={(priceRating) => this.setState({priceRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Quality Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            // defaultRating={this.state.location_reviews.qualityRating}
            size={20}
            onFinishRating={(qualityRating) => this.setState({qualityRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Cleanliness Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            // defaultRating={this.state.location_reviews.cleanlinessRating}
            size={20}
            onFinishRating={(cleanlinessRating) => this.setState({cleanlinessRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Any Comments:</Text>
          <TextInput
            placeholder="Anything to add?"
            style={styles.input}
            onChangeText={(reviewBody) => this.setState({reviewBody})}
            value={this.state.reviewBody}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.touch}
            onPress={() => navigation.navigate('AddPhoto')}>
            <Text style={styles.touchText}>Add Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => this.updateReview()}>
            <Text style={styles.touchText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#73D2DC',
  },
  label: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  touch: {
    padding: 10,
  },
  touchText: {
    backgroundColor: '#f77c39',
    fontSize: 17,
    color: 'black',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 145,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default UpdateReview;
