import React, { Component } from 'react';
import { View, TouchableOpacity, Easing } from 'react-native';
// import FlipCard from 'react-native-flip-card';
import FlipView from 'react-native-flip-view';
import { connect } from 'react-redux';

import { Header } from './common/Header';
import { PlayingCard } from './common/PlayingCard';
import { PlayingCardBack } from './common/PlayingCardBack';

class MainSelectedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flip: true
        };
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
                <PlayingCardBack back />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.content}>
                <Header
                    leftIcons
                    checkStatus={this.state.flip}
                    onSelectPress={() => {
                        const newState = !this.state.flip;
                        this.setState({
                            flip: newState
                        });
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        borderWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        paddingVertical: 50,
                    }}
                >
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
    };
};

export default connect(mapStateToProps, null)(MainSelectedScreen);
