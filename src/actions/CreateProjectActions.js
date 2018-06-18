import {
    PROJECTS_CREATE_SUCESS,
    PROJECTS_CREATE_FAIL,
    UPLOADE_PICTURE_SUCESS,
    UPLOADE_PICTURE_FAIL,
} from './types';

export const createProject = (pictureUrl, name, description, participants) => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: PROJECTS_CREATE_SUCESS,
        });
    };
};

export const uploadPhoto = () => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: PROJECTS_CREATE_SUCESS,
        });
    };
};
