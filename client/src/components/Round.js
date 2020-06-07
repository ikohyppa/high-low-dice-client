import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getPlayers, getGame, getPlayerById } from '../redux/selectors';
import { newGame, nextRound, resetTurn } from '../redux/actions';
import Dice from './Dice';
import PlayerRollsModal from './PlayerRollsModal';

class Round extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  componentDidUpdate() {
    const { players } = this.props;
    const { gameOn, turn } = this.props.game;
    if (gameOn && turn > players.length) {
      this.props.resetTurn();
      this.showModal();
    }
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  handleNewGame = () => {
    this.props.newGame();
  };

  handleStartNextRound = () => {
    this.hideModal();
    this.props.nextRound();
  };

  render() {
    const { showModal } = this.state;
    const { gameOn, round, turn, rolls } = this.props.game;
    const { players, playerInTurn } = this.props;
    return (
      <div>
        <div>
          {!gameOn && (
            <Button
              variant='primary'
              disabled={players.length < 3 || round > 6}
              style={{ marginTop: '5px' }}
              onClick={this.handleNewGame}
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
        <PlayerRollsModal
          show={showModal}
          onClose={this.handleStartNextRound}
          title={`Round ${round} summary`}
          buttonText={'Next Round'}
        >
          {gameOn && (
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
          )}
        </PlayerRollsModal>
        <PlayerRollsModal
          show={round > 6}
          onClose={this.handleNewGame}
          title={`Game summary`}
          buttonText={'New Game'}
        >
          {round > 6 && (
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
          )}
        </PlayerRollsModal>
      </div>
    );
  }
}

export default connect(
  state => ({
    game: getGame(state),
    players: getPlayers(state),
    playerInTurn: getPlayerById(state, state.game.turn)
  }),
  { newGame, nextRound, resetTurn }
)(Round);
