import store from 'react-native-simple-store';

import {
    WORK_OFFLINE_FAIL,
    WORK_OFFLINE_SUCCESS,
    STORE_WORK_OFFLINE_KEY,
} from '../actions/types';

export const loadWorkOfline = () => {
    return (dispatch) => {
        // loade profile from phone
        store.get(STORE_WORK_OFFLINE_KEY)
            .then((workOffline) => {
                if (workOffline) {
                    console.log('- Work Offline flag found on phone: ', workOffline.workOfflineFlag);
                    dispatch({
                        payload: workOffline.workOfflineFlag,
                        type: WORK_OFFLINE_SUCCESS,
                    });
                } else {
                    console.log('- Work Offline flag - none found.');
                    dispatch({
                        type: WORK_OFFLINE_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: WORK_OFFLINE_FAIL
                });
            });
    };
};


export const updateWorkOffline = (workOffline) => {
    return (dispatch) => {
        // save profile to phone
        store.save(STORE_WORK_OFFLINE_KEY, { workOfflineFlag: workOffline })
            .then(() => {
                console.log('- Work Offline flag saved on phone.');
                dispatch({
                    payload: workOffline,
                    type: WORK_OFFLINE_SUCCESS,
                });
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: WORK_OFFLINE_FAIL
                });
            });
    };
};
