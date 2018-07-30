import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Header } from './common/Header';

class ReviewPageScreen extends Component {
    renderTopBar() {
        // console.log('selectedProject:', this.props.selectedProject);
        return (
            <View
                style={{
                    backgroundColor: '#6EDC6C',
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80
                }}
            >
                <Text style={styles.headderInfoText}> Participans voted </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftIcons
                    onCancelPress={() => {
                        this.props.unselectValue();
                        Actions.pop();
                    }}
                />
                {this.renderTopBar()}
                <FlatList
                    data={this.props.selectedProject.participants}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    height: 140,
                                    width: '33.33%',
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: '#FAFAFA',
                                        alignSelf: 'stretch',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 10,
                                        flex: 1,
                                        borderRadius: 15,
                                        shadowColor: '#000000',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 5,
                                        shadowOffset: {
                                            height: 1,
                                            width: 0
                                        }
                                    }}
                                >
                                    <Text style={styles.centerValueText}> {item.value} </Text>
                                    <Text style={styles.bottomNameText}> {item.name} </Text>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => {
                        return item.uid;
                    }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />

            </View >
        );
    }
}

const styles = {
    headderInfoText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    centerValueText: {
        color: '#FF5C8D',
        fontSize: 20,
        // fontFamily: 'Roboto',
        marginVertical: 20,
    },
    bottomNameText: {
        color: '#212121',
        fontSize: 12,
        // fontFamily: 'Roboto',
    }
};

const mapStateToProps = state => {
    return {
        selectedProject: state.selectedProject,
    };
};

export default connect(mapStateToProps, actions)(ReviewPageScreen);
