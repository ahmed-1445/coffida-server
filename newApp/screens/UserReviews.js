import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';

class UserReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviewData: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
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
        });
        console.log(this.state.reviewData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
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
          <FlatList
            data={this.state.reviewData.reviews}
            renderItem={({item}) => (
              <View style={styles.review}>
                <View style={styles.row} />
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
                  onPress={() => navigation.navigate('UpdateReview')}
                />
                <View style={styles.row} />
                <View style={styles.space} />
              </View>
            )}
            keyExtractor={(item, index) => item.review.review_id.toString()}
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
    backgroundColor: 'lightseagreen',
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
  row: {
    padding: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    // top: 0,
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

export default UserReviews;
