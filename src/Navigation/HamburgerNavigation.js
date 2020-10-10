import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BlueScreen from '@screens/BlueScreen'
import EditProfile from '@screens/EditProfile'

const Drawer = createDrawerNavigator();


export default class HamburgerNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Edit Profile">
                    <Drawer.Screen name="Edit Profile" component={EditProfile} />
                    <Drawer.Screen name="BlueScreen" component={BlueScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}