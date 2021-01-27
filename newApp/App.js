import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Importing all Screens & Components
import Home from './screens/Home';
import Register from './components/Register';
import Login from './components/Login';
import AuthenticatedUser from './screens/AuthenticatedUser';
import Logout from './screens/Logout';
// import UserInfo from './screens/UserInfo';
import UpdateUser from './screens/UpdateUser';
import UserMan from './screens/UserMan';
import ReviewMan from './screens/ReviewMan';
import AddReview from './screens/AddReview';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome to CoffiDa!" component={Home} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Create an account'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'CoffiDa Sign In'}}
          />
          <Stack.Screen
            name="AuthenticatedUser"
            component={AuthenticatedUser}
            options={{title: 'Welcome User!'}}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{title: 'Goodbye!'}}
          />
          {/*<Stack.Screen*/}
          {/*  name="UserInfo"*/}
          {/*  component={UserInfo}*/}
          {/*  options={{title: 'User Information Portal'}}*/}
          {/*/>*/}
          <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{title: 'Update your Information'}}
          />
          <Stack.Screen
            name="UserMan"
            component={UserMan}
            options={{title: 'User Management'}}
          />
          <Stack.Screen
            name="ReviewMan"
            component={ReviewMan}
            options={{title: 'Review Management'}}
          />
          <Stack.Screen
            name="AddReview"
            component={AddReview}
            options={{title: 'New Review'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
