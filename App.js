/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HamburgerNavigation from '@navigation/HamburgerNavigation'
import { Root } from "native-base";


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount = async () => {
    console.disableYellowBox = true;

  }
  render() {
    return (
      <>
        <StatusBar backgroundColor="blue" barStyle={'dark-content'} />
        <Root>
          <HamburgerNavigation />
        </Root>
      </>

    );
  }
}

