
import {
    PROJECTS_GET_SUCESS,
    PROJECTS_GET_FAIL,
    PROJECTS_CREATE_SUCESS,
    PROJECTS_CREATE_FAIL,
} from './types';

export const getProjects = () => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: PROJECTS_GET_SUCESS,
        });
    };
};

export const createProject = () => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: PROJECTS_CREATE_SUCESS,
        });
    };
};
