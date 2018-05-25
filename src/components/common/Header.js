import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Header = ({ back, title, leftIcons = false, checkStatus, onCancelPress, onSelectPress }) => {
    function displayLeftButton() {
        if (back) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        Actions.pop();
                    }}
                >
                    <Image
                        style={{ width: 22, height: 22 }}
                        source={require('../../../resources/menuIcon/BackIcon.png')}
                    />
                </TouchableOpacity >
            );
        }

        return (
            <TouchableOpacity onPress={Actions.drawerOpen}>
                <Image
                    style={{
                        width: 32,
                        height: 22,
                        marginVertical: 2,
                        marginHorizontal: 7,
                    }}
                    source={require('../../../resources/menuIcon/MenuIcon.png')}
                />
            </TouchableOpacity>
        );
    }

    function displayRightButtons() {
        if (leftIcons) {
            return (
                <View
                    style={{
                        margin: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={onSelectPress}
                    >
                        <Image
                            style={{
                                width: 32,
                                height: 25,
                                marginVertical: 2
                            }}
                            source={checkStatusIcon()}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginHorizontal: 1,
                            marginLeft: 5,
                        }}
                        onPress={() => {
                            if (onCancelPress) {
                                onCancelPress();
                            } else {
                                Actions.pop();
                            }
                        }}
                    >
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                            }}
                            source={require('../../../resources/navigation/cancelIcon.png')}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        return (<View />);
    }

    function checkStatusIcon() {
        if (checkStatus) {
            return require('../../../resources/check/checkSelected.png');
        }

        return require('../../../resources/check/checkUnselected.png');
    }

    // console.log(' - rendering Headder - checkStatus: ', checkStatus);

    return (
        <View>
            <View style={styles.headderTop} />
            <View style={styles.headderMiddle} >
                {displayLeftButton()}
                <Text style={styles.titleHeadder}> {title || 'Planning Poker'} </Text>
                {displayRightButtons()}
            </View>
        </View>
    );
};

const styles = {
    headderTop: {
        height: 20,
        backgroundColor: '#005cb2',
    },
    headderMiddle: {
        height: 50,
        backgroundColor: '#1e88e5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        },
        marginBottom: 3,
    },
    titleHeadder: {
        color: '#fafafa',
        fontSize: 20,
        // fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
    }

};

export { Header };
