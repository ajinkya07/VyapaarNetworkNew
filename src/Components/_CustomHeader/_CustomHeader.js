import React, { Component } from 'react';

import {
  View, Image, TouchableOpacity, StyleSheet,
  SafeAreaView, Platform, Text
}
  from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from '@values/colors';
import { strings } from '@values/strings'

export default class _CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../../../assets/menu.png')}
                style={{ height: hp(3), width: hp(4), marginTop: 8, marginRight: 12 }}
              />
            </TouchableOpacity>

            <Image
              source={require('../../../assets/logo.png')}
              style={{ height: hp(5), width: hp(4.5), }}
            />
          </View>

          <View style={styles.center}>
            <Text style={styles.title}>{this.props.Title}</Text>
          </View>

          <View style={styles.right}>
            <Image
              source={require('../../../assets/notify.png')}
              style={{ height: hp(3.6), width: hp(3.6) }}
            />
          </View>

        </View>

        <View style={{ marginTop: -5, }}>
          <Text style={styles.subtitle}>{this.props.SubTitle}</Text>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100), padding: 5, flexDirection: 'row'
  },
  left: {
    flex: 1, width: wp(18), flexDirection: 'row', justifyContent: 'space-between'
  },
  center: {
    width: wp(65), alignItems: 'center', justifyContent: 'center'
  },
  title: {
    textAlign: 'center', fontSize: hp(2.5), fontWeight: '600', letterSpacing: 1, color: color.white
  },
  right: {
    flex: 1, width: wp(10), alignItems: 'flex-end', justifyContent: 'center'
  },
  subtitle: {
    marginBottom: 5,
    textAlign: 'center', fontSize: hp(2.2), fontWeight: '600', letterSpacing: 1, color: color.white
  }
})