import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
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

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // TODO: .. crop image befor sending it to server
                
                // TODO: .. show loading animation or something
                
                // TODO: .. remove editing from cloudinary

                this.setState({
                    uploadingImg: true
                });
                
                uploadFile(response)
                    .then(uploadResponse => uploadResponse.json())
                    .then(result => {
                        console.log('Got uploade response: ', result);
                        this.setState({
                            pictureUrl: result.eager[0].secure_url,
                            uploadingImg: false
                        });
                    });
            }
        });
    }

    render() {
        const { projectName, description, participants, pictureUrl } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Header back title={'Create Project'} />
                <Card style={styles.cardStyle} >
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
                                /> :
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
function uploadFile(file) {
    return RNFetchBlob.fetch('POST', `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_NAME}/image/upload?upload_preset=${YOUR_CLOUDINARY_PRESET}`, {
        'Content-Type': 'multipart/form-data'
    }, [
            { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.origURL) }
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
