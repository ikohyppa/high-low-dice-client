import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { WebSocketContext } from '../connection/webSocket';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

import { nextPlayer, waitingPlayers, updateRoundLow, updateRoundHigh } from '../redux/actions';
import {
  getRoom,
  getGame,
  getPlayers,
  getPlayerById,
  getDice
} from '../redux/selectors';

import SummaryModal from './SummaryModal';

const Dice = props => {
  const [showSummary, setShowSummary] = useState(false);

  const {
    nextPlayer,
    waitingPlayers,
    updateRoundLow,
    updateRoundHigh,
    players,
    playerInTurn
  } = props;
  const { roomId, username } = props.room;
  const {
    gameOn,
    round,
    turn,
    rolls,
    roundLows,
    roundHighs,
    waiting
  } = props.game;
  const { dice } = props.dice;

  const ws = useContext(WebSocketContext);
  const user = _.find(players, { name: username });
  let userId;
  if (user) userId = user.id;

  useEffect(() => {
    if (dice.every(die => die.ready)) {
      waitingPlayers();
      setShowSummary(true);
    }
  }, [dice]);

  const updateRoundLowAndHigh = () => {
    if (playerInTurn.id === 1) {
      updateRoundLow(round, rolls);
      updateRoundHigh(round, rolls);
    } else if (rolls < roundLows[round - 1]) {
      updateRoundLow(round, rolls);
    } else if (rolls > roundHighs[round - 1]) {
      updateRoundHigh(round, rolls);
    }
  };

  const rollDice = () => {
    ws.rollDice(roomId, round, turn, rolls);
  };

  const handleTurnEnd = () => {
    setShowSummary(false);
    updateRoundLowAndHigh();
    ws.playerReady(roomId, userId);
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
            !gameOn ||
            playerInTurn.name !== username ||
            round > 6 ||
            showSummary
          }
          onClick={rollDice}
        >
          Roll Dice
        </Button>
      </div>
      <SummaryModal
        show={showSummary}
        handleClose={handleTurnEnd}
        title={`Round ${round}`}
        buttonText={'Next Player'}
      >
        <p>Player: {playerInTurn.name}</p>
        <p>Rolls: {rolls}</p>
      </SummaryModal>
      <SummaryModal
        show={!showSummary && waiting.length !== 0}
        title={`Waiting for ....`}
        showButton={false}
      >
        {waiting.map(value => `${_.find(players, { id: value }).name}, `)}
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
    nextPlayer,
    waitingPlayers,
    updateRoundLow,
    updateRoundHigh
  }
)(Dice);
