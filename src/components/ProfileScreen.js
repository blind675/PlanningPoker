import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Header } from './common/Header';

class ProfileScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Profile'} />
                <View
                    style={{
                        backgroundColor: '#FAFAFA',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 50,
                        marginVertical: 90,
                        flex: 1,
                        borderRadius: 15,
                        shadowColor: '#000000',
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        shadowOffset: {
                            height: 1,
                            width: 0
                        }
                    }}
                >
                    <Text style={styles.centerValueText}> {this.props.user.nameShort} </Text>
                    <View>
                        <Text style={styles.bottomNameText}> Name: {this.props.user.name} </Text>
                        <Text style={styles.bottomNameText}> Email: {this.props.user.email} </Text>
                        <Text style={styles.bottomNameText}> Subscribed to {this.props.user.projects.length} projects</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    centerValueText: {
        color: '#FF5C8D',
        fontSize: 32,
        // fontFamily: 'Roboto',
        marginBottom: 30,
    },
    bottomNameText: {
        color: '#212121',
        fontSize: 16,
        // fontFamily: 'Roboto',
        marginVertical: 8,
    }
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(ProfileScreen);
