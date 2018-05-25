import {
    WORK_OFFLINE_FAIL,
    WORK_OFFLINE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = true;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_OFFLINE_SUCCESS:
            return action.payload;
        case WORK_OFFLINE_FAIL:
            return INITIAL_STATE;
        default:
            return state;
    }
};
