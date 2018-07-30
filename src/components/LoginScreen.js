import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Header } from './common/Header';
import { Card } from './common/Card';
import { loginNoticeText } from '../../resources/externalResources';
import * as actions from '../actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    render() {
        const { email } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Login'} />
                <Card style={styles.cardContentStyle}>
                    <View style={styles.emailTextInput}>
                        <TextField
                            label='Email'
                            autoCapitalize='none'
                            value={email}
                            onChangeText={(newEmail) => this.setState({ email: newEmail })}
                        />
                        <Text style={styles.noticeText}>
                            {loginNoticeText}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.loginCreateAccount(email);
                            Actions.popAndPush('createSelectProject');
                        }}
                    >
                        <Text style={styles.buttonTitle}> Login </Text>
                    </TouchableOpacity>
                </Card>
            </View >
        );
    }
}

const styles = {
    cardContentStyle: {
        alignItems: 'center'
    },
    emailTextInput: {
        alignSelf: 'stretch',
        paddingHorizontal: 32,
        paddingVertical: 8,
    },
    noticeText: {
        marginTop: 8,
        color: '#212121',
        opacity: 0.6,
        fontSize: 11,
    },
    button: {
        marginBottom: 20,
        marginTop: 40,
        height: 42,
        width: 180,
        backgroundColor: '#A00037',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: '#FAFAFA',
        fontSize: 20
    }
};

export default connect(null, actions)(LoginScreen);
