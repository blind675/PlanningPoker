import React from 'react';
import { View, Text } from 'react-native';

const PlayingCardBack = () => {
    return (
        <View style={styles.content}>
            <View style={styles.cardStyle}>
                <View style={styles.cardContentStyle}>
                    <Text style={styles.quote}>“Life is not always a matter of holding good cards, but sometimes, playing a poor hand well.”</Text>  
                </View>
            </View>
        </View >
    );
};

const styles = {
    content: {
        padding: 5,
        margin: 10,
        alignSelf: 'stretch',
        flex: 1
    },
    cardStyle: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
        flex: 1,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    cardContentStyle: {
        backgroundColor: '#FF5C8D',
        flex: 1,
        borderRadius: 10,
        margin: 15, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    quote: {
        color: '#212121',
        fontSize: 16,
        // fontFamily: 'Roboto',
        margin: 15,
        fontStyle: 'italic'
    }
};

export { PlayingCardBack };
