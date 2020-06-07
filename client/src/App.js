import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import WebSocketProvider from './connection/webSocket';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <Home />
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
