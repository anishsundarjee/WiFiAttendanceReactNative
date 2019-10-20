import React from 'react';
import { Platform, ActivityIndicator, View, AsyncStorage, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Colors from '../constants/Colors'

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/HomeScreen';
import Login from '../screens/Login'
import Chat from '../screens/Chat'

const Signup = createStackNavigator({
  Login : {
    screen: Login,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'User Authentication',
        headerTintColor: Colors.headerTextColor,
        headerStyle: {
            backgroundColor: Colors.loginButtonTextColor,
        }
      }
    }
  }
});

const HomeStack = createStackNavigator({
    Home: {
      screen:  Home,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'WiFi Attendance',
          headerTintColor: Colors.headerTextColor,
          headerStyle: {
              backgroundColor: Colors.loginButtonTextColor,
          }
        }
      }
    },
  }
);

const ChatStack = createStackNavigator({
  Chat: {
    screen:  Chat,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'Chat Room',
        headerTintColor: Colors.headerTextColor,
        headerStyle: {
            backgroundColor: Colors.loginButtonTextColor,
        }
      }
    }
  },
}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : ''}`
          : 'md-home'
      }
    />
  ),
};

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-chatboxes${focused ? '' : ''}`
          : 'md-chatboxes'
      }
    />
  ),
  tabBarOptions : {keyboardHidesTabBar  : true}
};

HomeStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ChatStack,
});

tabNavigator.path = '';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('Token');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  
  // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator 
            size = "large"
          />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: tabNavigator,
      Auth: Signup,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );
