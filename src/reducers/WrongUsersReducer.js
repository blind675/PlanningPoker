import {
    WRONG_USERS_FOUND,
    WRONG_USERS_NOT_FOUND,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WRONG_USERS_FOUND:
            return action.payload;
        case WRONG_USERS_NOT_FOUND:
            return [];
        default:
            return state;
    }
};
