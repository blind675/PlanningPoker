import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';
import { TeamHeadder } from './common/TeamHeadder';

const cardsData = [
    { id: 0, text: '0' },
    { id: 1, text: '1' },
    { id: 2, text: '2' },
    { id: 3, text: '3' },
    { id: 5, text: '5' },
    { id: 8, text: '8' },
    { id: 13, text: '13' },
    { id: 21, text: '21' },
    { id: 50, text: '?' },
    { id: 100, text: 'C' }];

class MainScreen extends Component {
    // componentWillMount() {
    //     console.log(' - MainScreen - componentWillMount ');
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log(' - MainScreen - componentWillReceiveProps - nextProps: ', nextProps.workOffline);
    // }

    renderTopBar() {
        // console.log('- MainScreen - SelectedProject:', this.props.selectedProject);
        if (this.props.workOffline === false && this.props.selectedProject) {
            const { participants } = this.props.selectedProject;
            return (<TeamHeadder usersList={participants} />);
        }
        return (<View />);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={this.props.selectedProject && this.props.workOffline === false ? this.props.selectedProject.name : null} />
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
