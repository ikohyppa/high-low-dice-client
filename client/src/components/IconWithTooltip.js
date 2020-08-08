import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IconContext } from 'react-icons';

export const IconWithTooltip = props => {
  const {
    tooltip,
    placement,
    color = 'black',
    size = '1em',
    marginLeft = '0',
    marginRight = '0'
  } = props;
  return (
    <IconContext.Provider
      value={{
        color: color,
        size: size,
        className: 'global-class-name',
        style: { marginLeft: marginLeft, marginRight: marginRight }
      }}
    >
      <OverlayTrigger
        placement={placement}
        overlay={
          <Tooltip className={tooltip}>
            <span>{tooltip}</span>
          </Tooltip>
        }
      >
        {props.children}
      </OverlayTrigger>
    </IconContext.Provider>
  );
};
