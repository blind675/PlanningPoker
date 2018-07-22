import store from 'react-native-simple-store';
import firebase from 'firebase';

import {
    STORE_PROJECT_KEY,
    STORE_PROFILE_KEY,
    PROJECT_CREATE_SUCESS,
    PROJECT_CREATE_FAIL,
    PROJECTS_GET_SUCESS,
    PROJECTS_GET_FAIL,
    PROJECT_LOAD_SUCESS,
    PROJECT_LOAD_FAIL,
    // UPLOADE_PICTURE_SUCESS,
    UPLOADE_PICTURE_FAIL,
} from './types';

export const getProjects = () => {
    return (dispatch, getState) => {
        const { user } = getState();
        // get all projects
        firebase.database().ref('/projects').once('value')
            .then((snapshot) => {
                const projects = snapshot.val();
                console.log('projects :', projects);

                if (user && user.projects && user.projects.length > 0 && projects) {
                    const myProjects = [];
                    for (const projectId of user.projects) {
                        if (projects[projectId]) {
                            myProjects.push(projects[projectId]);
                        }
                    }
                    dispatch({
                        payload: myProjects,
                        type: PROJECTS_GET_SUCESS,
                    });
                } else {
                    dispatch({
                        type: PROJECTS_GET_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: PROJECTS_GET_FAIL
                });
            });
    };
};

export const loadProject = () => {
    return (dispatch) => {
        // loade project from phone
        store.get(STORE_PROJECT_KEY)
            .then((project) => {
                if (project) {
                    console.log('- Loaded project - from phone: ', project);
                    dispatch({
                        payload: project,
                        type: PROJECT_LOAD_SUCESS,
                    });
                } else {
                    console.log('- Loaded project - none found.');
                    dispatch({
                        type: PROJECT_LOAD_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: PROJECT_LOAD_FAIL
                });
            });
    };
};

export const createProject = (pictureUrl, name, description, participants) => {
    return (dispatch, getState) => {
        let { user } = getState();

        const projectsListRef = firebase.database().ref('/projects');
        const newProjectRef = projectsListRef.push();

        const projectObject = {
            name,
            description,
            pictureUrl: pictureUrl || 'https://uc.uxpin.com/files/861780/854417/uxpmod_ad6827dd77914434977183489505adc5_83729789_project-team-full-5425ca-231706.jpg',
            participants,
            uid: newProjectRef.key
        };

        newProjectRef.set(projectObject)
            .then(() => {
                const id = newProjectRef.key;
                // created a new project

                // store the project as the active project
                saveProject(projectObject);

                // also update curent user with this project or project Id
                if (user) {
                    if (!user.projects) {
                        const projects = [];
                        user = { ...user, projects };
                    }

                    user.projects.push(id);
                    saveProfile(user);

                    firebase.database().ref(`/profiles/${user.uid}`).update(user);
                }

                dispatch({
                    payload: projectObject,
                    type: PROJECT_CREATE_SUCESS
                });
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({ type: PROJECT_CREATE_FAIL });
            });
    };
};

const saveProject = (project) => {
    // save project to phone
    store.save(STORE_PROJECT_KEY, project);
};

const saveProfile = (profile) => {
    // save profile to phone
    store.save(STORE_PROFILE_KEY, profile);
};

// TODO: upload picture here
export const uploadPhoto = () => {
    return (dispatch) => {
        dispatch({
            payload: [],
            type: UPLOADE_PICTURE_FAIL,
        });
    };
};
