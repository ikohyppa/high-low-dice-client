import React from 'react';
import { useSelector } from 'react-redux';

export default function Room() {
  const currentRoom = useSelector(state => state.roomName);
  const currentRoomId = useSelector(state => state.roomId);
  return (
    <>
      <div>Room: {currentRoom}</div>
      <div>RoomId: {currentRoomId}</div>
    </>
  );
}
