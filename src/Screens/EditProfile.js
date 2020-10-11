import React, { Component } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView,
    Image, Platform, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import _CustomFooter from '@customFooter/_CustomFooter'
import { color } from '@values/colors';
import { strings } from '@values/strings'
import {
    Container, Header, Content, ActionSheet,
    Button, Icon, Form, Textarea, Item, Input, Label
} from 'native-base';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';

var BUTTONS = ['Take Photo', 'Choose from Library', 'Cancel'];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;



export default class DefaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            companyName: '',
            contactPerson: '',
            email: '',
            mobile: '',
            officeNumber: '',
            state: '', isVisibleState: false,
            country: '', isVisibleCountry: false,
            officePincode: '', officeCity: '', officeArea: '', officeRoad: '',
            officeAddress: '',
            countryFactory: '', isVisibleCountryFactory: false,
            stateFactory: '', isVisibleStateFactory: false,
            factoryAddress: '',
            factoryArea: '', factoryCity: '',
            factoryRoad: '', factoryPincode: '',
            manufacture: '',
            iceCode: '', gstNumber: '',
            profileUrl: '', imageData: '',
            isEditTrue: false


        };
    }

    setStateValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    changeVisibility = (state) => {
        this.setState({
            isVisibleState: false,
            isVisibleCountry: false,
            ...state
        });
    }

    closeCountry = () => { this.setState({ isVisibleCountry: false }) }

    closeState = () => { this.setState({ isVisibleState: false }) }

    changeVisibilityFactory = (state) => {
        this.setState({
            isVisibleStateFactory: false,
            isVisibleCountryFactory: false,
            ...state
        });
    }

    closeCountryFactory = () => { this.setState({ isVisibleCountryFactory: false }) }

    closeStateFactory = () => { this.setState({ isVisibleStateFactory: false }) }


    // image selection

    showActionSheet = (from) => {
        return ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0: {
                        this.openCamera(from);
                        break;
                    }
                    case 1: {
                        this.openImagePicker(from);
                        break;
                    }
                }
            },
        );
    };


    openCamera = (from) => {
        ImagePicker.openCamera({
            width: wp(95),
            height: hp(35),
            cropping: true,
            includeBase64: true,
        }).then(image => {
            if (from === 'fromProfile') {
                this.setState({ profileUrl: image.path, profileData: image });
            }
            if (from === 'fromGST') {
                this.setState({ gstUrl: image.path, gstData: image });
            }
            if (from === 'fromPAN') {
                this.setState({ panUrl: image.path, panData: image });
            }
        });
    };


    openImagePicker = (from) => {
        ImagePicker.openPicker({
            width: wp(95),
            height: hp(35),
            includeBase64: true,
            cropping: true,
        }).then(image => {
            if (from === 'fromProfile') {
                this.setState({ profileUrl: image.path, profileData: image });
            }
            if (from === 'fromGST') {
                this.setState({ gstUrl: image.path, gstData: image });
            }
            if (from === 'fromPAN') {
                this.setState({ panUrl: image.path, panData: image });
            }
        });
    };

    clearImage = (from) => {
        if (from == 'fromProfile') {
            this.setState({ profileUrl: '', profileData: '' })
        }
        if (from === 'fromGST') {
            this.setState({ gstUrl: '', gstData: '' });
        }
        if (from === 'fromPAN') {
            this.setState({ panUrl: '', panData: '' });
        }
    }

    setButton = () => { this.setState({ isEditTrue: true }) }

    setBackButton = () => { this.setState({ isEditTrue: false }) }

    render() {

        const { userId, userName, companyName, state, country,
            contactPerson, email, mobile, officeNumber,
            officePincode, officeCity, officeArea, officeRoad, officeAddress,
            stateFactory, countryFactory, isVisibleStateFactory, isVisibleCountryFactory,
            factoryAddress, factoryPincode, factoryCity, factoryRoad, factoryArea,
            iceCode, gstNumber, manufacture,
            profileUrl, panUrl, gstUrl, isEditTrue
        } = this.state

        return (
            <Container style={styles.container}>
                <_CustomHeader
                    Title={isEditTrue ? strings.editProfile : strings.viewProfile}
                    SubTitle={strings.profileSubtitle}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    backgroundColor={color.brandColor}
                    navigation={this.props.navigation}
                />


                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.body}
                    bounces={false}>

                    <View style={{ flexDirection: 'row', marginLeft: 11 }}>
                        <Item floatingLabel style={[styles.inputBox, { width: wp(31), marginTop: hp(6) }]}>
                            <Label style={[styles.label, { marginTop: 5 }]}>User ID</Label>
                            <Input
                                onChangeText={(value) => this.setStateValue('userId', value)}
                                value={userId}
                            />
                        </Item>
                        <View style={styles.profile}>
                            <Image
                                resizeMode={'cover'}
                                style={styles.profileImage}
                                defaultSource={require('../../assets/logo.png')}
                                source={{ uri: this.state.profileUrl }}

                            />
                        </View>
                        {isEditTrue &&
                            <View style={{ marginLeft: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.showActionSheet('fromProfile')}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.addRemove}
                                        source={require('../../assets/attach.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.clearImage('fromProfile')}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={[styles.addRemove, { marginTop: 5 }]}
                                        source={require('../../assets/delete.png')}
                                    />
                                </TouchableOpacity>
                            </View>}
                    </View>

                    <Form>
                        <View style={{ width: wp(98), flexDirection: 'row', }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>User Name</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('userName', value)}
                                        value={userName}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Company Name</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('companyName', value)}
                                        value={companyName}
                                    />
                                </Item>
                            </View>
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -8 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Contact Person</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('contactPerson', value)}
                                        value={contactPerson}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Email Address</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('email', value)}
                                        value={email}
                                    />
                                </Item>
                            </View>
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -8 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Mobile Number</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('mobile', value)}
                                        value={mobile}
                                        keyboardType={'numeric'}
                                        returnKeyType={'done'}
                                        maxLength={10}

                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Office Number</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('officeNumber', value)}
                                        value={officeNumber}
                                    />
                                </Item>
                            </View>
                        </View>

                        {/* FOR OFFICE  */}
                        {/* <Icon type='Feather' active name='arrow-down-circle' /> */}
                        <View style={{ flexDirection: 'row', marginTop: hp(3), alignSelf: 'center' }}>
                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'India', value: 'india', },
                                    { label: 'Pakistan', value: 'pakistan', },

                                ]}
                                isVisible={this.state.isVisibleState}
                                onOpen={() => this.changeVisibility({ isVisibleState: true })}
                                onClose={() => this.closeState()}
                                placeholder="State"
                                placeholderStyle={{ left: -11 }}
                                defaultValue={state}
                                containerStyle={{ height: 40, width: wp(45), }}
                                style={styles.dropDown}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('state', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search State (e.g Goa)"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No State Found</Text>}
                            />

                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'India', value: 'india', },
                                    { label: 'Pakistan', value: 'pakistan', },

                                ]}
                                isVisible={this.state.isVisibleCountry}
                                onOpen={() => this.changeVisibility({ isVisibleCountry: true })}
                                onClose={() => this.closeCountry()}
                                placeholder="Country"
                                placeholderStyle={{ left: -11 }}
                                defaultValue={country}
                                containerStyle={{ height: 40, width: wp(48), }}
                                style={[styles.dropDown, { marginLeft: 10 }]}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('country', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search Country (e.g India)"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No Country Found</Text>}
                            />
                        </View>

                        <View style={{ width: wp(92), alignSelf: 'center', marginTop: hp(3) }}>
                            <Label style={styles.label}>Office Address</Label>
                            <Textarea rowSpan={3}
                                style={{ top: 2, borderWidth: 0.5, borderColor: color.inputboxBorder }}
                                // bordered
                                onChangeText={(value) => this.setStateValue('officeAddress', value)}
                                value={officeAddress}
                                placeholder="Enter your office address here..."
                            />
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -15 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Office Area</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('officeArea', value)}
                                        value={officeArea}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Office Road</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('officeRoad', value)}
                                        value={officeRoad}
                                    />
                                </Item>
                            </View>
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -8 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Office City</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('officeCity', value)}
                                        value={officeCity}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Office Pincode</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('officePincode', value)}
                                        value={officePincode}
                                        keyboardType={'numeric'}
                                        returnKeyType={'done'}
                                        maxLength={6}
                                    />
                                </Item>
                            </View>
                        </View>

                        {/* FOR FACTORY */}
                        <View style={{ flexDirection: 'row', marginTop: hp(3), alignSelf: 'center' }}>
                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'India', value: 'india', },
                                    { label: 'Pakistan', value: 'pakistan', },

                                ]}
                                isVisible={isVisibleStateFactory}
                                onOpen={() => this.changeVisibilityFactory({ isVisibleStateFactory: true })}
                                onClose={() => this.closeStateFactory()}
                                placeholder="State"
                                placeholderStyle={{ left: -11 }}
                                defaultValue={stateFactory}
                                containerStyle={{ height: 40, width: wp(45), }}
                                style={styles.dropDown}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('stateFactory', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search State (e.g Goa)"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No State Found</Text>}
                            />

                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'India', value: 'india', },
                                    { label: 'Pakistan', value: 'pakistan', },

                                ]}
                                isVisible={isVisibleCountryFactory}
                                onOpen={() => this.changeVisibilityFactory({ isVisibleCountryFactory: true })}
                                onClose={() => this.closeCountryFactory()}
                                placeholder="Country"
                                placeholderStyle={{ left: -11 }}
                                defaultValue={countryFactory}
                                containerStyle={{ height: 40, width: wp(48), }}
                                style={[styles.dropDown, { marginLeft: 10 }]}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('countryFactory', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search Country (e.g India)"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No Country Found</Text>}
                            />
                        </View>

                        <View style={{ width: wp(92), alignSelf: 'center', marginTop: hp(3) }}>
                            <Label style={styles.label}>Factory Address</Label>
                            <Textarea rowSpan={3}
                                style={{ top: 2, borderWidth: 0.5, borderColor: color.inputboxBorder }}
                                // bordered
                                onChangeText={(value) => this.setStateValue('factoryAddress', value)}
                                value={factoryAddress}
                                placeholder="Enter your factory address here..."
                            />
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -15 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Factory Area</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('factoryArea', value)}
                                        value={factoryArea}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Factory Road</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('factoryRoad', value)}
                                        value={factoryRoad}
                                    />
                                </Item>
                            </View>
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -8 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Factory City</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('factoryCity', value)}
                                        value={factoryCity}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>Factory Pincode</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('factoryPincode', value)}
                                        value={factoryPincode}
                                        keyboardType={'numeric'}
                                        returnKeyType={'done'}
                                        maxLength={6}
                                    />
                                </Item>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: hp(3), marginLeft: 12 }}>
                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'France', value: 'france', },
                                    { label: 'India', value: 'india', },
                                    { label: 'Pakistan', value: 'pakistan', },

                                ]}
                                //isVisible={isVisibleStateFactory}
                                // onOpen={() => this.changeVisibilityFactory({ isVisibleStateFactory: true })}
                                //onClose={() => this.closeStateFactory()}
                                placeholder="Manufacturer"
                                placeholderStyle={{ left: -11 }}
                                defaultValue={manufacture}
                                containerStyle={{ height: 40, width: wp(45), }}
                                style={styles.dropDown}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 17, color: color.brandColor }}
                                dropDownStyle={{ backgroundColor: color.white, }}
                                onChangeItem={(item) => this.setStateValue('manufacturer', item.value)}
                                searchable={true}
                                searchablePlaceholder="Search Manufacture"
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: 'red' }}>No Manufacture Found</Text>}
                            />
                        </View>

                        <View style={{ width: wp(98), flexDirection: 'row', marginTop: -8 }}>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>GST Number</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('gstNumber', value)}
                                        value={gstNumber}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label style={styles.label}>ICE Code</Label>
                                    <Input
                                        onChangeText={(value) => this.setStateValue('iceCode', value)}
                                        value={iceCode}
                                        returnKeyType={'done'}
                                    />
                                </Item>
                            </View>
                        </View>


                        {/* FOR DOCUMENT  */}

                        <View style={{ marginTop: hp(3), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp(90) }}>

                            <View style={styles.documentView}>
                                <Text style={{ color: color.brandColor }}>GST certificate</Text>
                                <View style={styles.gstPhoto}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.documentImage}
                                        defaultSource={require('../../assets/logo.png')}
                                        source={{ uri: this.state.gstUrl }}
                                    />
                                </View>
                                {isEditTrue &&
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <TouchableOpacity onPress={() => this.showActionSheet('fromGST')}>
                                            <Image
                                                resizeMode={'contain'}
                                                style={styles.addRemove}
                                                source={require('../../assets/attach.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.clearImage('fromGST')}>
                                            <Image
                                                resizeMode={'contain'}
                                                style={[styles.addRemove, { marginLeft: 10 }]}
                                                source={require('../../assets/delete.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>

                            <View style={styles.documentView}>
                                <Text style={{ color: color.brandColor }}>PAN certificate</Text>
                                <View style={styles.gstPhoto}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.documentImage}
                                        defaultSource={require('../../assets/logo.png')}
                                        source={{ uri: this.state.panUrl }}
                                    />
                                </View>
                                {isEditTrue &&
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <TouchableOpacity onPress={() => this.showActionSheet('fromPAN')} >
                                            <Image
                                                resizeMode={'contain'}
                                                style={styles.addRemove}
                                                source={require('../../assets/attach.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.clearImage('fromPAN')}>
                                            <Image
                                                resizeMode={'contain'}
                                                style={[styles.addRemove, { marginLeft: 10 }]}
                                                source={require('../../assets/delete.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>}
                            </View>
                        </View>


                        <View style={styles.buttons}>
                            <Button
                                onPress={() => this.setButton()}
                                style={styles.saveButton} warning><Text style={{ fontSize: 16, fontWeight: '600', color: color.white }}>{isEditTrue ? 'SAVE CHANGES' : 'EDIT PROFILE'}</Text></Button>
                            <Button
                                onPress={() => this.setBackButton()}
                                style={styles.cancelButton}><Text style={{ fontSize: 16, fontWeight: '600', color: color.white }}>{isEditTrue ? 'CANCEL' : 'BACK'}</Text></Button>

                        </View>
                    </Form>

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
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    body: {
        marginTop: 20,
        paddingBottom: hp(7),
        width: wp(100),
        backgroundColor: color.white,
        borderTopLeftRadius: hp(7), borderTopRightRadius: hp(7)
    },
    profile: {
        alignItems: 'center',
        marginTop: hp(1),
        justifyContent: 'center',
        width: hp(12),
        height: hp(12),
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: hp(2),
        borderRadius: 10,

    },
    profileImage: {
        height: hp(10),
        width: hp(10),
    },
    addRemove: {
        height: hp(4),
        width: hp(4),
    },
    inputBox: {
        paddingBottom: 2, borderBottomWidth: 0.5,
        borderColor: color.inputboxBorder
    },
    label: {
        color: color.brandColor
    },
    dropDown: {
        borderWidth: 0, borderBottomWidth: 0.5,
        borderColor: color.inputboxBorder,
        backgroundColor: color.white,
    },
    documentView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gstPhoto: {
        alignItems: 'center',
        marginTop: hp(1),
        justifyContent: 'center',
        width: hp(22),
        height: hp(15),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
    documentImage: {
        width: hp(20),
        height: hp(15),
    },
    buttons: {
        alignSelf: 'center', flexDirection: 'row',
        justifyContent: 'space-around', width: wp(90), marginTop: hp(3)
    },
    cancelButton: {
        backgroundColor: color.brandColor, height: hp(7),
        borderRadius: 12, width: wp(40), justifyContent: 'center'
    },
    saveButton: {
        borderRadius: 12, height: hp(7), width: wp(40), justifyContent: 'center'
    }

});