import React, { useState, useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { WebSocketContext } from '../connection/webSocket';
import { Button } from 'react-bootstrap';
import {
  getRoom,
  getPlayers,
  getGame,
  getPlayerById
} from '../redux/selectors';
import { newGame, nextRound, resetTurn } from '../redux/actions';
import Dice from './Dice';
import SummaryModal from './SummaryModal';

const Round = props => {
  const [showModal, setShowModal] = useState(false);
  const { nextRound, resetTurn, players, playerInTurn } = props;
  const { roomId } = props.room;
  const { gameOn, round, turn, rolls } = props.game;

  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (gameOn && turn > players.length) {
      resetTurn();
      setShowModal(true);
    }
  }, [turn]);

  const handleNewGame = () => {
    dispatch(newGame(roomId));
    ws.startNewGame(roomId);
  };

  const handleStartNextRound = () => {
    setShowModal(false);
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
      <Dice showRoundModal={showModal} />
      <SummaryModal
        show={showModal}
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
    playerInTurn: getPlayerById(state, state.game.turn)
  }),
  { newGame, nextRound, resetTurn }
)(Round);
