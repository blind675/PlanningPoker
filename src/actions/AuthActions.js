import store from 'react-native-simple-store';
import firebase from 'firebase';

import {
    USER_CREATE_FAIL,
    USER_CREATE_SUCCESS,
    USER_GET_SUCESS,
    USER_GET_FAIL,
    STORE_PROFILE_KEY,
} from '../actions/types';

export const loginCreateAccount = (email) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, '1234567890')
            .then((response) => {
                const profileUid = response.user.uid;
                console.log('- Auth user found with ID: ', profileUid);
                getProfile(profileUid, dispatch);
            })
            .catch((error) => {
                console.log('- Login error: ', error);
                if (error.code === 'auth/user-not-found') {
                    firebase.auth().createUserWithEmailAndPassword(email, '1234567890')
                        .then((response) => {
                            const profileUid = response.user.uid;
                            createProfil(profileUid, email, dispatch);
                        })
                        .catch((createError) => {
                            console.log('error:', createError);
                            dispatch({ type: USER_CREATE_FAIL });
                        });
                } else {
                    console.log(error);
                    dispatch({ type: USER_GET_FAIL });
                }
            });
    };
};

const getProfile = (profileUid, dispatch) => {
    firebase.database().ref(`/profiles/${profileUid}`)
        .once('value', (snapshot) => {
            const profile = { ...snapshot.val(), uid: profileUid };
            if (profile) {
                console.log('- Found profile: ', profile);

                // save profile local
                saveProfile(profile);
                dispatch({
                    payload: profile,
                    type: USER_GET_SUCESS
                });
            }
        });
};

const createProfil = (profileId, email, dispatch) => {
    //extract name from email
    const index = email.indexOf('@');
    const name = email.substring(0, index);
    const nameShortLowercase = name.substring(0, 2);
    const nameShort = nameShortLowercase.charAt(0).toUpperCase() + nameShortLowercase.substr(1);

    const ref = firebase.database().ref(`/profiles/${profileId}`);
    const profileObject = {
        uid: profileId,
        name,
        nameShort,
        email,
    };

    console.log('- Writing user in /profile/userId userObject: ', profileObject);
    ref.set(profileObject)
        .then(() => {
            // save profile local
            saveProfile(profileObject);
            dispatch({
                payload: profileObject,
                type: USER_CREATE_SUCCESS
            });
        })
        .catch((error) => {
            console.log('error:', error);
            dispatch({ type: USER_CREATE_FAIL });
        });
};

const saveProfile = (profile) => {
    // save profile to phone
    store.save(STORE_PROFILE_KEY, profile);
};

export const loadProfile = () => {
    return (dispatch) => {
        // loade profile from phone
        store.get(STORE_PROFILE_KEY)
            .then((profile) => {
                if (profile) {
                    console.log('- Loaded profile - from phone: ', profile);
                    dispatch({
                        payload: profile,
                        type: USER_GET_SUCESS,
                    });
                } else {
                    console.log('- Loaded profile - none found.');
                    dispatch({
                        type: USER_GET_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: USER_GET_FAIL
                });
            });
    };
};
