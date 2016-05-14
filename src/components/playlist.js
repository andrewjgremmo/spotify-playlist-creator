import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistActions from '../actions/playlist';

export default class Playlist extends Component {
  renderSongs() {
    let trackNum = 0;
    return this.props.songs.map((song) => {
      trackNum++;
      return (
        <tr key={song.song.id}>
          <td><div className="track">{trackNum}.</div></td>
          <td><div className="artist">{song.artist.name}</div></td>
          <td><div className="song">{song.song.name}</div></td>
          <td>
            <div className="remove">
              <button className="remove-button" onClick={() => this.props.actions.removeSong(song)}>x</button>
            </div>
          </td>
        </tr>
      )
    })
  }

  render() {
    return(
      <div className="playlist">
        <button className="basic-button" onClick={() => {this.props.actions.savePlaylist(this.props.auth, this.props.songs)}}>Save Playlist</button>
        <button className="basic-button" onClick={this.props.actions.removeAllSongs}>Clear All Songs</button>
        <table>
          <thead>
            <tr>
              <th className="track">Track</th>
              <th className="artist">Artist</th>
              <th className="song">Song</th>
              <th className="remove"></th>
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
      auth: state.auth,
      songs: state.playlist.songs
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(PlaylistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
