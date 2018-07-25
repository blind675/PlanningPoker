import React from 'react';
import { Image } from 'react-native';
import {
    Router,
    Scene,
    Stack,
    Drawer,
    ActionConst
} from 'react-native-router-flux';

import MainScreen from './components/MainScreen';
import MenuScreen from './components/MenuScreen';
import MainSelectedScreen from './components/MainSelectedScreen';
import LoginScreen from './components/LoginScreen';
import SelectProjectScreen from './components/SelectProjectScreen';
import CreateProjectScreen from './components/CreateProjectScreen';
import SplashScreen from './components/SplashScreen';

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
                    </Drawer>
                    <Scene
                        key="loginScreen"
                        component={LoginScreen}
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
