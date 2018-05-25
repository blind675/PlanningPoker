import { VALUE_SELECTED_SUCCESS } from './types';

export const selectValue = (value) => {
    return {
        type: VALUE_SELECTED_SUCCESS,
        payload: value,
    };
};
