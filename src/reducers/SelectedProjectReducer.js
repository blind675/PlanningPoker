import {
    PROJECTS_GET_SUCESS,
    PROJECTS_GET_FAIL,
    PROJECTS_CREATE_SUCESS,
    PROJECTS_CREATE_FAIL,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECTS_GET_SUCESS:
            return action.payload;
        case PROJECTS_CREATE_SUCESS:
            return action.payload;
        case PROJECTS_CREATE_FAIL:
            return INITIAL_STATE;
        case PROJECTS_GET_FAIL:
            return INITIAL_STATE;
        default:
            return state;
    }
};
