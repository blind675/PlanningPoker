import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';
import { UserInfoCell } from './common/UserInfoCell';

import { dummyProjectUsers } from '../../resources/externalResources';
import * as actions from '../actions';

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
    constructor(props) {
        super(props);
        this.state = {
            workOffline: true,
            projectUsers: dummyProjectUsers
        };
    }

    componentWillMount() {
        // TODO: create loading screen and move this to loading
        this.props.loadProfile();
        this.props.loadWorkOffline();
    }

    componentWillReceiveProps(nextProps) {
        console.log(' - MainScreen - componentWillReceiveProps - nextProps: ', nextProps.workOffline);

        this.setState({
            workOffline: nextProps.workOffline,
            // myProjects: nextProps.projects
        });
    }

    renderTopBar() {
        if (this.state.workOffline) {
            return this.renderTeamViewComponent();
        }
        return (<View />);
    }
 
    renderTeamViewComponent() {
        const { projectUsers } = this.state;
        return (<View
            style={{
                backgroundColor: '#6EC6FF',
                height: 67,
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 1,
                shadowOffset: {
                    height: 1,
                    width: 0
                },
            }}
        >
            <FlatList
                horizontal
                data={projectUsers}
                renderItem={({ item }) => {
                    return (
                        <UserInfoCell userInfo={item} />
                    );
                }}
                keyExtractor={(item) => { return item.id; }}
                showsHorizontalScrollIndicator={false}
            />
        </View>);
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
