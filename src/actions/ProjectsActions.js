import store from 'react-native-simple-store';
import firebase from 'firebase';

import {
    STORE_PROJECT_KEY,
    STORE_PROFILE_KEY,
    PROJECT_CREATE_SUCESS,
    PROJECT_CREATE_FAIL,
    PROJECTS_GET_SUCESS,
    PROJECTS_GET_FAIL,
    // PROJECT_LOAD_SUCESS,
    PROJECT_LOAD_FAIL,
    PROJECT_SELECT_SUCESS,
    PROJECT_SELECT_FAIL,
    WRONG_USERS_FOUND,
    // WRONG_USERS_NOT_FOUND,
    // UPLOADE_PICTURE_SUCESS,
    // UPLOADE_PICTURE_FAIL,
} from './types';

export const getProjects = () => {
    return (dispatch, getState) => {
        const { user } = getState();

        // TODO: duplicate project data in unser object 
        // so no extra request neede 
        
        // get all projects
        firebase.database().ref('/projects').once('value')
            .then((snapshot) => {
                const projects = snapshot.val();
                console.log('- getProjects projects :', projects);

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
                        payload: [],
                        type: PROJECTS_GET_SUCESS,
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
                    // if project found select project
                    console.log('- Loaded project - from phone: ', project);
                    selectProjectPart(project.uid, dispatch);
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
    return async (dispatch, getState) => {
        let { user } = getState();

        const projectsListRef = firebase.database().ref('/projects');
        const newProjectRef = projectsListRef.push();

        // created a new project
        const projectObject = {
            name,
            description,
            pictureUrl: pictureUrl || 'https://uc.uxpin.com/files/861780/854417/uxpmod_ad6827dd77914434977183489505adc5_83729789_project-team-full-5425ca-231706.jpg',
            participants: [],
            uid: newProjectRef.key
        };

        // search firebase for email of participants one by one
        // participants email in an array 
        const users = [];
        const wrongUsers = [];
        const usersEmails = participants.split(';');

        const profilesRef = firebase.database().ref('/profiles/');

        // go trougth the array and search for user one by one
        for (const userEmail of usersEmails) {
            const snapshot = await profilesRef
                .orderByChild('email')
                .equalTo(userEmail)
                .once('value')
                .then();

            const userObject = snapshot.val();

            if (userObject) {
                const userUID = Object.keys(userObject)[0];

                projectObject.participants.push({
                    uid: userUID,
                    name: userObject[userUID].name,
                    nameShort: userObject[userUID].nameShort,
                    voted: false,
                });

                users.push(userObject[userUID]);
            } else {
                console.log(' - user not found for email: ', userEmail);
                wrongUsers.push(userEmail);
            }
        }

        if (wrongUsers.length > 0) {
            console.log('Found wrong users');
            dispatch({
                payload: wrongUsers,
                type: WRONG_USERS_FOUND
            });
        } else {
            // add the current user user
            projectObject.participants.push({
                uid: user.uid,
                name: user.name,
                nameShort: user.nameShort || 'Xx',
                voted: false,
            });

            newProjectRef.set(projectObject)
                .then(() => {
                    const id = newProjectRef.key;

                    // update all the users with UID to have the new project in firebase
                    for (let localUser of users) {
                        if (!localUser.projects) {
                            const projects = [];
                            localUser = { ...localUser, projects };
                        }

                        localUser.projects.push(id);
                        firebase.database().ref(`/profiles/${localUser.uid}`).update(localUser);
                    }

                    // also update curent user with this project or project Id
                    if (!user.projects) {
                        const projects = [];
                        user = { ...user, projects };
                    }

                    user.projects.push(id);
                    saveProfile(user);

                    firebase.database().ref(`/profiles/${user.uid}`).update(user);

                    dispatch({
                        payload: id,
                        type: PROJECT_CREATE_SUCESS
                    });
                })
                .catch((error) => {
                    console.log('error:', error);
                    dispatch({ type: PROJECT_CREATE_FAIL });
                });
        }
    };
};

const selectProjectPart = (projectId, dispatch) => {
    firebase.database().ref(`/projects/${projectId}`).on('value', (snapshot) => {
        const project = snapshot.val();
        if (project) {
            // console.log(' - listening to project: ', project);
            dispatch({
                payload: project,
                type: PROJECT_SELECT_SUCESS
            });

            // store the project as the active project
            saveProject(project);
        } else {
            dispatch({
                type: PROJECT_SELECT_FAIL
            });
        }
    });
};

export const selectProject = (projectId) => {
    return (dispatch) => {
        // get current Project Id
        store.get(STORE_PROJECT_KEY)
            .then((project) => {
                if (project) {
                    // close current project first
                    firebase.database().ref(`/projects/${project.uid}`).off('value');
                    selectProjectPart(projectId, dispatch);
                }
            })
            .catch((error) => {
                console.log('selectProject - error:', error);
                // no project saved localy so no need to deselect
                selectProjectPart(projectId, dispatch);
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

