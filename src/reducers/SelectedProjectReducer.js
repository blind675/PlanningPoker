import {
    PROJECT_UPDATED_SUCCESS,
    PROJECT_UPDATED_FAIL,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_UPDATED_SUCCESS:
            return action.payload;
        case PROJECT_UPDATED_FAIL:
            return [];
        default:
            return state;
    }
};
