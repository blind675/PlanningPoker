import React from 'react';
import { View, Text } from 'react-native';

const UserInfoCell = ({ userInfo }) => {
    return (
        <View style={styles.cellStyle} >
            <View style={[styles.circleView, { backgroundColor: userInfo.voted ? '#6EDC6C' : '#F00807' }]} >
                <Text style={styles.circleText}>
                    {userInfo.nameShort}
                </Text>
            </View>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode={'tail'}>
                {userInfo.name}
            </Text>
        </View>
    );
};

const styles = {
    cellStyle: {
        // backgroundColor: '#FAFAFA',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        height: 63,
        width: 72,
        margin: 2
    },
    circleView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontSize: 20,
        // fontFamily: 'Roboto',
        color: '#212121'
    },
    nameText: {
        marginTop: 2,
        fontSize: 8,
        // fontFamily: 'Roboto',
        color: '#212121',
    }
};

export { UserInfoCell };
