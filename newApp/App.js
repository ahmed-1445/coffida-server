import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Importing all screens
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import AuthenticatedUser from './screens/AuthenticatedUser';
import Logout from './screens/Logout';
import UpdateUser from './screens/UpdateUser';
import MyAccount from './screens/MyAccount';
import AddReview from './screens/AddReview';
import LocationMan from './screens/LocationMan';
import UpdateReview from './screens/UpdateReview';
import AllLocations from './screens/AllLocations';
import LocationDetails from './screens/LocationDetails';
import FavouriteLocations from './screens/FavouriteLocations';
import UserReviews from './screens/UserReviews';
import AddPhoto from './screens/AddPhoto';
import GetPhoto from './screens/GetPhoto';
import LocationMap from './screens/LocationMap';
import LocationSearch from './screens/LocationSearch';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'CoffiDa'}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Create an account'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Sign In'}}
          />
          <Stack.Screen
            name="AuthenticatedUser"
            component={AuthenticatedUser}
            options={{title: 'Welcome!'}}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{title: 'Goodbye!'}}
          />
          <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{title: 'Update your Information'}}
          />
          <Stack.Screen
            name="MyAccount"
            component={MyAccount}
            options={{title: 'My Account'}}
          />
          <Stack.Screen
            name="AddReview"
            component={AddReview}
            options={{title: 'New Review'}}
          />
          <Stack.Screen
            name="LocationMan"
            component={LocationMan}
            options={{title: 'Location Management'}}
          />
          <Stack.Screen
            name="UpdateReview"
            component={UpdateReview}
            options={{title: 'Update Review'}}
          />
          <Stack.Screen
            name="AllLocations"
            component={AllLocations}
            options={{title: 'View all Locations'}}
          />
          <Stack.Screen
            name="LocationDetails"
            component={LocationDetails}
            options={{title: 'Location Details & Reviews'}}
          />
          <Stack.Screen
            name="FavouriteLocations"
            component={FavouriteLocations}
            options={{title: 'Favourite Locations'}}
          />
          <Stack.Screen
            name="UserReviews"
            component={UserReviews}
            options={{title: 'My Reviews'}}
          />
          <Stack.Screen
            name="AddPhoto"
            component={AddPhoto}
            options={{title: 'Take a Photo'}}
          />
          <Stack.Screen
            name="GetPhoto"
            component={GetPhoto}
            options={{title: 'Review Photo'}}
          />
          <Stack.Screen
            name="LocationMap"
            component={LocationMap}
            options={{title: 'Location Map'}}
          />
          <Stack.Screen
            name="LocationSearch"
            component={LocationSearch}
            options={{title: 'Location Search'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
