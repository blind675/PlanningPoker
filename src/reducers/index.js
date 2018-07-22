import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import AuthReducer from './AuthReducer';
import WorkOfflineReducer from './WorkOfflineReducer';
import CreateProjectReducer from './CreateProjectReducer';
import GetProjectsReducer from './GetProjectsReducer';
import SelectedProjectReducer from './SelectedProjectReducer';

export default combineReducers({
    selectedValue: SelectionReducer,
    user: AuthReducer,
    workOffline: WorkOfflineReducer, 
    project: CreateProjectReducer,
    projects: GetProjectsReducer,
    // TODO: create action for this
    selectedProject: SelectedProjectReducer,
});
