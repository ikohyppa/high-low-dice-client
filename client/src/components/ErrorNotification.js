import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_ERROR } from '../redux/actionTypes';
import NotificationModal from './NotificationModal';

const ErrorNotification = props => {
  const isOpen = useSelector(state => state.error.isOpen);
  const error = useSelector(state => state.error.error);
  const dispatch = useDispatch();

  const handleErrorClose = () => {
    dispatch({ type: HIDE_ERROR });
  };

  return (
    <>
      {isOpen && error && (
        <div>
          <NotificationModal
            show={isOpen}
            handleClose={handleErrorClose}
            title={`Error notification`}
            buttonText={'Close'}
          >
            <p>Error: {error}</p>
          </NotificationModal>
        </div>
      )}
    </>
  );
};

export default ErrorNotification;
