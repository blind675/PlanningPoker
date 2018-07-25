import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import AuthReducer from './AuthReducer';
import WorkOfflineReducer from './WorkOfflineReducer';
import CreateProjectReducer from './CreateProjectReducer';
import GetProjectsReducer from './GetProjectsReducer';
import SelectedProjectReducer from './SelectedProjectReducer';
import WrongUsersReducer from './WrongUsersReducer';

export default combineReducers({
    selectedValue: SelectionReducer,
    user: AuthReducer,
    workOffline: WorkOfflineReducer, 
    projectCreated: CreateProjectReducer,
    projects: GetProjectsReducer,
    wrongUsers: WrongUsersReducer,
    selectedProject: SelectedProjectReducer,
});
