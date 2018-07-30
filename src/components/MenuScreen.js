import React, { Component } from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { MenuCell } from './common/MenuCell';
import * as actions from '../actions';

class MenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectProjectEnabled: true
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('got new props in MenuScreen: ', nextProps);
        if (_.isEmpty(nextProps.user)) {
            this.setState({ selectProjectEnabled: false });
        } else {
            this.setState({ selectProjectEnabled: true });
        }
    }

    showMustLoginAlert() {
        return (
            Alert.alert(
                'Sorry..',
                'You must login to access this functionality.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: true }
            )
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headder}>
                    <Text style={styles.headderTitle} > Planning Poker </Text>
                    <Text style={styles.headderSubTitle} > The online panning poker app </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                    }}
                >
                    <MenuCell
                        title={(_.isEmpty(this.props.user)) ? 'Login' : 'Profile'}
                        onPress={() => {
                            if (_.isEmpty(this.props.user)) {
                                Actions.drawerClose();
                                Actions.loginScreen();
                            } else {
                                Actions.drawerClose();
                                Actions.reviewScreen();
                            }
                        }}
                    />
                    <MenuCell
                        title='Select Project'
                        onPress={() => {
                            if (!_.isEmpty(this.props.user)) {
                                Actions.drawerClose();
                                Actions.projectStack();
                            } else {
                                // show a popup with you must login
                                this.showMustLoginAlert();
                            }
                        }}
                        enabled={this.state.selectProjectEnabled}
                    />
                    <MenuCell
                        title='Work Offline'
                        onPress={() => {
                            if (!_.isEmpty(this.props.user)) {
                                this.props.updateWorkOffline(!this.props.workOffline);
                            } else {
                                // show a popup with you must login
                                this.showMustLoginAlert();
                            }
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Switch
                            style={styles.switchStyle}
                            onValueChange={
                                (value) => {
                                    if (!_.isEmpty(this.props.user)) {
                                        this.props.updateWorkOffline(value);
                                    } else {
                                        // show a popup with you must login
                                        this.showMustLoginAlert();
                                    }
                                }
                            }
                            value={this.props.workOffline}
                            onTintColor={'#D81B60'}
                        />
                    </MenuCell>
                    <MenuCell title='Settings' onPress={Actions.mainScreen} enabled={false} />
                </View>
                <MenuCell title='Donate' onPress={Actions.mainScreen} enabled={false} />
            </View >
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    headder: {
        height: 200,
        width: '100%',
        backgroundColor: '#D81B60',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        height: 60,
        marginLeft: 16,
        backgroundColor: 'green',
        alignSelf: 'stretch',
        bottom: 0
    },
    headderTitle: {
        fontSize: 24,
        // fontFamily: 'Roboto',
        color: '#FAFAFA',
    },
    headderSubTitle: {
        fontSize: 12,
        // fontFamily: 'Roboto',
        color: '#FAFAFA',
        margin: 8,
    },
    switchStyle: {
        marginRight: 16,
    },
};

const mapStateToProps = state => {
    return {
        user: state.user,
        workOffline: state.workOffline,
    };
};

export default connect(mapStateToProps, actions)(MenuScreen);
