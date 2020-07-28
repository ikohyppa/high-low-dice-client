import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import WebSocketProvider from './connection/webSocket';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/Main';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <Main />
      </WebSocketProvider>
    </Provider>
  );
};

export default App;
