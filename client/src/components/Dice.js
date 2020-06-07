import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { incrementRolls, nextPlayer } from '../redux/actions';
import { getGame, getPlayers, getPlayerById } from '../redux/selectors';

import PlayerRollsModal from './PlayerRollsModal';

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: [
        { value: null, ready: false },
        { value: null, ready: false },
        { value: null, ready: false },
        { value: null, ready: false },
        { value: null, ready: false },
        { value: null, ready: false }
      ],
      showModal: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.dice.every(dice => dice.ready)) {
      this.resetDice();
      this.showModal();
    }
  }

  resetDice() {
    this.setState(prevState => ({
      dice: prevState.dice.map(() => {
        return { value: null, ready: false };
      })
    }));
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  updateDice = diceValues => {
    this.setState(prevState => ({
      dice: prevState.dice.map((dice, index) => {
        return dice.ready === false
          ? {
              ...dice,
              value: diceValues[index],
              ready: diceValues[index] === this.props.game.round
            }
          : dice;
      })
    }));
  };

  rollDice = () => {
    const zeroValues = [0, 0, 0, 0, 0, 0];
    const randomValues = zeroValues.map(() => {
      return Math.floor(Math.random() * 6) + 1;
    });
    this.props.incrementRolls();
    this.updateDice(randomValues);
  };

  handleTurnEnd = () => {
    this.hideModal();
    this.props.nextPlayer();
  };

  render() {
    const { dice, showModal } = this.state;
    const { game, playerInTurn } = this.props;
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
            disabled={
              !game.gameOn ||
              game.round > 6 ||
              showModal ||
              this.props.showRoundModal
            }
            onClick={this.rollDice}
          >
            Roll Dice
          </Button>
        </div>
        <PlayerRollsModal
          show={showModal}
          onClose={this.handleTurnEnd}
          title={`Round ${game.round}`}
          buttonText={'Next Player'}
        >
          {game.gameOn && (
            <>
              <p>Player: {playerInTurn.name}</p>
              <p>Rolls: {game.rolls}</p>
            </>
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
    playerInTurn: getPlayerById(state, state.game.playerInTurn)
  }),
  {
    incrementRolls,
    nextPlayer
  }
)(Dice);
