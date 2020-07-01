import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { WebSocketContext } from '../connection/webSocket';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import {
  getRoom,
  getPlayers,
  getGame,
  getPlayerById,
  getRoundLow,
  getRoundHigh,
  getRoundLowWinnings,
  getRoundHighWinnings
} from '../redux/selectors';
import {
  nextRound,
  collectRoundFees,
  payRoundWinnings
} from '../redux/actions';
import Dice from './Dice';
import SummaryModal from './SummaryModal';

const Round = props => {
  const [showSummary, setShowSummary] = useState(false);
  const {
    nextRound,
    collectRoundFees,
    payRoundWinnings,
    players,
    playerInTurn,
    roundLow,
    roundHigh,
    roundLowWinnings,
    roundHighWinnings
  } = props;
  const { roomId } = props.room;
  const { gameOn, round, turn, rolls, waiting } = props.game;

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (gameOn && turn > players.length) {
      setShowSummary(true);
    }
  }, [turn]);

  const handleNewGame = () => {
    ws.startNewGame(roomId);
  };

  const handleStartNextRound = () => {
    setShowSummary(false);
    payRoundWinnings(roundLow, roundHigh, roundLowWinnings, roundHighWinnings);
    if (round < 6) {
      collectRoundFees(roomId);
    }
    nextRound();
  };

  return (
    <div>
      <div>
        {!gameOn && (
          <Button
            variant='primary'
            disabled={players.length < 3 || round > 6}
            style={{ marginTop: '5px' }}
            onClick={handleNewGame}
          >
            New Game
          </Button>
        )}
      </div>
      <div>Round: {round}</div>
      <div>
        {'Player in turn: '}
        {gameOn && turn <= players.length ? playerInTurn.name : ''}
      </div>
      <div>Rolls: {rolls}</div>
      <Dice showRoundModal={showSummary} />
      <SummaryModal
        show={showSummary}
        handleClose={handleStartNextRound}
        title={`Round ${round} summary`}
        buttonText={'Next Round'}
      >
        <table>
          <tbody>
            {players.map(player => {
              return (
                <tr key={`player-${player.id}`}>
                  <td>{player.name}</td>
                  <td>{player.rolls[round - 1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SummaryModal>
      <SummaryModal
        show={round > 6}
        handleClose={handleNewGame}
        title={`Game summary`}
        buttonText={'New Game'}
        showButton={_.isEmpty(waiting)}
      >
        <table>
          <tbody>
            {players.map(player => {
              return (
                <tr key={`player-${player.id}`}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    roundLow: getRoundLow(state, state.game.round),
    roundHigh: getRoundHigh(state, state.game.round),
    roundLowWinnings: getRoundLowWinnings(state, state.game.round),
    roundHighWinnings: getRoundHighWinnings(state, state.game.round)
  }),
  { nextRound, collectRoundFees, payRoundWinnings }
)(Round);
