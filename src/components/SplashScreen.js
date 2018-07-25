import React, { Component } from 'react';
import { Image, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SplashScreen extends Component {
    componentWillMount() {
        this.props.loadProfile();
        this.props.loadWorkOffline();
        setTimeout(() => { Actions.mainStack(); }, 500);
    }

    render() {
        return (
            <Image 
                source={require('../../resources/splash/Splash.png')} 
                style={{ 
                    height: deviceHeight,
                    width: deviceWidth }}
            />
        );
    }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default connect(null, actions)(SplashScreen);
