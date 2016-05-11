import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SongActions from '../actions/songs';

export default class Playlist extends Component {
  renderSongs() {
    let trackNum = 0;
    return this.props.songs.map((song) => {
      trackNum++;
      return (
        <tr key={song.song.id}>
          <td>{trackNum}.</td>
          <td>{song.artist.name}</td>
          <td>{song.song.name}</td>
          <td>
            <button onClick={() => this.props.actions.removeSong(song)}>Remove</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    console.log(this.props.songs);
    return(
      <div>
        <button>Save Playlist</button>
        <button onClick={this.props.actions.removeAllSongs}>Clear All Songs</button>
        <table>
          <thead>
            <tr>
              <th>Track</th><th>Artist</th><th>Song</th><th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSongs()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      token: state.auth.token,
      songs: state.songs.songs
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(SongActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);