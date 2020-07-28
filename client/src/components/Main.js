import React from 'react';
import { useSelector } from 'react-redux';

import TopBar from './TopBar';
import Login from './Login';

const Main = () => {
  const currentRoom = useSelector(state => state.room.roomName);
  return (
    <>
      <TopBar />
      {!currentRoom && <Login />}
    </>
  );
};

export default Main;
