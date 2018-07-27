import firebase from 'firebase';
import { 
    VALUE_SELECTED_SUCCESS,
    VALUE_SELECTED_FAIL
 } from './types';

export const selectValue = (value) => {
    return (dispatch, getState) => {
        const { user, workOffline, selectedProject } = getState();
        
        if (user && selectedProject && workOffline === false) {
            updateFirebase(user, selectedProject, value, true);
        }

        dispatch({
            payload: value,
            type: VALUE_SELECTED_SUCCESS,
        });
    };
};

export const unselectValue = () => {
    return (dispatch, getState) => {
        const { user, workOffline, selectedProject } = getState();
        if (user && selectedProject && workOffline === false) {
            updateFirebase(user, selectedProject, null, false);
        }

        dispatch({
            payload: null,
            type: VALUE_SELECTED_FAIL,
        });
    };
};

const updateFirebase = (user, selectedProject, newValue, selected) => {
    const newSelectedProject = selectedProject;
    const particioantList = [];
    // find my part in selected project
    for (const projectUser of selectedProject.participants) {
        if (projectUser.uid === user.uid) {
            particioantList.push({
                name: projectUser.name,
                nameShort: projectUser.nameShort,
                uid: projectUser.uid,
                voted: selected,
                value: newValue || projectUser.value
            });
        } else {
            particioantList.push(projectUser);
        }
    }

    newSelectedProject.participants = particioantList;
    // call firebase to update the project for current user
    firebase.database().ref(`/profiles/${selectedProject.uid}`).update(newSelectedProject);
};
