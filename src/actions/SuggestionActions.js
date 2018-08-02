import firebase from 'firebase';
import {
    SUGGESTION_FAIL,
    SUGGESTION_SUCCESS,
} from '../actions/types';

export const sendSuggestion = (text) => {
    return (dispatch, getState) => {
        const { user } = getState();

        firebase.database().ref('/suggestions').push({
            suggestion: text,
            user
        });

        dispatch({
            payload: true,
            type: SUGGESTION_SUCCESS
        });
    };
};

export const resetSuggestion = () => {
    return (dispatch) => {
        dispatch({
            type: SUGGESTION_FAIL
        });
    };
};
