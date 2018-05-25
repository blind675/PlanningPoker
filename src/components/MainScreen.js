import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';
import * as actions from '../actions';

const dummyData = [
    { id: 1, text: '0' },
    { id: 2, text: '1' },
    { id: 3, text: '2' },
    { id: 4, text: '3' },
    { id: 5, text: '5' },
    { id: 6, text: '8' },
    { id: 7, text: '13' },
    { id: 8, text: '21' },
    { id: 9, text: 'I' },
    { id: 10, text: 'C' }];

class MainScreen extends Component {
    componentWillMount() {
        this.props.loadProfile();
        this.props.loadWorkOfline();
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                {/* <PlayingCard value={21} /> */}
                <FlatList
                    data={dummyData}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.selectValue(item.text);
                                    Actions.mainSelectedScreen();
                                }}
                                style={{
                                    height: 180,
                                    width: '33.33%',
                                }}
                            >
                                <PlayingCard value={item.text} small />
                            </TouchableHighlight>
                        );
                    }}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />

            </View >
        );
    }
}

export default connect(null, actions)(MainScreen);
