import React from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../redux/selectors';

class Players extends React.Component {
  render() {
    const { players } = this.props;
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Round 1</th>
                <th>Round 2</th>
                <th>Round 3</th>
                <th>Round 4</th>
                <th>Round 5</th>
                <th>Round 6</th>
              </tr>
              {players && players.length ? (
                players.map(player => {
                  return (
                    <tr key={`player-${player.id}`}>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                      {player.rolls.map((value, index) => {
                        return <td key={index}>{value}</td>;
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No players</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    players: getPlayers(state)
  }),
  null
)(Players);
