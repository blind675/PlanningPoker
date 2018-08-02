import {
    SUGGESTION_FAIL,
    SUGGESTION_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUGGESTION_SUCCESS:
            return true;
        case SUGGESTION_FAIL:
            return false;
        default:
            return state;
    }
};
