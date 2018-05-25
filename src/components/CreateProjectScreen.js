import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './common/Header';

class CreateProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Create Project'} />
            </View>
        );
    }
}

export default CreateProjectScreen;
