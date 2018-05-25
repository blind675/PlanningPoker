import {
    USER_CREATE_FAIL,
    USER_CREATE_SUCCESS,
    USER_GET_SUCESS,
    USER_GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CREATE_SUCCESS:
            return action.payload;
        case USER_GET_SUCESS:
            return action.payload;
        case USER_CREATE_FAIL:
            return {};
        case USER_GET_FAIL:
            return {};
        default:
            return state;
    }
};
