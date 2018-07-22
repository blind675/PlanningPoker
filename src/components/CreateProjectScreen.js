import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ImageEditor, ImageStore } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { MaterialIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Header } from './common/Header';
import { Card } from './common/Card';
import * as actions from '../actions';

// Add your Cloudinary name here
const YOUR_CLOUDINARY_NAME = 'dtadxpoxx';

// If you dont't hacve a preset id, head over to cloudinary and create a preset, and add the id below
const YOUR_CLOUDINARY_PRESET = 'f3bxcgod';

// TODO: update the ui so that the participants have profiles
class CreateProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureUrl: null,
            uploadingImg: false,
            projectNameError: null,
            descriptionsError: null,
            participantsError: null,
        };

        this.upload = this.upload.bind(this);
        this.projectNameRef = this.updateRef.bind(this, 'projectName');
        this.descriptionRef = this.updateRef.bind(this, 'description');
        this.participantsRef = this.updateRef.bind(this, 'participants');
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.project) {
    //     }
    // }

    onParticipantsChange(text) {
        let newText = text.replace(' ', ';');
        newText = newText.replace(',', ';');

        this.setState({
            participantsError: null,
            participants: newText
        });
    }

    onDescriptionsChange(text) {
        this.setState({
            descriptionsError: null
        });
        this.state.description = text;
    }

    onProjectNameChange(text) {
        this.setState({
            projectNameError: null,
        });
        this.state.projectName = text;
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    // TODO: move this to redux at some point
    upload() {
        // https://tarcode.github.io/blog/react-native-image-uploading/

        const options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        this.setState({
            uploadingImg: true
        });

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({
                    pictureUrl: null,
                    uploadingImg: false
                });
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({
                    pictureUrl: null,
                    uploadingImg: false
                });
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                this.setState({
                    pictureUrl: null,
                    uploadingImg: false
                });
            } else {
                //.. show loading animation or something
                console.log('the pick image response:', response);

                const cropData = {
                    offset: { x: Math.round((response.width - 2040) / 2), y: Math.round((response.height - 1200) / 2) },
                    size: { width: 2040, height: 1200 },
                };
                // crop image befor sending it to server
                ImageEditor.cropImage(
                    response.uri,
                    cropData,
                    (croppedImageURI) => {
                        // console.log('Cropping response', croppedImageURI);

                        ImageStore.getBase64ForTag(croppedImageURI,
                            (base64ImageData) => {
                                // console.log('ImageStore response', base64ImageData);
                                this.setState({
                                    uploadingImg: true
                                });

                                uploadFile(base64ImageData, response.fileName)
                                    .then(uploadResponse => uploadResponse.json())
                                    .then(result => {
                                        // console.log('Got uploade response: ', result);
                                        this.setState({
                                            pictureUrl: result.secure_url,
                                            uploadingImg: false
                                        });
                                        // removed the local cropped image
                                        ImageStore.removeImageForTag(croppedImageURI);
                                    });
                            },
                            (error) => {
                                console.log('ImageStore error', error);
                            }
                        );
                    },
                    (error) => console.log('Error cropping', error)
                );
            }
        });
    }

    render() {
        const { projectName, description, participants, pictureUrl, uploadingImg } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Create Project'} />
                <Card style={styles.cardStyle} >
                    {
                        uploadingImg ?
                            <View
                                style={{
                                    width: 170,
                                    height: 100,
                                    marginTop: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MaterialIndicator color="#A00037" />
                            </View>
                            :
                            <TouchableOpacity onPress={this.upload}>
                                {
                                    pictureUrl ?
                                        <Image
                                            source={{ uri: pictureUrl }}
                                            style={{
                                                width: 170,
                                                height: 100,
                                                marginTop: 20,
                                                opacity: 0.5
                                            }}
                                        />
                                        :
                                        <Image
                                            source={require('../../resources/imagePlaceholder/ImagePlaceholder.png')}
                                            style={{
                                                width: 170,
                                                height: 100,
                                                marginTop: 20,
                                                opacity: 0.5
                                            }}
                                        />
                                }
                            </TouchableOpacity>
                    }
                    <View style={{ width: 240 }} >
                        <TextField
                            ref={this.projectNameRef}
                            label='Project Name'
                            value={projectName}
                            onChangeText={this.onProjectNameChange.bind(this)}
                            error={this.state.projectNameError}
                        />
                    </View>
                    <View style={{ width: 240 }} >
                        <TextField
                            ref={this.descriptionRef}
                            label='Description'
                            value={description}
                            onChangeText={this.onDescriptionsChange.bind(this)}
                            error={this.state.descriptionsError}
                        />
                    </View>
                    <View style={{ width: 240 }} >
                        <TextField
                            ref={this.participantsRef}
                            label='Participants'
                            value={participants}
                            autoCorrect={false}
                            onChangeText={this.onParticipantsChange.bind(this)}
                            autoCapitalize={'none'}
                            error={this.state.participantsError}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (!projectName) {
                                this.setState({ projectNameError: 'No Project Name Provided' });
                            } else if (!description) {
                                this.setState({ descriptionsError: 'No Project Description Provided' });
                            } else if (!participants) {
                                this.setState({ participantsError: 'No Project Participants Provided' });
                            } else {
                                this.setState({
                                    projectNameError: null,
                                    descriptionsError: null,
                                    participantsError: null,
                                });
                                this.props.createProject(pictureUrl, projectName, description, participants);
                                Actions.mainScreen();
                            }
                        }}
                    >
                        <Text style={styles.buttonTitle}> Create </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

// Working
function uploadFile(dataBase64, fileName) {
    return RNFetchBlob.fetch('POST', `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_NAME}/image/upload?upload_preset=${YOUR_CLOUDINARY_PRESET}`, {
        'Content-Type': 'multipart/form-data'
    }, [
            { name: 'file', filename: fileName, data: dataBase64 }
        ]);
}

const styles = {
    cardStyle: {
        backgroundColor: '#FAFAFA',
        marginTop: 40,
        marginHorizontal: 40,
        alignItems: 'center',
    },
    button: {
        marginBottom: 20,
        marginTop: 40,
        height: 42,
        width: 180,
        backgroundColor: '#A00037',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: '#FAFAFA',
        fontSize: 20
    }
};

const mapStateToProps = state => {
    return {
        project: state.project,
    };
};

export default connect(mapStateToProps, actions)(CreateProjectScreen);
