import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, StyleSheet,
  SafeAreaView, Platform, Text
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class _CustomFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.footerContainer}>
          <TouchableOpacity >
            <Image
              source={require('../../../assets/market.png')}
              style={{ height: hp(4), width: hp(5) }}
            />
          </TouchableOpacity>

          <TouchableOpacity >
            <Image
              source={require('../../../assets/profile.png')}
              style={{ height: hp(4), width: hp(3), }}
            />
          </TouchableOpacity>

          <TouchableOpacity >
            <Image
              source={require('../../../assets/tick.png')}
              style={{ height: hp(4), width: hp(3.2), }}
            />
          </TouchableOpacity>
        </View>


        <View style={{ width: wp(18), alignItems: 'flex-end', justifyContent: 'center', }}>
          <TouchableOpacity >
            <Image
              source={require('../../../assets/dots.png')}
              style={{ height: hp(4), width: hp(1), }}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row', alignItems: 'center', marginLeft: hp(10),
    justifyContent: 'space-around', height: hp(7), width: wp(60)

  }
})