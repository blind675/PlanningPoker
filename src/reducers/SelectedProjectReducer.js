import {
    PROJECT_SELECT_SUCESS,
    PROJECT_LOAD_SUCESS,
    PROJECT_SELECT_FAIL,
    PROJECT_LOAD_FAIL,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_SELECT_SUCESS:
            return action.payload;
        case PROJECT_LOAD_SUCESS:
            return action.payload;
        case PROJECT_SELECT_FAIL:
            return null;
        case PROJECT_LOAD_FAIL:
            return null;
        default:
            return state;
    }
};
