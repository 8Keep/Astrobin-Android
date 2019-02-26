import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import WallScreen from './screens/WallScreen';
import IOTDScreen from './screens/IOTDScreen';
import ProfileScreen from './screens/ProfileScreen';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const IOTDStack = createStackNavigator({
  IOTD: { 
      screen: IOTDScreen, 
      navigationOptions: ({ navigation }) => ({
            title: "Astrobin",
            })},
  Details: { screen: DetailsScreen },
});

const WallStack = createStackNavigator({
    Wall: { screen: WallScreen },
    Details: { screen: DetailsScreen },
});

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen },
    Details: { screen: DetailsScreen },
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        IOTD: { screen: IOTDStack },
        Wall: { screen: WallStack },
        Profile: { screen: ProfileStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                
                if (routeName === 'IOTD') {//color={focused ? 'grey' : 'black'
                    return <Ionicons name='ios-home' size={24} color={tintColor}/>
                }
                else if (routeName === 'Wall') {
                    return <Ionicons name='ios-photos' size={24} color={tintColor}/>
                }
                else if (routeName === 'Profile') {
                    return <MaterialCommunityIcons name='account-circle' size={24} color={tintColor} />
                }
            },
        }),
        initialRouteName: 'IOTD',
        activeColor: 'black',
        inactiveColor: 'grey',
        barStyle: { backgroundColor: 'white' },
    }
);

export default createAppContainer(TabNavigator);
