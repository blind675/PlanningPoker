import {
    PROJECTS_GET_SUCESS,
    PROJECTS_GET_FAIL,
} from './types';

export const getProjects = () => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: PROJECTS_GET_SUCESS,
        });
    };
};
