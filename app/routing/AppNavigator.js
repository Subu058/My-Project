// import React from 'React';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView, SafeAreaView } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Cart: { screen: CartScreen }
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);