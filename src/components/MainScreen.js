import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';

import * as actions from '../actions';
import { TeamHeadder } from './common/TeamHeadder';

const cardsData = [
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
    // componentWillMount() {
    //     console.log(' -- MainScreen - componentWillMount ');
    // }

    // componentWillReceiveProps(nextProps) {
    //     // TODO: act on all voted
    //     console.log(' - MainScreen - componentWillReceiveProps - nextProps: ', nextProps.workOffline);
    // }

    renderTopBar() {
        // console.log('selectedProject:', this.props.selectedProject);
        if (this.props.workOffline === false && this.props.selectedProject) {
            const { participants } = this.props.selectedProject;
            return (<TeamHeadder usersList={participants} />);
        }
        return (<View />);
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                {this.renderTopBar()}
                <FlatList
                    data={cardsData}
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

const mapStateToProps = state => {
    return {
        workOffline: state.workOffline,
        selectedProject: state.selectedProject,
    };
};

export default connect(mapStateToProps, actions)(MainScreen);
