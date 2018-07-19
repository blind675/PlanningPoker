import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

import { Header } from './common/Header';
import { Card } from './common/Card';
import * as actions from '../actions';

class SelectProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            myProjects: []
        };
    }

    componentWillMount() {
        this.props.getProjects();
        this.setState({ loading: true });
    }

    componentWillReceiveProps(nextProps) {
        console.log(' - SelectProjectScreen - componentWillReceiveProps - nextProps: ', nextProps.projects);

        if (!nextProps.projects.find(prop => prop.uid === 'add')) {
            nextProps.projects.push({
                uid: 'add',
                addCell: true
            });
        }

        this.setState({
            loading: false,
            myProjects: nextProps.projects
        });
    }

    keyExtractor(item) {
        return item.uid;
    }

    renderListItem({ item }) {
        if (item.addCell) {
            return (
                <TouchableOpacity onPress={() => { Actions.createProjectScreen(); }}>
                    <Card style={styles.addCardStyle}>
                        <Image
                            source={require('../../resources/addIcon/addIcon.png')}
                            style={{
                                width: 42,
                                height: 42,
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 6,
                                color: '#606060',
                                fontSize: 14,
                            }}
                        >Add new project</Text>
                    </Card>
                </TouchableOpacity>
            );
        }
        return (
            //TODO: make Touchable
            <Card style={styles.cardStyle}>
                <Image
                    source={{ uri: item.pictureUrl }}
                    style={{
                        width: 85,
                        height: 120,
                        backgroundColor: '#C8C8C8',
                        opacity: 0.5
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 24,
                        marginVertical: 12
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 8,
                            color: '#212121',
                            fontSize: 20,
                        }}
                    >{item.name}</Text>
                    <View
                        style={{
                            marginBottom: 8,
                            flex: 1,
                        }}
                    >
                        <Text
                            ellipsizeMode={'tail'}
                            numberOfLines={3}
                            style={{
                                color: '#212121',
                                fontSize: 11,
                                opacity: 0.6
                            }}
                        >{item.description}</Text>
                    </View>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={{
                            color: '#606060',
                            fontSize: 13,
                        }}
                    >{'catalin.bora, ion.popescu, aurel'}</Text>
                </View>
            </Card >
        );
    }

    render() {
        const { loading, myProjects } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Select Project'} />
                {
                    loading ?
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <MaterialIndicator color="#A00037" />
                        </View>
                        :
                        <FlatList
                            data={myProjects}
                            renderItem={this.renderListItem.bind(this)}
                            keyExtractor={this.keyExtractor.bind(this)}
                            showsVerticalScrollIndicator={false}
                            style={{
                                flex: 1,
                                marginVertical: 6,
                            }}
                        />
                }
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        height: 120,
        justifyContent: 'flex-start',
        backgroundColor: '#FAFAFA',
        marginVertical: 8,
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    addCardStyle: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginVertical: 8,
        marginHorizontal: 20,
    },
};

const mapStateToProps = state => {
    return {
        user: state.user,
        workOffline: state.workOffline,
        projects: state.projects,
    };
};

export default connect(mapStateToProps, actions)(SelectProjectScreen);
