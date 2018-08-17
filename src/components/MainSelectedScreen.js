import React, { Component } from 'react';
import { View, TouchableOpacity, Easing, Platform } from 'react-native';
// import FlipCard from 'react-native-flip-card';
import FlipView from 'react-native-flip-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../actions';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';
import { PlayingCardBack } from './common/PlayingCardBack';
import { TeamHeadder } from './common/TeamHeadder';

class MainSelectedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flip: true
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(' - MainSelectedScreen - componentWillReceiveProps - nextProps: ', nextProps.selectedProject);

        let allSelected = true;

        for (const user of nextProps.selectedProject.participants) {
            if (user.voted === false) {
                allSelected = false;
                break;
            }
        }

        if (allSelected === true) {
            Actions.reviewScreen();
        }
    }

    frontFunction() {
        return (
            <TouchableOpacity
                activeOpacity={1.0}
                style={styles.flipCardContent}
                onPress={() => {
                    this.setState({ flip: !this.state.flip });
                }}
            >
                <PlayingCard value={this.props.selectedValue || 'N'} />
            </TouchableOpacity>
        );
    }

    backFunction() {
        return (
            <TouchableOpacity
                activeOpacity={1.0}
                style={styles.flipCardContent}
                onPress={() => {
                    this.setState({ flip: !this.state.flip });
                }}
            >
                <PlayingCardBack />
            </TouchableOpacity>
        );
    }

    renderPlatformSpecific() {
        if (Platform.OS === 'android') {
            return (
                <PlayingCard value={this.props.selectedValue || 'N'} />
            );
        }

        return (
            <FlipView
                style={{
                    flex: 1,
                    width: '90%',
                    borderWidth: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                front={this.frontFunction()}
                back={this.backFunction()}
                isFlipped={this.state.flip}
                onFlipped={
                    (val) => { console.log(`Flipped: ${val}`); }
                }
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={1000}
            />
        );
    }

    renderTopBar() {
        // console.log('- MainScreen - SelectedProject:', this.props.selectedProject);
        if (this.props.workOffline === false && this.props.selectedProject) {
            const { participants } = this.props.selectedProject;
            return (<TeamHeadder usersList={participants} />);
        }
        return (<View style={{ height: 25, backgroundColor: 'transparent' }} />);
    }

    render() {
        return (
            <View style={styles.content}>
                <Header
                    leftIcons
                    title={this.props.selectedProject && this.props.workOffline === false ? this.props.selectedProject.name : null}
                    onCancelPress={() => {
                        this.props.unselectValue();
                        Actions.pop();
                    }}
                />
                {this.renderTopBar()}
                <View
                    style={{
                        flex: 1,
                        borderWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        paddingVertical: 25,
                    }}
                >
                    {this.renderPlatformSpecific()}
                </View>
            </View >
        );
    }
}

const styles = {
    content: {
        flex: 1,
    },
    flipCardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const mapStateToProps = state => {
    return {
        selectedValue: state.selectedValue,
        workOffline: state.workOffline,
        selectedProject: state.selectedProject,
    };
};

export default connect(mapStateToProps, actions)(MainSelectedScreen);
