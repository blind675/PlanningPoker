import React from 'react';
import { Image } from 'react-native';
import {
    Router,
    Scene,
    Stack,
    Drawer
} from 'react-native-router-flux';

import MainScreen from './components/MainScreen';
import MenuScreen from './components/MenuScreen';
import MainSelectedScreen from './components/MainSelectedScreen';
import LoginScreen from './components/LoginScreen';
import SelectProjectScreen from './components/SelectProjectScreen';
import CreateProjectScreen from './components/CreateProjectScreen';
import SplashScreen from './components/SplashScreen';
import ReviewPageScreen from './components/ReviewPageScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import SuggestionsScreen from './components/SuggestionsScreen';

const DrawerIcon = () => {
    return (<Image
        style={{
            width: 30,
            height: 30,
            padding: 10,
        }}
        source={require('../resources/menuIcon/MenuIcon.png')}
    />);
};

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="rootStack" hideNavBar>
                <Scene
                    hideNavBar
                    key="splashScreen"
                    component={SplashScreen}
                    initial
                />
                <Stack key="mainStack" hideNavBar>
                    <Drawer
                        hideNavBar
                        key="mainDrawer"
                        contentComponent={MenuScreen}
                        type='reset'
                        drawerIcon={DrawerIcon}
                    >
                        <Scene
                            hideNavBar
                            key="mainScreen"
                            component={MainScreen}
                        />
                        <Scene
                            hideNavBar
                            key="mainSelectedScreen"
                            component={MainSelectedScreen}
                        />
                        <Scene
                            hideNavBar
                            key="reviewScreen"
                            component={ReviewPageScreen}
                        />
                    </Drawer>
                    <Scene
                        key="loginScreen"
                        component={LoginScreen}
                    />
                    <Scene
                        key="profileScreen"
                        component={ProfileScreen}
                    />
                    <Scene
                        key="settingsScreen"
                        component={SettingsScreen}
                    />
                    <Scene
                        key="suggestionsScreen"
                        component={SuggestionsScreen}
                    />
                    <Stack
                        key="projectStack"
                        hideNavBar
                    >
                        <Scene
                            hideNavBar
                            key="selectProjectScreen"
                            component={SelectProjectScreen}
                        />
                        <Scene
                            hideNavBar
                            key="createProjectScreen"
                            component={CreateProjectScreen}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Router>
    );
};

export default RouterComponent;
