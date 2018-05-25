
import {
    VALUE_SELECTED_SUCCESS,
    VALUE_SELECTED_FAIL,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VALUE_SELECTED_SUCCESS:
            return action.payload;
        case VALUE_SELECTED_FAIL:
            return null;
        default:
            return state;
    }
};