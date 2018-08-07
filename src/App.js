import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import Router from './Router';

class App extends Component {
    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyBmv-9shtuXCjG_iKKb7KvVF6EQ8SHHULY',
            authDomain: 'planningpoker-693a3.firebaseapp.com',
            databaseURL: 'https://planningpoker-693a3.firebaseio.com',
            projectId: 'planningpoker-693a3',
            storageBucket: 'planningpoker-693a3.appspot.com',
            messagingSenderId: '719152158428',
        });
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
