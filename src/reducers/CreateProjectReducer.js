import {
    PROJECT_CREATE_SUCESS,
    PROJECT_CREATE_FAIL,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_CREATE_SUCESS:
            return action.payload;
        case PROJECT_CREATE_FAIL:
            return INITIAL_STATE;
        default:
            return state;
    }
};
