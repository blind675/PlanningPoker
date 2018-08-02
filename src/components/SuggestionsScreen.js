import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';

import { Header } from './common/Header';
import * as actions from '../actions';

class SuggestionsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('got new props in  suggestion - SuggestionsScreen: ', nextProps.suggestion);

        if (nextProps.suggestion === true) {
            this.setState({ text: '' });

            Alert.alert(
                'Thank you!',
                'We received your suggestions and will take them in consideration. Thank you.',
                [{ text: 'OK', onPress: () => console.log('OK Review') }],
                { cancelable: true }
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Suggestions'} />
                <View
                    style={{
                        backgroundColor: '#FAFAFA',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 32,
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
                    <View
                        style={{
                            width: 250,
                            marginBottom: 20,
                        }}
                    >
                        <TextField
                            label='Suggestion'
                            multiline
                            onChangeText={(text) => { this.setState({ text }); }}
                            value={this.state.text}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.sendSuggestion(this.state.text);
                        }}
                    >
                        <Text style={styles.titleEnabled}> Send Suggestion </Text>
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
        width: 250,
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
        suggestion: state.suggestion
    };
};

export default connect(mapStateToProps, actions)(SuggestionsScreen);
