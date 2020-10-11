import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AddUser from '@screens/AddUser'
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
                    <Drawer.Screen name="Add User" component={AddUser} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}