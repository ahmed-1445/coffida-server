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
import AsyncStorage from '@react-native-community/async-storage';

class UpdateReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
      reviewData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
    // this.getReview();
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

  // getReview = async () => {
  //   const userToken = await AsyncStorage.getItem('@session_token');
  //   const userID = await AsyncStorage.getItem('@id');
  //   return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Authorization': userToken,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.json();
  //       } else if (response.status === 400) {
  //         throw 'Bad Request!';
  //       } else if (response.status === 401) {
  //         throw 'Not logged in, please login again!';
  //       } else if (response.status === 404) {
  //         throw 'Forbidden!';
  //       } else if (response.status === 500) {
  //         throw 'Server Error!';
  //       } else {
  //         throw 'Error, please try again!';
  //       }
  //     })
  //     .then((responseJson) => {
  //       this.setState({
  //         // origData: responseJson.reviews,
  //         oRating: responseJson.reviews,
  //       });
  //       console.log(this.state.oRating);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       ToastAndroid.show(error, ToastAndroid.SHORT);
  //     });
  // };

  updateReview = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    let details = {
      overall_rating: parseInt(this.state.overall_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,
    };
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID, {
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
          throw 'Invalid details, please try again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  handleInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      this.setState({
        overall_rating: text,
        quality_rating: text,
        clenliness_rating: text,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.Label}>Please fill in the below form...</Text>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Overall Rating:</Text>
            <TextInput
              placeholder="What's the overall rating?"
              keyboardType={'numeric'}
              style={styles.Input}
              onChangeText={this.handleInputChange}
              value={this.handleInputChange.overall_rating}
              maxLength={5}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Quality Rating:</Text>
            <TextInput
              placeholder="What's the quality rating?"
              keyboardType={'numeric'}
              style={styles.Input}
              onChangeText={this.handleInputChange}
              value={this.handleInputChange.quality_rating}
              maxLength={5}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Cleanliness Rating:</Text>
            <TextInput
              placeholder="What's the cleanliness rating?"
              keyboardType={'numeric'}
              style={styles.Input}
              onChangeText={this.handleInputChange}
              value={this.handleInputChange.clenliness_rating}
              maxLength={5}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Any Comments:</Text>
            <TextInput
              placeholder="Anything to add?"
              style={styles.Input}
              onChangeText={(review_body) => this.setState({review_body})}
              value={this.state.review_body}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.updateReview()}>
              <Text style={styles.TouchText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'lightseagreen',
  },
  Label: {
    fontSize: 13,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    backgroundColor: 'darkorchid',
    padding: 10,
    alignItems: 'center',
  },
  TouchText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default UpdateReview;

// onChangeText={(quality_rating) => this.setState({quality_rating})}
// value={this.state.quality_rating}
