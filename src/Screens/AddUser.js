import React, { Component } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, FlatList,
    Image, Platform, ScrollView, TouchableOpacity,
} from 'react-native';
import {
    Container, Header, Content, ActionSheet,
    Button, Icon, Form, Textarea, Item, Input, Label
} from 'native-base';
import _CustomHeader from '@customHeader/_CustomHeader'
import _CustomFooter from '@customFooter/_CustomFooter'
import { color } from '@values/colors';
import { strings } from '@values/strings'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';



const listData = [{ 'userName': 'Rahul M', 'email': 'asd@asd.in', 'role': 'Admin' },
{ 'userName': 'Rahul M', 'email': 'asd@asd.in', 'role': 'User' },
{ 'userName': 'Rahul M', 'email': 'asd@asd.in', 'role': 'Admin' }]



export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', userName: '', password: '',
            role: ''
        };
    }

    setStateValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    renderRow = (item) => {
        return (
            <View style={styles.rowStyle}>
                <View style={{ justifyContent: 'center', marginHorizontal: hp(2) }}>
                    <Text style={styles.textStyle}>{item.userName}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '400' }]}>{item.email}</Text>
                </View>

                <View style={{ justifyContent: 'center', marginHorizontal: hp(2) }}>
                    <Text style={styles.textStyle}>{item.role}</Text>
                </View>

            </View>
        )
    }


    render() {
        const { password, email, userName, role } = this.state

        return (
            <Container style={styles.container}>
                <_CustomHeader
                    Title={strings.addUser}
                    SubTitle={strings.addUserSubtitle}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    backgroundColor={color.brandColor}
                    navigation={this.props.navigation}
                />

                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.body}
                    bounces={false}>
                    <Form>
                        <View style={{ width: wp(80) }}>
                            <Item floatingLabel style={styles.inputBox}>
                                <Label style={styles.label}>User Name</Label>
                                <Input
                                    onChangeText={(value) => this.setStateValue('userName', value)}
                                    value={userName}
                                    returnKeyType='next'
                                />
                            </Item>
                        </View>
                        <View style={{ width: wp(80) }}>
                            <Item floatingLabel style={styles.inputBox}>
                                <Label style={styles.label}>Email</Label>
                                <Input
                                    onChangeText={(value) => this.setStateValue('email', value)}
                                    value={email}
                                />
                            </Item>
                        </View>
                        <View style={{ width: wp(80) }}>
                            <Item floatingLabel style={styles.inputBox}>
                                <Label style={styles.label}>Password</Label>
                                <Input
                                    onChangeText={(value) => this.setStateValue('password', value)}
                                    value={password}
                                />
                            </Item>
                        </View>
                        <View style={{ marginTop: hp(4), width: wp(80), marginLeft: hp(1) }}>
                            <DropDownPicker
                                items={[
                                    { label: 'Admin', value: 'Admin', },
                                    { label: 'User', value: 'User', },
                                ]}
                                placeholder="Role"
                                placeholderStyle={{ left: -8 }}
                                defaultValue={role}
                                containerStyle={{ height: 40, }}
                                style={styles.dropDown}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('role', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search Role (e.g User)"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No Role Found</Text>}
                            />
                        </View>
                    </Form>

                    <View style={{ justifyContent: 'center', marginTop: hp(4) }}>
                        <Button
                            // onPress={() => this.setButton()}
                            style={styles.addButton} warning><Text style={{ fontSize: 16, fontWeight: '600', color: color.white }}>ADD USER</Text></Button>
                    </View>

                    <View style={{ marginTop: hp(4), }}>
                        <FlatList
                            data={listData}
                            renderItem={({ item }) => (this.renderRow(item)
                            )}
                        />

                    </View>
                </Content>

                <_CustomFooter />

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.brandColor,
        marginTop: Platform.OS === 'ios' ? 25 : 0
    },
    body: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: hp(7),
        width: wp(100), height: hp(100),
        backgroundColor: color.white,
        borderTopLeftRadius: hp(7), borderTopRightRadius: hp(7)
    },
    inputBox: {
        paddingBottom: 2, borderBottomWidth: 0.5,
        borderColor: color.inputboxBorder
    },
    label: {
        color: color.brandColor
    },
    addButton: {
        borderRadius: 12, height: hp(7), width: wp(40), justifyContent: 'center',
    },
    rowStyle: {
        backgroundColor: color.secondaryGray,
        borderRadius: 3,
        height: hp(8),
        width: wp(90), justifyContent: 'space-between',
        flexDirection: 'row', marginVertical: 8
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '500',
    },
    dropDown: {
        borderWidth: 0, borderBottomWidth: 0.5,
        borderColor: color.inputboxBorder,
        backgroundColor: color.white,
    },


});