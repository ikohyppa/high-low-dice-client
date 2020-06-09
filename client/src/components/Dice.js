import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { incrementRolls, nextPlayer } from '../redux/actions';
import {
  getGame,
  getPlayers,
  getPlayerById
} from '../redux/selectors';

import PlayerRollsModal from './PlayerRollsModal';

const Dice = props => {
  const initialDice = [
    { value: null, ready: false },
    { value: null, ready: false },
    { value: null, ready: false },
    { value: null, ready: false },
    { value: null, ready: false },
    { value: null, ready: false }
  ];
  const [dice, setDice] = useState(initialDice);
  const [showModal, setShowModal] = useState(false);

  const { incrementRolls, nextPlayer, playerInTurn } = props;
  const { gameOn, round, rolls } = props.game;

  useEffect(() => {
    if (dice.every(die => die.ready)) {
      resetDice();
      setShowModal(true);
    }
  }, [dice]);

  const resetDice = () => {
    setDice(initialDice);
  };

  const updateDice = diceValues => {
    let tempDice = dice;
    tempDice.map((die, index) => {
      return die.ready === false
        ? {
            value: diceValues[index],
            ready: diceValues[index] === round
          }
        : die;
    });
  };

  const rollDice = () => {
    const zeroValues = [0, 0, 0, 0, 0, 0];
    const randomValues = zeroValues.map(() => {
      return Math.floor(Math.random() * 6) + 1;
    });
    incrementRolls();
    updateDice(randomValues);
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
              {dice.map((dice, index) => {
                return <td key={index}>{dice.ready ? dice.value : '_'}</td>;
              })}
            </tr>
            <tr>
              {dice.map((dice, index) => {
                return (
                  <td key={index}>{!dice.ready ? dice.value || '_' : '_'}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <Button
          variant='primary'
          disabled={!gameOn || round > 6 || showModal}
          onClick={rollDice}
        >
          Roll Dice
        </Button>
      </div>
      <PlayerRollsModal
        show={showModal}
        onClose={handleTurnEnd}
        title={`Round ${round}`}
        buttonText={'Next Player'}
      >
        {gameOn && (
          <>
            <p>Player: {playerInTurn.name}</p>
            <p>Rolls: {rolls}</p>
          </>
        )}
      </PlayerRollsModal>
    </div>
  );
};

export default connect(
  state => ({
    game: getGame(state),
    players: getPlayers(state),
    playerInTurn: getPlayerById(state, state.game.playerInTurn)
  }),
  {
    incrementRolls,
    nextPlayer
  }
)(Dice);
