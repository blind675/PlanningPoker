import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MenuCell = ({ title, onPress, children, enabled = true }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (enabled) {
                    onPress();
                }
            }}
            style={styles.container}
            activeOpacity={(enabled) ? 0.2 : 1.0}
        >
            <View style={styles.textContainer}>
                <View style={styles.contentContainer}>
                    <Text style={(enabled) ? styles.titleEnabled : styles.titleDisabled} > {title} </Text>
                    {children}
                </View>
            </View>
            <View style={styles.underline} />
        </TouchableOpacity >
    );
};

const styles = {
    container: {
        alignSelf: 'stretch',
        backgroundColor: '#FAFAFA',
        height: 60,
        marginLeft: 16,
    },
    underline: {
        height: 1,
        backgroundColor: '#EBEBEB',
        alignSelf: 'stretch',
    },
    textContainer: {
        alignSelf: 'stretch',
        height: 59,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    contentContainer: {
        flexDirection: 'row',
    },
    titleEnabled: {
        fontSize: 20,
        color: '#212121'
    },
    titleDisabled: {
        fontSize: 20,
        color: '#606060'
    },
};

export { MenuCell };
