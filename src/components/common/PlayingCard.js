import React from 'react';
import { View, Text } from 'react-native';

const PlayingCard = ({ value, small = false }) => {
    return (
        <View
            style={{
                padding: 5,
                margin: 10,
                alignSelf: 'stretch',
                flex: 1
            }}
        >
            <View style={styles.cardStyle}>
                <Text style={[styles.smallText, { alignSelf: 'flex-start' }]} > {value} </Text>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 10,
                        flex: 1,
                    }}
                >
                    <Text
                        style={[
                            styles.centerText,
                            (small) ? { fontSize: 40 } : { fontSize: 80 }
                        ]}
                    > {value} </Text>
                </View>
                <Text
                    style={[
                        styles.smallText,
                        {
                            alignSelf: 'flex-end',
                        }]}
                > {value} </Text>
            </View>
        </View >
    );
};

const styles = {
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
    smallText: {
        color: '#FF5C8D',
        fontSize: 16,
        // fontFamily: 'Roboto',
        margin: 10,
    },
    centerText: {
        color: '#FF5C8D',
        // fontFamily: 'Roboto',
    }

};

export { PlayingCard };
