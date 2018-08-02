import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { Header } from './common/Header';
import * as actions from '../actions';

class SettingsScreen extends Component {
    // componentWillMount() {
    //     console.log(' - SettingsScreen - :', this.props.user);
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Settings'} />
                <View
                    style={{
                        backgroundColor: '#FAFAFA',
                        alignItems: 'center',
                        margin: 32,
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.removeProject();
                            this.props.updateWorkOffline(true);
                            this.props.logout();
                        }}
                    >
                        <Text style={(_.isEmpty(this.props.user)) ? styles.titleDisabled : styles.titleEnabled}> Logout </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.resetSuggestion();
                            Actions.suggestionsScreen();
                        }}
                    >
                        <Text style={styles.titleEnabled}> Suggestions </Text>
                    </TouchableOpacity>

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
    },
    button: {
        margin: 15,
        height: 45,
        width: 200,
        backgroundColor: '#A00037',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleEnabled: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    titleDisabled: {
        fontSize: 20,
        color: '#FFFFFF',
        opacity: 0.5
    },
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, actions)(SettingsScreen);
