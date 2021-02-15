import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import FlatList from 'react-native-gesture-handler';

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      // location_id: '',
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
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  allLocations = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    // const loc_id = await AsyncStorage.getItem('@location_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?limit=20', {
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
          listData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const singleLocation = async (location_id) => {
      await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
      this.props.navigation.navigate('LocationDetails');
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
          <Text style={styles.Label}>
            Select one of the following locations:
          </Text>
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => singleLocation(item.location_id)}>
                <View style={styles.space} />
                <View>
                  <Text style={styles.Label}>{item.location_name}</Text>
                  <Text style={styles.Label}>{item.location_town}</Text>
                  <View style={styles.row} />
                </View>
                <View style={styles.space} />
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
  },
  // Boarder: {
  //   borderWidth: 1.5,
  //   borderColor: 'black',
  //   borderRadius: 5,
  // },
  row: {
    padding: 2,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  space: {
    width: 10,
    height: 10,
  },
  spaceSmall: {
    width: 7,
    height: 7,
  },
});

export default GetLocation;
