import React from 'react';
import { View } from 'react-native';

const Card = ({ style, children }) => {
    return (
        <View style={[styles.cardStyle, style]} >
            {children}
        </View>
    );
};

const styles = {
    cardStyle: {
        backgroundColor: '#FAFAFA',
        alignSelf: 'stretch',
        margin: 40,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
};

export { Card };
