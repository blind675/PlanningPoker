import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import AuthReducer from './AuthReducer';
import WorkOfflineReducer from './WorkOfflineReducer';
import SelectedProjectReducer from './SelectedProjectReducer';

export default combineReducers({
    selectedValue: SelectionReducer,
    user: AuthReducer,
    workOffline: WorkOfflineReducer, 
    selectedProject: SelectedProjectReducer,
});
