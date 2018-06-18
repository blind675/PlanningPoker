import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ImageEditor, ImageStore } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { MaterialIndicator } from 'react-native-indicators';
import { Header } from './common/Header';
import { Card } from './common/Card';

// Add your Cloudinary name here
const YOUR_CLOUDINARY_NAME = 'dtadxpoxx';

// If you dont't hacve a preset id, head over to cloudinary and create a preset, and add the id below
const YOUR_CLOUDINARY_PRESET = 'f3bxcgod';

class CreateProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureUrl: null,
            uploadingImg: false
        };

        this.upload = this.upload.bind(this);
    }

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
                                    // TODO: add transparency
                                    pictureUrl ?
                                        <Image
                                            source={{ uri: pictureUrl }}
                                            style={{
                                                width: 170,
                                                height: 100,
                                                marginTop: 20
                                            }}
                                        />
                                        :
                                        <Image
                                            source={require('../../resources/imagePlaceholder/ImagePlaceholder.png')}
                                            style={{
                                                width: 170,
                                                height: 100,
                                                marginTop: 20
                                            }}
                                        />
                                }
                            </TouchableOpacity>
                    }
                    <View style={{ width: 240 }} >
                        <TextField
                            label='Project Name'
                            value={projectName}
                            onChangeText={(newProjectName) => this.setState({ projectName: newProjectName })}
                        />
                    </View>
                    <View style={{ width: 240 }} >
                        <TextField
                            label='Description'
                            value={description}
                            onChangeText={(newDescription) => this.setState({ description: newDescription })}
                        />
                    </View>
                    <View style={{ width: 240 }} >
                        <TextField
                            label='Participants'
                            value={participants}
                            onChangeText={(newParticipants) => this.setState({ participants: newParticipants })}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            // this.props.loginCreateAccount(email);
                            // Actions.popAndPush('createSelectProject'); 
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

export default CreateProjectScreen;
