import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { WebSocketContext } from '../connection/webSocket';
import { Button } from 'react-bootstrap';

import { nextPlayer } from '../redux/actions';
import {
  getRoom,
  getGame,
  getPlayers,
  getPlayerById,
  getDice
} from '../redux/selectors';

import SummaryModal from './SummaryModal';

const Dice = props => {
  const [showModal, setShowModal] = useState(false);

  const { nextPlayer, playerInTurn } = props;
  const { roomId, username } = props.room;
  const { gameOn, round, turn, rolls } = props.game;
  const { dice } = props.dice;

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (dice.every(die => die.ready)) {
      setShowModal(true);
    }
  }, [dice]);

  const rollDice = () => {
    ws.rollDice(roomId, round, turn, rolls);
  };

  const handleTurnEnd = () => {
    setShowModal(false);
    nextPlayer();
  };

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Dice1</th>
              <th>Dice2</th>
              <th>Dice3</th>
              <th>Dice4</th>
              <th>Dice5</th>
              <th>Dice6</th>
            </tr>
            <tr>
              {dice.map((die, index) => {
                return <td key={index}>{die.ready ? die.value : '_'}</td>;
              })}
            </tr>
            <tr>
              {dice.map((die, index) => {
                return (
                  <td key={index}>{!die.ready ? die.value || '_' : '_'}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <Button
          variant='primary'
          disabled={
            !gameOn || playerInTurn.name !== username || round > 6 || showModal
          }
          onClick={rollDice}
        >
          Roll Dice
        </Button>
      </div>
      <SummaryModal
        show={showModal}
        handleClose={handleTurnEnd}
        title={`Round ${round}`}
        buttonText={'Next Player'}
      >
        <p>Player: {playerInTurn.name}</p>
        <p>Rolls: {rolls}</p>
      </SummaryModal>
    </div>
  );
};

export default connect(
  state => ({
    room: getRoom(state),
    game: getGame(state),
    players: getPlayers(state),
    playerInTurn: getPlayerById(state, state.game.turn),
    dice: getDice(state)
  }),
  {
    nextPlayer
  }
)(Dice);
